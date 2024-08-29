import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_SCHEDULE } from '@/app/(sidebar)/my-recruit/api/useGetRecruitSchedule';

interface Request {
  id: number;
  recruitScheduleId: number;
}

function deleteRecruitSchedule({ id, recruitScheduleId }: Request) {
  return http.delete({ url: `/recruits/${id}/recruit-schedule/${recruitScheduleId}` });
}

export function useDeleteRecruitSchedule() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: Request) => deleteRecruitSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_SCHEDULE] });
    },
  });

  return mutate;
}
