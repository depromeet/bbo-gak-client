import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export const GET_ALL_TAGS = 'get-all-tags';

const getAllTags = () => {
  return http.get<TagType[]>({
    url: `/tags`,
  });
};

export function useGetAllTags() {
  const result = useSuspenseQuery({
    queryKey: [GET_ALL_TAGS],
    queryFn: async () => {
      const res = await getAllTags();
      return res.data;
    },
  });

  return result;
}
