import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const putMemo = (cardId: number, memoId: number, content: string) =>
  http.put({
    url: `/cards/${cardId}/card-memo/${memoId}/content`,
    data: { content },
  });

export const usePutMemo = (cardId: number) =>
  useMutation({
    mutationKey: ['put-memo', cardId],
    mutationFn: ({ memoId, content }: { memoId: number; content: string }) => putMemo(cardId, memoId, content),
  });
