import { AsyncBoundaryWithQuery } from '@/lib';
import { PropsWithChildren } from 'react';
import { CardTagFetcher } from './fetcher/CardTagFetcher';
import { TagsFetcher } from './fetcher/TagsFetcher';

export default function WriteLayout({ params: { id }, children }: PropsWithChildren<{ params: { id: string } }>) {
  return (
    <AsyncBoundaryWithQuery>
      <CardTagFetcher cardId={Number(id)}>
        <TagsFetcher>
          <main>{children}</main>
        </TagsFetcher>
      </CardTagFetcher>
    </AsyncBoundaryWithQuery>
  );
}
