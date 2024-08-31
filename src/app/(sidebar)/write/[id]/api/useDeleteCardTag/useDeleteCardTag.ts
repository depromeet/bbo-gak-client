import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/apis/http';

const deleteCardTag = (cardId: number, tagId: number) =>
  http.delete({
    url: `/cards/${cardId}/tag/${tagId}`,
  });

export const useDeleteCardTag = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-card-tag', cardId],
    mutationFn: (tagId: number) => deleteCardTag(cardId, tagId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] });
      await queryClient.invalidateQueries({ queryKey: ['get-card-detail'] });
    },
  });
};
