import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_NOTIFICATION_COUNT } from './useGetNotificationCount';
import { GET_NOTIFICATION_LIST } from './useGetNotificationList';

const putNotificationRead = () => {
  return http.put({ url: `/notifications` });
};

export const usePutNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATION_COUNT] });
      queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATION_LIST] });
    },
  });
};
