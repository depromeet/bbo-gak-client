import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';
import { CardGroup, InfoType } from '@/types/info';

export interface PutCardTypeRequest {
  cardTypeValueList: Array<InfoType>;
  cardTypeValueGroup: CardGroup;
  cardId: number;
}

const putCardType = ({ cardId, cardTypeValueList, cardTypeValueGroup }: PutCardTypeRequest) =>
  http.put({
    url: `/cards/${cardId}/card-type`,
    data: {
      cardTypeValueList,
      cardTypeValueGroup,
    },
  });

export const usePutCardType = (cardId: number) =>
  useMutation({
    mutationKey: ['put-card-type'],
    mutationFn: (cardInfo: Omit<PutCardTypeRequest, 'cardId'>) => putCardType({ ...cardInfo, cardId }),
  });
