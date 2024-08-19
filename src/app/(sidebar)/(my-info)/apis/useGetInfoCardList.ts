import { useQuery } from '@tanstack/react-query';
import { http } from '../../../../apis/http';
import { InfoCardType, InfoType } from '@/types/info';

type GetInfoCardListResponse = InfoCardType[];

const getInfoCardList = (cardType: InfoType) => {
  const convertedCardType = cardType.replaceAll(' ', '_');

  return http.get<GetInfoCardListResponse>({ url: `/cards?type=${convertedCardType}` });
};

export const useGetInfoCardList = (cardType: InfoType) => {
  return useQuery({
    queryKey: ['info-card-list', cardType],
    queryFn: async () => {
      const res = await getInfoCardList(cardType);

      return res.data;
    },
  });
};
