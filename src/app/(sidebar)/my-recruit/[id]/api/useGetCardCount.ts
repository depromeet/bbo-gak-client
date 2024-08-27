import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

type getCardCountType = Record<'서류_준비' | '과제_준비' | '인터뷰_준비', number>;

const getCardCount = (id: string) => {
  return http.get<getCardCountType>({
    url: `/recruits/${id}/cards/type-count`,
  });
};

export function useGetCardCount(id: string) {
  const result = useSuspenseQuery({
    queryKey: ['get-progress-recruit'],
    queryFn: async () => {
      const res = await getCardCount(id);
      return res.data;
    },
  });

  return result;
}
