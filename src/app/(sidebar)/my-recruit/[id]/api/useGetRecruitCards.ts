import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetRecruitCardsType = Array<{
  id: string;
  title: string;
  updatedDate: string;
  tagList: string[];
}>;

const getRecruitCards = (id: string) => {
  return http.get<GetRecruitCardsType>({
    url: `/recruits/${id}/cards`,
  });
};

export const useGetRecruitCards = (id: string) =>
  useSuspenseQuery({
    queryKey: ['get-recruit-card'],
    queryFn: async () => {
      const res = await getRecruitCards(id);
      return res.data;
    },
  });
