'use client';

import { useIsClient } from '@/hooks';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';

export default function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  if (!useIsClient()) {
    // eslint-disable-next-line react/destructuring-assignment
    return props.fallback;
  }
  return <Suspense {...props} />;
}
