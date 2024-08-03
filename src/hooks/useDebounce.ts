import { useEffect } from 'react';

export function useDebounce(callback: (...args: any) => any, delay: number, dependencies: any[]) {
  useEffect(() => {
    if (dependencies.every((dep) => dep !== undefined)) {
      const timer = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [...dependencies, delay]);
}
