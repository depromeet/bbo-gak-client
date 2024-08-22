'use client';

import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { GetCardDetailTagsResponse, useGetCardDetailTagsResponse } from '../api/useGetCardTags/useGetCardTags';

const [CardDetailTagsProvider, useCardDetailTagsContext] = generateContext<{ tags: GetCardDetailTagsResponse }>({
  name: 'card-detail-tag-fetcher',
  defaultValue: { tags: [] },
});

function CardTagFetcher({ children, cardId }: StrictPropsWithChildren<{ cardId: number }>) {
  const { data } = useGetCardDetailTagsResponse(cardId);

  return <CardDetailTagsProvider tags={data.result}>{children}</CardDetailTagsProvider>;
}

export { CardTagFetcher, useCardDetailTagsContext };
