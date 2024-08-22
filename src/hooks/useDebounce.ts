import { useEffect, useRef } from 'react';

export function useDebounce(callback: (...args: any) => void, delay: number, dependencies: any[]) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (dependencies.every((dep) => dep !== undefined)) {
      const timer = setTimeout(() => {
        savedCallback.current();
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [...dependencies, delay]);
}
