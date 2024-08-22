import { AsyncBoundaryWithQuery } from '@/lib';
import { PropsWithChildren } from 'react';
import { CardTagFetcher } from './fetcher/CardTagFetcher';

export default function WriteLayout({ params: { id }, children }: PropsWithChildren<{ params: { id: string } }>) {
  return (
    <AsyncBoundaryWithQuery>
      <CardTagFetcher cardId={Number(id)}>
        <main>{children}</main>
      </CardTagFetcher>
    </AsyncBoundaryWithQuery>
  );
}
