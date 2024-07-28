import type { BaseResponse } from '@/types/common';
import { isProductionEnv } from '@/utils/common';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = getCookie('accessToken');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (!config.headers) {
    return config;
  }

  return config;
});

axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
  if (!isProductionEnv) {
    console.log(response);
  }
  return response;
});

const createApiMethod =
  (instance: AxiosInstance, method: Method) =>
  <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> =>
    instance({ ...config, method });

export const http = {
  get: createApiMethod(axiosInstance, 'get'),
  post: createApiMethod(axiosInstance, 'post'),
  patch: createApiMethod(axiosInstance, 'patch'),
  put: createApiMethod(axiosInstance, 'put'),
  delete: createApiMethod(axiosInstance, 'delete'),
};
