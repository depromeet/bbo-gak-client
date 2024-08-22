import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

export const DELETE_RECRUIT_KEY = 'delete-recruit';

export const deleteRecruit = (recruitId: number) =>
  http.delete({
    url: `/recruits/${recruitId}`,
  });

export const useDeleteRecruit = () =>
  useMutation({
    mutationKey: [DELETE_RECRUIT_KEY],
    mutationFn: (recruitId: number) => deleteRecruit(recruitId),
  });
