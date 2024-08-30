import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const postMemo = (cardId: number, content: string) =>
  http.post({
    url: `/cards/${cardId}/card-memo`,
    data: { content },
  });

export const usePostMemo = (cardId: number) => {
  return useMutation({
    mutationKey: ['post-memo', cardId],
    mutationFn: (content: string) => postMemo(cardId, content),
  });
};
