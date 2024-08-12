import { useQuery } from '@tanstack/react-query';
import { http } from '../../../../apis/http';
import { InfoCard, InfoCardType } from '@/types/info';

type GetInfoCardListResponse = InfoCard[];

const getInfoCardList = (cardType: InfoCardType) => {
  const convertedCardType = cardType.replaceAll(' ', '_');

  return http.get<GetInfoCardListResponse>({ url: `/cards?type=${convertedCardType}` });
};

export const useGetInfoCardList = (cardType: InfoCardType) => {
  return useQuery({
    queryKey: ['info-card-list', cardType],
    queryFn: async () => {
      const res = await getInfoCardList(cardType);

      return res.data;
    },
  });
};
