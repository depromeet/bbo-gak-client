import { http } from '@/apis/http';
import { InfoType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostCardResponse {
  id: number;
}

const postCard = (cardType: InfoType, tagIdList: number[]) => {
  return http.post<PostCardResponse>({
    url: `/card`,
    data: {
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
      queryClient.invalidateQueries({ queryKey: ['info-card-list'] });
      queryClient.invalidateQueries({ queryKey: ['card-type-count'] });
    },
  });
};
