import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';

const deleteCardTag = (cardId: number, tagId: number) =>
  http.delete({
    url: `/cards/${cardId}/title/tag/${tagId}`,
  });

export const useDeleteCardTag = (cardId: number) =>
  useMutation({
    mutationKey: ['delete-card-tag', cardId],
    mutationFn: (tagId: number) => deleteCardTag(cardId, tagId),
  });
