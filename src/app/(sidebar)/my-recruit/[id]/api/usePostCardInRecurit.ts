import { http } from '@/apis/http';
import { RecruitType } from '@/types/recruit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CARD_COUNT } from './useGetCardCount';
import { GET_RECRUIT_CARD_ID } from './useGetRecruitCards';

interface PostCardResponse {
  cardId: number;
}

const postCardInRecruit = (cardType: RecruitType, tagIdList: number[], recruitId: string) => {
  return http.post<PostCardResponse>({
    url: `/card`,
    data: {
      cardTypeValueGroup: '공고',
      cardTypeValueList: [cardType],
      tagIdList,
      recruitId,
    },
  });
};

export const usePostCardInRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cardType,
      tagIdList,
      recruitId,
    }: {
      cardType: RecruitType;
      tagIdList: number[];
      recruitId: string;
    }) => {
      const res = await postCardInRecruit(cardType, tagIdList, recruitId);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_CARD_ID] });
      queryClient.invalidateQueries({ queryKey: [GET_CARD_COUNT] });
    },
  });
};
