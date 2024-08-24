import { useEffect } from 'react';

export function useScroll(target: HTMLDivElement | null, callback: (topOffsetY: number) => void) {
  useEffect(() => {
    const element = target ?? window;

    const callback2 = () => {
      const topOffsetY = target?.offsetTop ?? window.scrollY;
      callback(topOffsetY);
    };

    element.addEventListener('scroll', callback2);

    return () => {
      element.removeEventListener('scroll', callback2);
    };
  }, [target, callback]);
}
