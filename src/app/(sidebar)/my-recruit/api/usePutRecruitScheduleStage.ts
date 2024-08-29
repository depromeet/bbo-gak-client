import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_SCHEDULE } from '@/app/(sidebar)/my-recruit/api/useGetRecruitSchedule';

interface Request {
  id: number;
  recruitScheduleId: number;
  recruitScheduleStage: string;
}

export function putRecruitScheduleStage({ id, recruitScheduleId, recruitScheduleStage }: Request) {
  return http.put({
    url: `/recruits/${id}/recruit-schedule/${recruitScheduleId}/stage`,
    data: { recruitScheduleStage },
  });
}

export function usePutRecruitScheduleStage() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => putRecruitScheduleStage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_SCHEDULE] });
    },
  });

  return mutate;
}
