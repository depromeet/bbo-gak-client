import { http } from '@/apis/http';
import { RecruitType } from '@/types/recruit';
import { useQuery } from '@tanstack/react-query';

type GetCardCountType = Record<RecruitType, number>;

export const GET_CARD_COUNT = 'get-card-count';

const getCardCount = (id: string) => {
  return http.get<GetCardCountType>({
    url: `/recruits/${id}/cards/type-count`,
  });
};

export function useGetCardCount(id: string) {
  const result = useQuery({
    queryKey: [GET_CARD_COUNT],
    queryFn: async () => {
      const res = await getCardCount(id);
      return res.data;
    },
  });

  return result;
}
