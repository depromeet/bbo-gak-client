import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetRecruitCardsType = Array<{
  id: string;
  title: string;
  updatedDate: string;
  tagList: string[];
}>;

const getRecruitCards = ({ id, progress }: { id: string; progress: string }) => {
  return http.get<GetRecruitCardsType>({
    url: `recruits/${id}/cards?type=${progress}`,
  });
};

export const useGetRecruitCards = ({ id, progress }: { id: string; progress: string }) =>
  useSuspenseQuery({
    queryKey: ['get-recruit-card'],
    queryFn: async () => {
      const res = await getRecruitCards({ id, progress });
      return res.data;
    },
  });
