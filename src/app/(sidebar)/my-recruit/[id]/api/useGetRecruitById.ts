import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

interface recruitByIdType {
  id: string;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
}

const getRecruitById = (id: string) => {
  return http.get<recruitByIdType>({
    url: `/recruits/${id}`,
  });
};

export const useGetRecruitById = (id: string) =>
  useQuery({
    queryKey: ['get-recruit-by-id'],
    queryFn: async () => {
      const res = await getRecruitById(id);
      return res.data;
    },
  });
