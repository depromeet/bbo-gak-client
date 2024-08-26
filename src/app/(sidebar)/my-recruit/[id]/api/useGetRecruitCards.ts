import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetRecruitCardsType = {
  id: number;
  title: string;
  updatedDate: string;
  tagList: TagType[];
};

type Response = { data: GetRecruitCardsType[] };

const getRecruitCards = ({ id, progress }: { id: string; progress: string }) => {
  return http.get<GetRecruitCardsType[]>({
    url: `recruits/${id}/cards?type=${progress}`,
  });
};

export function useGetRecruitCards({ id, progress }: { id: string; progress: string }) {
  const result = useSuspenseQuery({
    queryKey: ['get-recruit-card-id', id, progress],
    queryFn: () => getRecruitCards({ id, progress }),
  });

  return result.data as unknown as Response;
}
