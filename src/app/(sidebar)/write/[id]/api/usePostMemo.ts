import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const postMemo = (cardId: string, content: string) =>
  http.post({
    url: `/cards/${cardId}/card-memo`,
    data: { content },
  });

export const usePostMemo = (cardId: string) =>
  useMutation({
    mutationKey: ['post-memo', cardId],
    mutationFn: (content: string) => postMemo(cardId, content),
  });
