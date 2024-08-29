'use client';

import { generateContext } from '@/lib';
import { StrictPropsWithChildren } from '@/types';
import { useGetCardDetail } from '../api/useGetCardDetail/useGetCardDetail';
import { GetCardDetailResponse } from '@/app/(sidebar)/write/[id]/api/useGetCardDetail/useGetCardDetail';

const [CardDetailTagsProvider, useCardDetailTagsContext] = generateContext<GetCardDetailResponse>({
  name: 'card-detail-tag-fetcher',
  defaultValue: {
    title: '',
    cardTypeValueList: [],
    content: {},
    tagList: [],
    updatedDate: ' ',
    cardTypeValueGroup: '내_정보',
  },
});

function CardTagFetcher({ children, cardId }: StrictPropsWithChildren<{ cardId: number }>) {
  const { data } = useGetCardDetail(cardId);

  return <CardDetailTagsProvider {...data}>{children}</CardDetailTagsProvider>;
}

export { CardTagFetcher, useCardDetailTagsContext };
