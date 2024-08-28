import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const GET_TAGS = 'tagList';

type GetCardTagsRseponse = TagType[];

const getCardTags = () => {
  return http.get<GetCardTagsRseponse>({ url: `/tags` });
};

export const useGetCardTags = () => {
  return useQuery({
    queryKey: [GET_TAGS],
    queryFn: async () => {
      const res = await getCardTags();

      return res.data;
    },
  });
};
