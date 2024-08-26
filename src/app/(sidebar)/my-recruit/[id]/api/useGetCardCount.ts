import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

type getCardCountType = Record<'서류_준비' | '과제_준비' | '인터뷰_준비', number>;

type Response = { data: getCardCountType };

const getCardCount = (id: string) => {
  return http.get<getCardCountType>({
    url: `/recruits/${id}/cards/type-count`,
  });
};

export function useGetCardCount(id: string) {
  const result = useSuspenseQuery({
    queryKey: ['get-progress-recruit'],
    queryFn: () => getCardCount(id),
  });

  return result.data as unknown as Response;
}
