import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export type GetRecruitCardsType = {
  id: number;
  title: string;
  updatedDate: string;
  tagList: TagType[];
};

const getRecruitCards = ({ id, progress }: { id: string; progress: string }) => {
  return http.get<GetRecruitCardsType[]>({
    url: `recruits/${id}/cards?type=${progress}`,
  });
};

export const useGetRecruitCards = ({ id, progress }: { id: string; progress: string }) =>
  useQuery({
    queryKey: ['get-recruit-card-id', id, progress],
    queryFn: async () => {
      const res = await getRecruitCards({ id, progress });
      return res.data;
    },
  });
