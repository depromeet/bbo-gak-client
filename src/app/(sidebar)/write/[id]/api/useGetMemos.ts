import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetMemosResponse = Array<{
  id: number;
  content: string;
  updatedAt: string;
}>;

const getMemos = (cardId: string) =>
  http.get<GetMemosResponse>({
    url: `/cards/${cardId}/card-memo`,
  });

export const useGetMemos = (cardId: string) =>
  useSuspenseQuery({
    queryKey: ['get-memos', cardId],
    queryFn: () => getMemos(cardId),
    select: ({ result }) => result,
  });
