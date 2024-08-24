import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProgressRecruitType } from './useGetProgressRecruit';

interface patchSiteProps {
  newSiteUrl: string;
  id: string;
}

const patchSiteUrl = ({ newSiteUrl, id }: patchSiteProps) => {
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
    mutationFn: async ({ newSiteUrl, id }: patchSiteProps) => {
      const res = await patchSiteUrl({ newSiteUrl, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-recruit-by-id'] });
    },
  });
};
