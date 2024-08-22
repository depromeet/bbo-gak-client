import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';

export interface GetCardDetailResponse {
  title: string;
  content: JSONContent;
  updatedDate: `${string} ${string}`;
  cardTypeValueList: string[];
  tagList: Array<{
    id: number;
    name: string;
    type: '인성' | '역량' | '분류';
  }>;
}

const getCardDetail = (cardId: number) =>
  http.get({
    url: `/cards/${cardId}`,
  });

export const useGetCardDetail = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-card-detail', cardId],
    queryFn: () => getCardDetail(cardId),
    select: ({ data }) => data,
  });
