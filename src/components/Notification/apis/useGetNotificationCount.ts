import { useQuery } from '@tanstack/react-query';
import { http } from '@/apis/http';

export const GET_NOTIFICATION_COUNT = 'notification-count';

interface GetNotificationCountResponse {
  number: number;
}

const getNotificationCount = () => {
  return http.get<GetNotificationCountResponse>({ url: `/notifications/num` });
};

export const useGetNotificationCount = () => {
  return useQuery({
    queryKey: [GET_NOTIFICATION_COUNT],
    queryFn: async () => {
      const res = await getNotificationCount();

      return res.data;
    },
  });
};
