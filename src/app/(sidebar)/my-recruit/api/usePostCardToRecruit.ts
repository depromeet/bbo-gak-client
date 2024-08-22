import { http } from '@/apis/http';
import { useMutation } from '@tanstack/react-query';

interface Request {
  recruitId: number;
  cardId: number;
}

export const POST_CARD_TO_RECRUIT_KEY = 'post-card-to-recruit';

function postCardToRecruit({ recruitId, cardId }: Request) {
  return http.post({ url: `/api/v1/recruits/${recruitId}/cards/${cardId}` });
}

export function usePostCardToRecruit() {
  const mutate = useMutation({
    mutationKey: [POST_CARD_TO_RECRUIT_KEY],
    mutationFn: (data: Request) => postCardToRecruit(data),
  });

  return mutate;
}
