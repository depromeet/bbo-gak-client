import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetAllRecruits';
import { GET_PROGRESSING_RECRUITS_KEY } from '@/app/(sidebar)/my-recruit/api/useGetProgressingRecruits';

interface Request {
  id: number;
  recruitScheduleStage: string;
  deadLine: string;
}

function postRecruitSchedule({ id, ...data }: Request) {
  return http.post({ url: `/recruits/${id}/recruit-schedule`, data });
}

export function usePostRecruitSchedule() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => postRecruitSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESSING_RECRUITS_KEY] });
    },
  });

  return mutate;
}
