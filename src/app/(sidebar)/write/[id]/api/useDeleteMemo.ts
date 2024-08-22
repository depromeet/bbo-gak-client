import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const deleteMemo = (cardId: number, memoId: number) =>
  http.delete({
    url: `/cards/${cardId}/card-memo/${memoId}`,
  });

export const useDeleteMemo = (cardId: number) =>
  useMutation({
    mutationKey: ['delete-memo', cardId],
    mutationFn: (memoId: number) => deleteMemo(cardId, memoId),
  });
