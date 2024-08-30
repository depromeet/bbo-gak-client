import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_PROGRESSING_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetProgressingRecruits';
import { GET_ALL_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetAllRecruits';
import { GET_RECRUIT_TITLES_KEY } from './useGetRecruitTitles';

export const DELETE_RECRUIT_KEY = 'delete-recruit';

export const deleteRecruit = (recruitId: number) =>
  http.delete({
    url: `/recruits/${recruitId}`,
  });

export const useDeleteRecruit = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (recruitId: number) => deleteRecruit(recruitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESSING_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_TITLES_KEY] });
    },
  });

  return mutate;
};
