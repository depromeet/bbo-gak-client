import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/apis/http';

const postCardTag = (cardId: number, tagId: number) =>
  http.post({
    url: `/cards/${cardId}/tag/${tagId}`,
  });

export const usePostCardTag = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['post-card-tag', cardId],
    mutationFn: (tagId: number) => postCardTag(cardId, tagId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] });
      await queryClient.invalidateQueries({ queryKey: ['get-card-detail'] });
    },
  });
};
