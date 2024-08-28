import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProgressRecruitType } from './useGetProgressRecruit';

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
      queryClient.invalidateQueries({ queryKey: ['get-recruit-by-id'] });
    },
  });
};
