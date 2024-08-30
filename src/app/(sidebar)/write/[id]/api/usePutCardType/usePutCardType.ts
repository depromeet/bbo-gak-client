import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/apis/http';
import { CardGroup, TypeTag } from '@/types/info';

export interface PutCardTypeRequest {
  cardTypeValueList: Array<TypeTag>;
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

export const usePutCardType = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-card-type'],
    mutationFn: (cardInfo: Omit<PutCardTypeRequest, 'cardId'>) => putCardType({ ...cardInfo, cardId }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-progress-recruit'] });
    },
  });
};
