import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

interface recruitByIdType {
  id: number;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
}

type Response = { data: recruitByIdType };

const getRecruitById = (id: string) => {
  return http.get<recruitByIdType>({
    url: `/recruits/${id}`,
  });
};

export function useGetRecruitById(id: string) {
  const result = useSuspenseQuery({
    queryKey: ['get-recruit-by-id', id],
    queryFn: () => getRecruitById(id),
  });

  return result.data as unknown as Response;
}
