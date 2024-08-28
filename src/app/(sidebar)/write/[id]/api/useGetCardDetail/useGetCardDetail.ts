import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { TagType } from '@/types';

export interface GetCardDetailResponse {
  title: string;
  content: JSONContent;
  updatedDate: `${string} ${string}`;
  cardTypeValueList: string[];
  tagList: Array<TagType>;
}

const getCardDetail = (cardId: number) =>
  http.get<GetCardDetailResponse>({
    url: `/cards/${cardId}`,
  });

export const useGetCardDetail = (cardId: number) =>
  useSuspenseQuery({
    queryKey: ['get-card-detail', cardId],
    queryFn: () => getCardDetail(cardId),
    select: ({ data }) => data,
  });
