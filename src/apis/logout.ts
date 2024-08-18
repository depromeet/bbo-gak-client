import { http } from './http';

export const getLogout = async () => {
  return await http.get({
    url: '/users/logout',
  });
};
