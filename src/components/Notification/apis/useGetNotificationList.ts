import { useSuspenseQuery } from '@tanstack/react-query';
import { NotificationType } from '@/types/notification';
import { http } from '@/apis/http';

export const GET_NOTIFICATION_LIST = 'notification-list';

type GetNotificationListResponse = NotificationType[];

const getNotificationList = () => {
  return http.get<GetNotificationListResponse>({ url: `/notifications` });
};

export const useGetNotificationList = () => {
  return useSuspenseQuery({
    queryKey: [GET_NOTIFICATION_LIST],
    queryFn: async () => {
      const res = await getNotificationList();

      return res.data;
    },
  });
};
