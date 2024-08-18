import type { PostLoginRequest, PostLoginResponse } from '@/types/login';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { http } from './http';

export const postLogin = async ({ loginId, password }: PostLoginRequest): Promise<PostLoginResponse> => {
  const response: AxiosResponse<PostLoginResponse> = await http.post<PostLoginResponse>({
    url: '/users/test/login',
    data: {
      loginId,
      password,
    },
  });

  return response.data;
};

export const loginMutation = () =>
  useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      window.location.href = '/';
      alert('로그인 성공');
    },
    onError: () => {
      alert('로그인 실패');
    },
  });
