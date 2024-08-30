import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

const putOnboardStatus = () => {
  return http.put<Response>({ url: `/users/onboard-status`, data: { isOnboardComplete: true } });
};

export const usePutOnboardStatus = () => {
  const mutate = useMutation({
    mutationFn: async () => {
      const res = await putOnboardStatus();
      return res.data;
    },
  });

  return mutate;
};
