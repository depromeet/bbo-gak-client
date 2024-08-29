import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_BY_ID } from './useGetRecruitById';
import { ProgressRecruitType } from './usePatchSeason';

interface PatchSiteProps {
  newSiteUrl: string;
  id: string;
}

const patchSiteUrl = ({ newSiteUrl, id }: PatchSiteProps) => {
  return http.patch<ProgressRecruitType>({
    url: `/recruits/${id}/siteUrl`,
    data: {
      siteUrl: newSiteUrl,
    },
  });
};

export const usePatchSiteUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newSiteUrl, id }: PatchSiteProps) => {
      const res = await patchSiteUrl({ newSiteUrl, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_BY_ID] });
    },
  });
};
