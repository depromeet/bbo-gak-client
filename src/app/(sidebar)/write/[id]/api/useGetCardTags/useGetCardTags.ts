import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '@/apis/http';

export type GetCardDetailTags = Array<{
  id: number;
  name: string;
  type: string;
}>;

const getCardDetailTags = (cardId: number) =>
  http.get<GetCardDetailTags>({
    url: `/cards/${cardId}/tags`,
  });

export const useGetCardDetailTags = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-card-detail-tags'],
    queryFn: () => getCardDetailTags(cardId),
  });
