'use client';

import type { PropsWithChildren } from 'react';
import ReactQuery from './QueryProvider/ReactQuery';

export default function Providers({ children }: PropsWithChildren) {
  return <ReactQuery>{children}</ReactQuery>;
}
