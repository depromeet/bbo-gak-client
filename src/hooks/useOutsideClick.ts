'use client';

import { RefObject, useEffect } from 'react';
import { useCallbackOnce } from './useCallbackOnce';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (targetElement: T) => void | (() => void),
) {
  const callbackFunc = useCallbackOnce(callback);

  useEffect(() => {
    const handleMouseDown = ({ target }: MouseEvent) => {
      const targetElement = ref.current;

      if (targetElement && !targetElement.contains(target as Node)) {
        callbackFunc(targetElement);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [callbackFunc, ref]);
}
