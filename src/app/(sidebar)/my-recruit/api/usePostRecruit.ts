import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_PROGRESSING_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetProgressingRecruits';
import { GET_ALL_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetAllRecruits';

export interface Request {
  title: string;
  season: string;
  siteUrl: string;
  recruitScheduleStage: string;
  deadLine: string | null;
}

export const POST_RECRUIT_KEY = 'post-recruit';

function postRecruit(data: Request) {
  return http.post({ url: '/recruits', data });
}

export function usePostRecruit() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => postRecruit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESSING_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RECRUITS_KEY] });
    },
  });

  return mutate;
}
