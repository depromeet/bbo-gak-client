import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteRecruit = (id: string) => {
  return http.delete({
    url: `/recruits/${id}`,
  });
};

export const useDeleteRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['info-card-list'] });
      queryClient.invalidateQueries({ queryKey: ['card-type-count'] });
    },
  });
};
