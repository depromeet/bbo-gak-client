import { http } from '@/apis/http';
import { RecruitType } from '@/types/recruit';
import { useQuery } from '@tanstack/react-query';

type GetCardCountType = Record<RecruitType, number>;

export const GET_RECRUIT_CARD_COUNT = 'get-card-count';

const getRecruitCardCount = (id: string) => {
  return http.get<GetCardCountType>({
    url: `/recruits/${id}/cards/type-count`,
  });
};

export function useGetRecruitCardCount(id: string) {
  const result = useQuery({
    queryKey: [GET_RECRUIT_CARD_COUNT],
    queryFn: async () => {
      const res = await getRecruitCardCount(id);
      return res.data;
    },
  });

  return result;
}
