import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_PROGRESSING_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetProgressingRecruits';
import { GET_ALL_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetAllRecruits';

interface Request {
  id: number;
  recruitStatus: string;
}

export const PATCH_RECRUIT_STATUS_KEY = 'put-recruit-status';

function patchRecruitStatus({ id, recruitStatus }: Request) {
  return http.patch({ url: `/recruits/${id}/status`, data: { recruitStatus } });
}

export function usePatchRecruitStatus() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => patchRecruitStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESSING_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RECRUITS_KEY] });
    },
  });

  return mutate;
}
