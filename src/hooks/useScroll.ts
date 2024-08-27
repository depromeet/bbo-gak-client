import { RefObject, useEffect } from 'react';

export function useScroll(target: RefObject<HTMLDivElement>, callback: (topOffsetY: number) => void) {
  useEffect(() => {
    const element = target.current ?? window;
    console.log(element);

    const callback2 = () => {
      const topOffsetY = target.current?.scrollTop ?? window.scrollY;
      callback(topOffsetY);
    };

    element.addEventListener('scroll', callback2);

    return () => {
      element.removeEventListener('scroll', callback2);
    };
  }, [target, callback]);
}
