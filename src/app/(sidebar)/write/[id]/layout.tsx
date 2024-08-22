import { AsyncBoundaryWithQuery } from '@/lib';
import { PropsWithChildren } from 'react';
import { CardTagFetcher } from './fetcher/CardTagFetcher';

export default function WriteLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <AsyncBoundaryWithQuery>
        <CardTagFetcher>{children}</CardTagFetcher>
      </AsyncBoundaryWithQuery>
    </main>
  );
}
