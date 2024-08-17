import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetMemosResponse = Array<{
  id: number;
  content: string;
  updatedAt: string;
}>;

const getMemos = (cardId: number) =>
  http.get<GetMemosResponse>({
    url: `/cards/${cardId}/card-memo`,
  });

export const useGetMemos = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-memos', cardId],
    queryFn: () => getMemos(cardId),
  });
