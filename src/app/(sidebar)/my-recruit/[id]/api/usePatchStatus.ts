import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchStatusResponse {
  status: string;
}

interface patchStatusProps {
  newStatus: string;
  id: string;
}

const patchStatus = ({ newStatus, id }: patchStatusProps) => {
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
    mutationFn: async ({ newStatus, id }: patchStatusProps) => {
      const res = await patchStatus({ newStatus, id });

      console.log(res);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-recruit-by-id'] });
    },
  });
};
