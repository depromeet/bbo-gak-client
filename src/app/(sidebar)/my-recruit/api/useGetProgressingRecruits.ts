import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RecruitCard } from '@/app/(sidebar)/my-recruit/type';

type Response = { data: RecruitCard[] };

export const GET_PROGRESSING_RECRUITS_KEY = 'recruits-progressing';

function getProgressingRecruits() {
  return http.get({ url: '/recruits/progressing' });
}

export function useGetProgressingRecruits() {
  const result = useSuspenseQuery({
    queryKey: [GET_PROGRESSING_RECRUITS_KEY],
    queryFn: getProgressingRecruits,
  });

  return result.data as unknown as Response;
}
