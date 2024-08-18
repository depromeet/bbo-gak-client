import { serverErrorType } from '@/types/api';
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
import { getCookie } from 'cookies-next';
import { postRefresh } from './refresh';

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

  const token = localStorage.getItem('accessToken');
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
      const data = error.response?.data as serverErrorType;
      if (data?.status === 'UNAUTHORIZED') {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken) {
          const response = await postRefresh({ refreshToken });
          localStorage.setItem('accessToken', response.data.accessToken);
        }
      }
    }
  },
);

const createApiMethod =
  (instance: AxiosInstance, method: Method) =>
  <T>(config: AxiosRequestConfig): Promise<AxiosResponse> =>
    instance({ ...config, method });

export const http = {
  get: createApiMethod(axiosInstance, 'get'),
  post: createApiMethod(axiosInstance, 'post'),
  patch: createApiMethod(axiosInstance, 'patch'),
  put: createApiMethod(axiosInstance, 'put'),
  delete: createApiMethod(axiosInstance, 'delete'),
};
