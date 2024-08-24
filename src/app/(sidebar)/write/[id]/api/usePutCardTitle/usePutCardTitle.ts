import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';

const putCardTitle = (cardId: number, title: string) =>
  http.put({
    url: `/cards/${cardId}/title`,
    data: { title },
  });

export const usePutCardTitle = (cardId: number) =>
  useMutation({
    mutationKey: ['put-card', cardId],
    mutationFn: (title: string) => putCardTitle(cardId, title),
  });
