import type { PostLoginResponse, PostRefreshRequest } from '@/types/login';
import { http } from './http';

export const postRefresh = ({ refreshToken }: PostRefreshRequest) => {
  return http.post<PostLoginResponse>({
    url: '/users/refreshToken',
    data: {
      refreshToken,
    },
  });
};
