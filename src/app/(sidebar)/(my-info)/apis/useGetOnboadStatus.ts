import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

type Response = {
  isOnboardComplete: boolean;
};

export const GET_ONBOARD_STATUS = 'get-onboard-status';

const getOnboardStatus = () => {
  return http.get<Response>({ url: `/users/onboard-status` });
};

export const useGetOnboardStatus = () => {
  return useSuspenseQuery({
    queryKey: [GET_ONBOARD_STATUS],
    queryFn: async () => {
      const res = await getOnboardStatus();
      return res.data;
    },
  });
};
