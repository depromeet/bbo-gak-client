import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface Tag {
  id: number;
  name: string;
  type: string;
}

const getTags = () =>
  http.get<Array<Tag>>({
    url: '/tags',
  });

export const useGetTags = () =>
  useSuspenseQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    select: ({ data }) => data,
  });
