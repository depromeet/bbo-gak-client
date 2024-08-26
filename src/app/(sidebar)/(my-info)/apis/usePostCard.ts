import { http } from '@/apis/http';
import { InfoType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_INFO_CARD_LIST } from './useGetInfoCardList';
import { GET_CARD_TYPE_COUNT } from './useGetCardTypeCount';

interface PostCardResponse {
  cardId: number;
}

const postCard = (cardType: InfoType, tagIdList: number[]) => {
  return http.post<PostCardResponse>({
    url: `/card`,
    data: {
      cardTypeValueGroup: '내_정보',
      cardTypeValueList: [cardType],
      tagIdList,
    },
  });
};

export const usePostCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cardType, tagIdList }: { cardType: InfoType; tagIdList: number[] }) => {
      const res = await postCard(cardType, tagIdList);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_INFO_CARD_LIST] });
      queryClient.invalidateQueries({ queryKey: [GET_CARD_TYPE_COUNT] });
    },
  });
};
