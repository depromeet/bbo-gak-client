import { isProductionEnv } from '@/utils/common';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios';

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

  const token = getCookie('accessToken');
  const config = { ...requestConfig };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
  if (!isProductionEnv) {
    // eslint-disable-next-line no-console
    console.log(response);
  }
  return response;
});

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
