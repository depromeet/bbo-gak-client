import { useMutation } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { http } from './http';

export const getLogout = async () => {
  return await http.get({
    url: '/users/logout',
  });
};

export const logoutMutation = () =>
  useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/';
    },
  });
