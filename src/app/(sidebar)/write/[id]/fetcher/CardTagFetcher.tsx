'use client';

import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { GetCardDetailTags, useGetCardDetailTags } from '../api/useGetCardTags/useGetCardTags';

const [CardDetailTagsProvider, useCardDetailTagsContext] = generateContext<{ tags: GetCardDetailTags }>({
  name: 'card-detail-tag-fetcher',
  defaultValue: { tags: [] },
});

function CardTagFetcher({ children, cardId }: StrictPropsWithChildren<{ cardId: number }>) {
  const { data } = useGetCardDetailTags(cardId);

  return <CardDetailTagsProvider tags={data.result}>{children}</CardDetailTagsProvider>;
}

export { CardTagFetcher, useCardDetailTagsContext };
