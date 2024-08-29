import { http } from '@/apis/http';

export const postLogin = (provider: 'GOOGLE' | 'KAKAO', token: string) =>
  http.post<{ accessToken: string; refreshToken: string; isFirstLogin: boolean }>({
    url: '/users/social-login',
    params: {
      provider,
    },
    headers: {
      'SOCIAL-AUTH-TOKEN': token,
    },
  });
