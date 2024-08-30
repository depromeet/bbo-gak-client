import { http } from '@/apis/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_RECRUIT_CARD_COUNT } from '../[id]/api/useGetCardCount';
import { GET_RECRUIT_BY_ID } from '../[id]/api/useGetRecruitById';

interface Request {
  recruitId: number;
  cardId: number;
}

export const POST_CARD_TO_RECRUIT_KEY = 'post-card-to-recruit';

function postCardToRecruit({ recruitId, cardId }: Request) {
  return http.post({ url: `/recruits/${recruitId}/cards/${cardId}` });
}

export function usePostCardToRecruit() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: [POST_CARD_TO_RECRUIT_KEY],
    mutationFn: (data: Request) => postCardToRecruit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_CARD_COUNT] });
      queryClient.invalidateQueries({ queryKey: [GET_RECRUIT_BY_ID] });
    },
  });

  return mutate;
}
