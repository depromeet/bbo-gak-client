import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface Request {
  title: string;
  season: string;
  siteUrl: string;
  recruitScheduleStage: string;
  deadline: string | null;
}

export const POST_RECRUIT_KEY = 'post-recruit';

function postRecruit(data: Request) {
  return http.post({ url: '/recruits', data });
}

export function usePostRecruit() {
  const { invalidateQueries } = useQueryClient();

  const mutate = useMutation({
    mutationKey: [POST_RECRUIT_KEY],
    mutationFn: (data: Request) => postRecruit(data),
  });

  return mutate;
}
