import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useQuery } from '@tanstack/react-query';

const getAllTags = () => {
  return http.get<TagType[]>({
    url: `/tags`,
  });
};

export const useGetAllTags = () =>
  useQuery({
    queryKey: ['get-all-tags'],
    queryFn: async () => {
      const res = await getAllTags();
      return res.data;
    },
  });
