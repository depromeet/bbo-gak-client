'use client';

import ReactQuery from './ReactQuery';
import type { PropsWithChildren } from 'react';

export default function QueryProvider({ children }: PropsWithChildren) {
  return <ReactQuery>{children}</ReactQuery>;
}
