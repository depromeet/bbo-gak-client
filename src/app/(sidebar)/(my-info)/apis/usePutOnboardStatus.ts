import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ONBOARD_STATUS } from '@/app/(sidebar)/(my-info)/apis/useGetOnboadStatus';

const putOnboardStatus = () => {
  return http.put<Response>({ url: `/users/onboard-status`, data: { isOnboardComplete: true } });
};

export const usePutOnboardStatus = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      const res = await putOnboardStatus();
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ONBOARD_STATUS] });
    },
  });

  return mutate;
};
