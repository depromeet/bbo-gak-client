import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProgressRecruitType } from './useGetProgressRecruit';

interface patchSeasonProps {
  newSeason: string;
  id: string;
}

const patchSeason = ({ newSeason, id }: patchSeasonProps) => {
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
    mutationFn: async ({ newSeason, id }: patchSeasonProps) => {
      const res = await patchSeason({ newSeason, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['info-card-list'] });
      queryClient.invalidateQueries({ queryKey: ['card-type-count'] });
    },
  });
};
