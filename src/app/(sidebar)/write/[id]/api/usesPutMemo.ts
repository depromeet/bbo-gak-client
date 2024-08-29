import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const putMemo = (cardId: number, memoId: number, content: string) =>
  http.put({
    url: `/cards/${cardId}/card-memo/${memoId}/content`,
    data: { content },
  });

export const usePutMemo = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-memo', cardId],
    mutationFn: ({ memoId, content }: { memoId: number; content: string }) => putMemo(cardId, memoId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-memos'] });
    },
  });
};
