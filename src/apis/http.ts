import { isProductionEnv } from '@/utils/common';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { postRefresh } from './refresh';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/app/login/constants/token';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (requestConfig: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') {
    return requestConfig;
  }
  const token = getCookie(ACCESS_TOKEN);
  const config = { ...requestConfig };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!isProductionEnv) {
      // eslint-disable-next-line no-console
      console.log(response);
    }

    return response;
  },

  async (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const refreshToken = getCookie(REFRESH_TOKEN);

      if (status === 401 && typeof window !== 'undefined') {
        if (refreshToken) {
          deleteCookie(ACCESS_TOKEN);
          deleteCookie(REFRESH_TOKEN);

          try {
            const response = await postRefresh({ refreshToken });
            setCookie(ACCESS_TOKEN, response.data.accessToken);
            setCookie(REFRESH_TOKEN, response.data.refreshToken);
          } catch (refreshError) {
            window.location.href = '/login';
          }
        }
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

const createApiMethod =
  (instance: AxiosInstance, method: Method) =>
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance({ ...config, method });

export const http = {
  get: createApiMethod(axiosInstance, 'get'),
  post: createApiMethod(axiosInstance, 'post'),
  patch: createApiMethod(axiosInstance, 'patch'),
  put: createApiMethod(axiosInstance, 'put'),
  delete: createApiMethod(axiosInstance, 'delete'),
};
