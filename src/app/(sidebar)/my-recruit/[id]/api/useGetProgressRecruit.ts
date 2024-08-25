import { http } from '@/apis/http';
import { useQuery } from '@tanstack/react-query';

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

export const useGetProgressRecruit = () =>
  useQuery({
    queryKey: ['get-progress-recruit'],
    queryFn: async () => {
      const res = await getProgressRecruit();
      return res.data;
    },
  });
