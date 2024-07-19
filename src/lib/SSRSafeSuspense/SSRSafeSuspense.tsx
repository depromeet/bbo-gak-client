'use client';

import { Suspense, type ComponentProps } from 'react';
import { useIsClient } from '@/hooks';

export function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  if (!useIsClient()) {
    // eslint-disable-next-line react/destructuring-assignment
    return props.fallback;
  }
  return <Suspense {...props} />;
}
