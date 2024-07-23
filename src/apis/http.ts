import { BaseResponse } from '@/types/common';
import { isProductionEnv } from '@/utils/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = getCookie('accessToken');
  if (!config.headers) {
    return config;
  }
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use((response) => {
  if (!isProductionEnv) {
    console.log(response);
  }
  return response.data;
});
