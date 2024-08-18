'use client';

import { RefObject, useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (targetElement: T) => void | (() => void),
) {
  const callbackFunc = usePreservedCallback(callback);

  useEffect(() => {
    const handleMouseDown = ({ target }: MouseEvent | TouchEvent) => {
      const targetElement = ref.current;

      if (targetElement && !targetElement.contains(target as Node)) {
        callbackFunc(targetElement);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchend', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchend', handleMouseDown);
    };
  }, [callbackFunc, ref]);
}
