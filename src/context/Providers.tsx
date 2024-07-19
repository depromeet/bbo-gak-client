'use client';

import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import ReactQuery from './queryProvider/ReactQuery';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ReactQuery>{children}</ReactQuery>
    </SessionProvider>
  );
}
