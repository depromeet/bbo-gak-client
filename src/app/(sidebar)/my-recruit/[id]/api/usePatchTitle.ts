import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PatchTitleResponse {
  title: string;
}

interface PatchTitleProps {
  newTitle: string;
  id: string;
}

const patchTitle = ({ newTitle, id }: PatchTitleProps) => {
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
    mutationFn: async ({ newTitle, id }: PatchTitleProps) => {
      const res = await patchTitle({ newTitle, id });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-recruit-by-id'] });
    },
  });
};
