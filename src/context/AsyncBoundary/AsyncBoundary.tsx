'use client';

import { forwardRef } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { chain } from '@/util';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import SSRSafeSuspense from '../SSRSafeSuspense/SSRSafeSuspense';
import type { StrictPropsWithChildren } from '@/types';
import type { ComponentProps, ComponentRef, Suspense } from 'react';

type ErrorBoundaryProps = Omit<
  ComponentProps<typeof ErrorBoundary>,
  'renderFallback'
>;
type SuspenseProps = Omit<ComponentProps<typeof Suspense>, 'fallback'>;

type AsyncBoundrayProps = StrictPropsWithChildren &
  ErrorBoundaryProps &
  SuspenseProps & {
    errorFallback?: ComponentProps<typeof ErrorBoundary>['renderFallback'];
    pendingFallback?: ComponentProps<typeof Suspense>['fallback'];
  };

export const AsyncBoundary = forwardRef<
  ComponentRef<typeof ErrorBoundary>,
  AsyncBoundrayProps
>(
  (
    { errorFallback, pendingFallback, children, ...errorBoundaryProps },
    ref,
  ) => {
    return (
      <ErrorBoundary
        ref={ref}
        renderFallback={errorFallback}
        {...errorBoundaryProps}>
        <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
      </ErrorBoundary>
    );
  },
);

AsyncBoundary.displayName = 'AsyncBoundary';

export const AsyncBoundaryWithQuery = forwardRef<
  ComponentRef<typeof ErrorBoundary>,
  AsyncBoundrayProps
>((props, ref) => {
  const { children, ...otherProps } = props;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <AsyncBoundary
      ref={ref}
      {...otherProps}
      onReset={chain(props.onReset, reset)}>
      {children}
    </AsyncBoundary>
  );
});

AsyncBoundaryWithQuery.displayName = 'AsyncBoundaryWithQuery';
