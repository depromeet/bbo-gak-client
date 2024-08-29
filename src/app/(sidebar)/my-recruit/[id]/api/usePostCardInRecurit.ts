import { http } from '@/apis/http';
import { RecruitType } from '@/types/recruit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.invalidateQueries({ queryKey: ['get-recruit-card-id'] });
      queryClient.invalidateQueries({ queryKey: ['get-progress-recruit'] });
    },
  });
};
