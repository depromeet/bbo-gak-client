import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

type Response = { data: TagType[] };

const getAllTags = () => {
  return http.get<TagType[]>({
    url: `/tags`,
  });
};

export function useGetAllTags() {
  const result = useSuspenseQuery({
    queryKey: ['get-all-tags'],
    queryFn: () => getAllTags(),
  });

  return result.data as unknown as Response;
}
