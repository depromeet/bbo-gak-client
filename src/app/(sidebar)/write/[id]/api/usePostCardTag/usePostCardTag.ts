import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';

const postCardTag = (cardId: number, tagId: number) =>
  http.post({
    url: `/cards/${cardId}/title/tag/${tagId}`,
  });

export const usePostCardTag = (cardId: number) =>
  useMutation({
    mutationKey: ['post-card-tag', cardId],
    mutationFn: (tagId: number) => postCardTag(cardId, tagId),
  });