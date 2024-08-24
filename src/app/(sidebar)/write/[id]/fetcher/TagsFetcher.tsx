'use client';

import { generateContext } from '@/lib';
import { Tag, useGetTags } from '../api/useGetTags/useGetTags';
import { StrictPropsWithChildren } from '@/types';

const [TagsProvider, useTagsContext] = generateContext<{ tags: Array<Tag> }>({ name: 'tags' });

function TagsFetcher({ children }: StrictPropsWithChildren) {
  const { data } = useGetTags();

  return <TagsProvider tags={data}>{children}</TagsProvider>;
}

export { TagsFetcher, useTagsContext };
