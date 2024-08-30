import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const postMemo = (cardId: number, content: string) =>
  http.post({
    url: `/cards/${cardId}/card-memo`,
    data: { content },
  });

export const usePostMemo = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['post-memo', cardId],
    mutationFn: (content: string) => postMemo(cardId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-memos'] });
    },
  });
};
