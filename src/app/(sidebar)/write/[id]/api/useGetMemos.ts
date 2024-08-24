import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetMemosResponse = Array<{
  id: number;
  content: string;
  updatedDate: string;
}>;

const getMemos = (cardId: string) =>
  http.get<GetMemosResponse>({
    url: `/cards/${cardId}/card-memo`,
  });

export const useGetMemos = (cardId: string) =>
  useSuspenseQuery({
    queryKey: ['get-memos', cardId],
    queryFn: () => getMemos(cardId),
    select: ({ data }) => data,
  });
