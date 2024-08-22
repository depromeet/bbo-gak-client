import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

interface Request {
  id: number;
  recruitStatus: string;
}

export const PATCH_RECRUIT_STATUS_KEY = 'put-recruit-status';

function patchRecruitStatus({ id, recruitStatus }: Request) {
  return http.patch({ url: `/recruits/${id}/status`, data: { recruitStatus } });
}

export function usePatchRecruitStatus() {
  const mutate = useMutation({
    mutationKey: [PATCH_RECRUIT_STATUS_KEY],
    mutationFn: (data: Request) => patchRecruitStatus(data),
  });

  return mutate;
}
