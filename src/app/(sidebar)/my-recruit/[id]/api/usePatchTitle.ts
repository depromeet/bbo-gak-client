import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchTitleResponse {
  title: string;
}

interface patchTitleProps {
  newTitle: string;
  id: string;
}

const patchTitle = ({ newTitle, id }: patchTitleProps) => {
  return http.patch<PatchTitleResponse>({
    url: `/recruits/${id}/title`,
    data: {
      title: newTitle,
    },
  });
};

export const usePatchTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newTitle, id }: patchTitleProps) => {
      const res = await patchTitle({ newTitle, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['info-card-list'] });
      queryClient.invalidateQueries({ queryKey: ['card-type-count'] });
    },
  });
};
