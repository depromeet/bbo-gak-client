import { http } from '@/apis/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { TagType } from '@/types';
import { CardGroup, InfoType } from '@/types/info';

export interface GetCardDetailResponse {
  title: string;
  content: JSONContent;
  updatedDate: `${string} ${string}`;
  cardTypeValueList: Array<InfoType>;
  tagList: Array<TagType>;
  cardTypeValueGroup: CardGroup;
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
