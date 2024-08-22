import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '@/apis/http';

export type GetCardDetailTagsResponse = Array<{
  id: number;
  name: string;
  type: string;
}>;

const GetCardDetailTagsResponse = (cardId: number) =>
  http.get<GetCardDetailTagsResponse>({
    url: `/cards/${cardId}/tags`,
  });

export const useGetCardDetailTagsResponse = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-card-detail-tags'],
    queryFn: () => GetCardDetailTagsResponse(cardId),
  });
