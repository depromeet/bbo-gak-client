import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface NearestScheduleType {
  id: number;
  recruitScheduleStage: string;
  deadLine: string;
}

export interface ProgressRecruitType {
  id: number;
  title: string;
  season: string;
  siteUrl: string;
  recruitStatus: string;
  createdDate: string;
  nearestSchedule: NearestScheduleType | null;
}

const getProgressRecruit = () => {
  return http.get<ProgressRecruitType[]>({
    url: `/recruits/progressing`,
  });
};

export function useGetProgressRecruit() {
  const result = useSuspenseQuery({
    queryKey: ['get-progress-recruit'],
    queryFn: () => getProgressRecruit(),
  });

  return result.data as unknown as ProgressRecruitType[];
}
