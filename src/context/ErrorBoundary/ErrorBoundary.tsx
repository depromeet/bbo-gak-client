'use client';

import { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { isDifferentArray } from '@/util';
import { ErrorboundaryProvider } from './ErrorBoundaryContext';
import type { StrictPropsWithChildren } from '@/types';
import type { ComponentPropsWithoutRef, ErrorInfo, PropsWithRef, ReactNode } from 'react';

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset?: () => void;
};

type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode;

type FallbackType = ReactNode;

type ErrorBoundaryProps<ErrorType extends Error = Error> = {
  onReset?(): void;
  renderFallback: RenderFallbackType | FallbackType;
  onError?(error: ErrorType, info?: ErrorInfo): void;
  resetKeys?: unknown[];
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};

export class ErrorBoundary extends Component<PropsWithRef<StrictPropsWithChildren<ErrorBoundaryProps>>, State> {
  hasError = false;

  constructor(props: PropsWithRef<StrictPropsWithChildren<ErrorBoundaryProps>>) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { error } = this.state;
    const { resetKeys } = this.props;

    if (error === null) {
      return;
    }
    if (!this.hasError) {
      this.hasError = true;
      return;
    }

    if (isDifferentArray(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary();
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError } = this.props;

    onError?.(error, info);
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;

    onReset?.();
    this.resetState();
  };

  resetState() {
    this.hasError = false;
    this.setState(initialState);
  }

  /**
   * 현재 에러 상태에 따라 렌더링할 자식 요소 또는 폴백 UI를 제공합니다.
   * 에러가 있으면 `renderFallback` prop에서 제공한 폴백 UI를 반환합니다.
   * `renderFallback` prop은 ReactNode일 수도 있고, error, reset을 사용하는 함수를 반환할 수도 있습니다.
   *
   * @returns {ReactNode} 렌더링된 children or fallback.
   *
   * @example
   * function MyComponent() {
   *   return (
   *     <ErrorBoundary
   *       renderFallback={({ error, reset }) => (
   *         <div>
   *           <p>문제가 발생했습니다: {error.message}</p>
   *           <button onClick={reset}>다시 시도</button>
   *         </div>
   *       )}
   *     >
   *       <MyChildComponent />
   *     </ErrorBoundary>
   *   );
   * }
   *
   *
   * @example
   * function MyComponent() {
   *   return (
   *     <ErrorBoundary
   *       renderFallback={
   *         <div>로딩 스피너</div>
   *       }
   *     >
   *       <MyChildComponent />
   *     </ErrorBoundary>
   *   );
   * }
   */
  genereateRenderedChildren() {
    const { error } = this.state;
    const { children, renderFallback } = this.props;

    if (error === null) {
      return children;
    }

    return typeof renderFallback === 'function'
      ? renderFallback({
          error: error as Error,
          reset: this.resetErrorBoundary,
        })
      : renderFallback;
  }

  render() {
    const { error } = this.state;

    const renderedChildren = this.genereateRenderedChildren();
    const ErrorboundaryProviderProps = {
      error,
      resetErrorBoundary: this.resetErrorBoundary,
    };

    return <ErrorboundaryProvider {...ErrorboundaryProviderProps}>{renderedChildren}</ErrorboundaryProvider>;
  }
}

export const GlobalErrorBoundary = forwardRef<{ reset(): void }, ComponentPropsWithoutRef<typeof ErrorBoundary>>(
  (props, resetRef) => {
    const ref = useRef<ErrorBoundary>(null);

    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }));

    return <ErrorBoundary {...props} ref={ref} />;
  },
);

GlobalErrorBoundary.displayName = 'GlobalErrorBoundary';

export const useErrorBoundary = <ErrorType extends Error = Error>() => {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error as Error;
  }

  return setError;
};
