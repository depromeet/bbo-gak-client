import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/apis/http';

const putCardTitle = (cardId: number, title: string) =>
  http.put({
    url: `/cards/${cardId}/title`,
    data: { title },
  });

export const usePutCardTitle = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-card', cardId],
    mutationFn: (title: string) => putCardTitle(cardId, title),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};
