import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../../../apis/http';
import { InfoCardType, InfoType } from '@/types/info';

export const GET_INFO_CARD_LIST = 'info-card-list';

type GetInfoCardListResponse = InfoCardType[];

const getInfoCardList = (cardType: InfoType) => {
  return http.get<GetInfoCardListResponse>({ url: `/cards?type=${cardType}` });
};

export const useGetInfoCardList = (cardType: InfoType) => {
  return useSuspenseQuery({
    queryKey: [GET_INFO_CARD_LIST, cardType],
    queryFn: async () => {
      const res = await getInfoCardList(cardType);

      return res.data;
    },
  });
};
