import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_SCHEDULE } from '@/app/(sidebar)/my-recruit/api/useGetRecruitSchedule';

interface Request {
  id: number;
  recruitScheduleId: number;
  deadLine: string;
}

export function putRecruitScheduleDeadline({ id, recruitScheduleId, deadLine }: Request) {
  return http.put({ url: `/recruits/${id}/recruit-schedule/${recruitScheduleId}/deadLine`, data: { deadLine } });
}

export function usePutRecruitScheduleDeadline() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => putRecruitScheduleDeadline(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_SCHEDULE] });
    },
  });

  return mutate;
}
