import type { PostLoginRequest, PostLoginResponse } from '@/types/login';
import { AxiosResponse } from 'axios';
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
