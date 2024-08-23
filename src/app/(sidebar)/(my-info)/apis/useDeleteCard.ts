import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteCard = (cardId: number) => {
  return http.delete({
    url: `/card/${cardId}`,
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['info-card-list'] });
      queryClient.invalidateQueries({ queryKey: ['card-type-count'] });
    },
  });
};
