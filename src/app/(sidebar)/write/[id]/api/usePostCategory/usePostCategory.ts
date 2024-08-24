import { useMutation } from '@tanstack/react-query';
import { http } from '@/apis/http';

const postCardTitle = (cardId: number, cardTypeValuList: string[]) =>
  http.post({
    url: `/cards/${cardId}/title`,
    data: { cardTypeValuList },
  });

export const usePostCardTitle = (cardId: number) =>
  useMutation({
    mutationKey: ['post-card', cardId],
    mutationFn: (cardTypeValuList: string[]) => postCardTitle(cardId, cardTypeValuList),
  });
