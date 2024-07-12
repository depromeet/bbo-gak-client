'use client';

import type { PropsWithChildren } from 'react';
import ReactQuery from './queryProvider/ReactQuery';

export default function Providers({ children }: PropsWithChildren) {
  return <ReactQuery>{children}</ReactQuery>;
}
