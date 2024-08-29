import { http } from '@/apis/http';
import { RecruitType } from '@/types/recruit';
import { useSuspenseQuery } from '@tanstack/react-query';

type GetCardCountType = Record<RecruitType, number>;

const getCardCount = (id: string) => {
  return http.get<GetCardCountType>({
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
