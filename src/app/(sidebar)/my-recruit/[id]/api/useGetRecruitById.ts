import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface RecruitByIdType {
  id: number;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
}

const getRecruitById = (id: string) => {
  return http.get<RecruitByIdType>({
    url: `/recruits/${id}`,
  });
};

export function useGetRecruitById(id: string) {
  const result = useSuspenseQuery({
    queryKey: ['get-recruit-by-id', id],
    queryFn: async () => {
      const res = await getRecruitById(id);
      return res.data;
    },
  });

  return result;
}
