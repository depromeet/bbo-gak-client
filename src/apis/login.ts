import type { PostLoginRequest, PostLoginResponse } from '@/types/login';
import { http } from './http';

export const postLogin = ({ loginId, password }: PostLoginRequest) => {
  return http.post<PostLoginResponse>({
    url: '/users/test/login',
    data: {
      loginId,
      password,
    },
  });
};
