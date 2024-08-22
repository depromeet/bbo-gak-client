import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RecruitCard } from '@/app/(sidebar)/my-recruit/type';
import { ALL_RECRUITMENT } from '@/app/(sidebar)/my-recruit/containers/components/SeasonDropdownContent';

type Request = { season: string };

type Response = { data: RecruitCard[] };

export const GET_RECRUITS = 'recruits';

function getAllRecruits() {
  return http.get({ url: '/recruits' });
}

function getRecruitsBySeason({ season }: Request) {
  return http.get({ url: '/recruits/bySeason', params: { season } });
}

export function useGetAllRecruits({ season }: Request) {
  const result = useSuspenseQuery({
    queryKey: [GET_RECRUITS, season],
    queryFn: season === ALL_RECRUITMENT ? getAllRecruits : () => getRecruitsBySeason({ season }),
  });

  return result.data as unknown as Response;
}
