import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_CARD_COUNT } from '../../my-recruit/[id]/api/useGetCardCount';
import { GET_RECRUIT_CARD_ID } from '../../my-recruit/[id]/api/useGetRecruitCards';
import { GET_CARD_TYPE_COUNT } from './useGetCardTypeCount';
import { GET_INFO_CARD_LIST } from './useGetInfoCardList';

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
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_CARD_ID] });
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_CARD_COUNT] });
    },
  });
};
