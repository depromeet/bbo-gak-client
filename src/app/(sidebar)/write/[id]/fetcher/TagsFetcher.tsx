'use client';

import { generateContext } from '@/lib';
import { useGetTags } from '../api/useGetTags/useGetTags';
import { StrictPropsWithChildren } from '@/types';
import type { TagType } from '@/types';

const [TagsProvider, useTagsContext] = generateContext<{ tags: Array<TagType> }>({ name: 'tags' });

function TagsFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useGetTags();

  // TODO: 새로고침했을 때는 data가 올바르고, 공고를 생성했을 때는 data.data가 올바름
  // 완성을 위한 hacky한 방법
  return <TagsProvider tags={data.data || data}>{children}</TagsProvider>;
}

export { TagsFetcher, useTagsContext };
