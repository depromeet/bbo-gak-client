import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface RecruitByIdType {
  id: number;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
}

export const GET_RECRUIT_BY_ID = 'get-recruit-by-id';

const getRecruitById = (id: string) => {
  return http.get<RecruitByIdType>({
    url: `/recruits/${id}`,
  });
};

export const useGetRecruitById = (id: string) => {
  return useSuspenseQuery({
    queryKey: [GET_RECRUIT_BY_ID, id],
    queryFn: async () => {
      const res = await getRecruitById(id);

      return res.data;
    },
  });
};
