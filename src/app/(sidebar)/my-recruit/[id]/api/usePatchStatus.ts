import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_BY_ID } from './useGetRecruitById';

interface PatchStatusResponse {
  status: string;
}

interface PatchStatusProps {
  newStatus: string;
  id: string;
}

const patchStatus = ({ newStatus, id }: PatchStatusProps) => {
  return http.patch<PatchStatusResponse>({
    url: `/recruits/${id}/status`,
    data: {
      recruitStatus: newStatus,
    },
  });
};

export const usePatchStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newStatus, id }: PatchStatusProps) => {
      const res = await patchStatus({ newStatus, id });

      console.log(res);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_BY_ID] });
    },
  });
};
