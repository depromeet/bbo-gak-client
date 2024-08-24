import { useQuery } from '@tanstack/react-query';
import { http } from '../../../../apis/http';

export const GET_CARD_TYPE_COUNT = 'card-type-count';

type GetCardTypeCountResponse = {
  경험_정리: number;
  자기소개서: number;
  면접_질문: number;
};

const getCardTypeCount = () => {
  return http.get<GetCardTypeCountResponse>({ url: `/cards/type-count` });
};

export const useGetCardTypeCount = () => {
  return useQuery({
    queryKey: [GET_CARD_TYPE_COUNT],
    queryFn: async () => {
      const res = await getCardTypeCount();

      return res.data;
    },
  });
};
