import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_INFO_CARD_LIST } from './useGetInfoCardList';
import { GET_CARD_TYPE_COUNT } from './useGetCardTypeCount';

const deleteCard = (cardId: number) => {
  return http.delete({
    url: `/cards/${cardId}`,
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_INFO_CARD_LIST] });
      queryClient.invalidateQueries({ queryKey: [GET_CARD_TYPE_COUNT] });
    },
  });
};
