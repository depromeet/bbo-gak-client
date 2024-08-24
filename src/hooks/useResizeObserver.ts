import { useRef } from 'react';
import { usePreservedCallback } from './usePreservedCallback';
import { useIsomorphicLayoutEffect } from 'framer-motion';

export type OnResize = (entry: ResizeObserverEntry) => void;

export function useResizeObserver(onResize: OnResize) {
  const ref = useRef<HTMLDivElement | null>(null);
  const resizeCallback = usePreservedCallback(onResize);

  useIsomorphicLayoutEffect(() => {
    let rAF = 0;

    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0] != null) {
          cancelAnimationFrame(rAF);

          rAF = requestAnimationFrame(() => resizeCallback(entries[0]));
        }
      });

      resizeObserver.observe(ref.current);

      return () => {
        cancelAnimationFrame(rAF);
        if (ref.current != null) {
          resizeObserver.unobserve(ref.current);
        }
      };
    }
  }, [resizeCallback]);

  return ref;
}
