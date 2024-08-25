import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

export type getCardCountType = {
  서류_준비: number;
  과제_준비: number;
  인터뷰_준비: number;
};

const getCardCount = (id: string) => {
  return http.get<getCardCountType>({
    url: `/recruits/${id}/cards/type-count`,
  });
};

export const useGetCardCount = (id: string) =>
  useQuery({
    queryKey: ['get-card-count', id],
    queryFn: async () => {
      const res = await getCardCount(id);
      return res.data;
    },
  });
