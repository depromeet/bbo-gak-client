import { http } from '@/apis/http';
import { TagType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export const GET_CATEGORY_TAGS = 'get-category-tags';

const getCategoryTags = ({ recruitId, type }: { recruitId: string; type: string }) => {
  return http.get<TagType[]>({
    url: `recruits/${recruitId}/tags`,
    params: { type },
  });
};

export function useGetCategoryTags({ recruitId, type }: { recruitId: string; type: string }) {
  const result = useSuspenseQuery({
    queryKey: [GET_CATEGORY_TAGS, recruitId, type],
    queryFn: async () => {
      const res = await getCategoryTags({ recruitId, type });
      return res.data;
    },
    staleTime: 0,
  });

  return result;
}
