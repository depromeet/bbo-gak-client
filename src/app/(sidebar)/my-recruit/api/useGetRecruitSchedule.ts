import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

interface Request {
  id: number;
}

interface ScheduleType {
  id: number;
  recruitScheduleStage: string;
  deadLine: string;
}

export const GET_RECRUIT_SCHEDULE = 'get-recruit-schedule';

function getRecruitSchedule({ id }: Request) {
  return http.get<ScheduleType[]>({ url: `/recruits/${id}/recruit-schedule` });
}

export function useGetRecruitSchedule({ id }: Request) {
  const result = useSuspenseQuery({
    queryKey: [GET_RECRUIT_SCHEDULE, id],
    queryFn: async () => {
      const res = await getRecruitSchedule({ id });
      return res.data;
    },
  });

  return result;
}
