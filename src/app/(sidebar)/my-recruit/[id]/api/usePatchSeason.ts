import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_BY_ID } from './useGetRecruitById';

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

interface PatchSeasonProps {
  newSeason: string;
  id: string;
}

const patchSeason = ({ newSeason, id }: PatchSeasonProps) => {
  return http.patch<ProgressRecruitType>({
    url: `/recruits/${id}/season`,
    data: {
      season: newSeason,
    },
  });
};

export const usePatchSeason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newSeason, id }: PatchSeasonProps) => {
      const res = await patchSeason({ newSeason, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_BY_ID] });
    },
  });
};
