import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const getTags = () =>
  http.get<Array<TagType>>({
    url: '/tags',
  });

export const useGetTags = () =>
  useSuspenseQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  }).data;
