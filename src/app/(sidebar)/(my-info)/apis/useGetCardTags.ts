import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useQuery } from '@tanstack/react-query';

type GetCardTagsRseponse = TagType[];

const getCardTags = () => {
  return http.get<GetCardTagsRseponse>({ url: `/tags` });
};

export const useGetCardTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await getCardTags();

      return res.data;
    },
  });
};
