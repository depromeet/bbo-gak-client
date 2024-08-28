import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const getAllTags = () => {
  return http.get<TagType[]>({
    url: `/tags`,
  });
};

export function useGetAllTags() {
  const result = useSuspenseQuery({
    queryKey: ['get-all-tags'],
    queryFn: async () => {
      const res = await getAllTags();
      return res.data;
    },
  });

  return result;
}
