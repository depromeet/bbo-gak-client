'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useCallbackOnce<T extends (...args: any[]) => any>(callback: T): (...args: any[]) => any {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: any[]) => callbackRef.current(...args), []);
}
