import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetRecruitCardsType = {
  id: number;
  title: string;
  updatedDate: string;
  tagList: TagType[];
};

const getRecruitCards = ({ id, type, tagIds }: { id: string; type: string; tagIds?: number[] }) => {
  return http.get<GetRecruitCardsType[]>({
    url: `recruits/${id}/cards`,
    params: {
      type: type,
      'tag-ids': tagIds?.join(','),
    },
  });
};

export function useGetRecruitCards({ id, type, tagIds }: { id: string; type: string; tagIds?: number[] }) {
  const result = useSuspenseQuery({
    queryKey: ['get-recruit-card-id', id, type, tagIds],
    queryFn: async () => {
      const res = await getRecruitCards({ id, type, tagIds });
      return res.data;
    },
  });

  return result;
}
