import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RecruitCard } from '@/app/(sidebar)/my-recruit/type';

type Request = { season: string };

type Response = { data: RecruitCard[] };

export const GET_RECRUIT_BY_SEASON_KEY = 'recruits-by-season';

function getRecruitsBySeason({ season }: Request) {
  return http.get({ url: '/recruits/bySeason', params: { season } });
}

export function useGetRecruitsBySeason({ season }: Request) {
  const result = useSuspenseQuery({
    queryKey: [GET_RECRUIT_BY_SEASON_KEY, season],
    queryFn: () => getRecruitsBySeason({ season }),
  });

  return result.data as unknown as Response;
}
