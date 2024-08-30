import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const postLogin = ({ provider, token }: { provider: 'GOOGLE' | 'KAKAO'; token: string }) =>
  http.post<{ accessToken: string; refreshToken: string; isFirstLogin: boolean }>({
    url: '/users/social-login',
    params: {
      provider,
    },
    headers: {
      'SOCIAL-AUTH-TOKEN': token,
    },
  });

export const usePostLogin = () =>
  useMutation({
    mutationKey: ['post-login'],
    mutationFn: postLogin,
  });
