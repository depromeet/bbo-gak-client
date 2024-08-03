'use client';

import { RefObject, useEffect } from 'react';
<<<<<<< HEAD
import { usePreservedCallback } from './usePreservedCallback';
=======
import { useCallbackOnce } from './useCallbackOnce';
>>>>>>> 6de0440 (feat)

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (targetElement: T) => void | (() => void),
) {
<<<<<<< HEAD
  const callbackFunc = usePreservedCallback(callback);

  useEffect(() => {
    const handleMouseDown = ({ target }: MouseEvent | TouchEvent) => {
=======
  const callbackFunc = useCallbackOnce(callback);

  useEffect(() => {
    const handleMouseDown = ({ target }: MouseEvent) => {
>>>>>>> 6de0440 (feat)
      const targetElement = ref.current;

      if (targetElement && !targetElement.contains(target as Node)) {
        callbackFunc(targetElement);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
<<<<<<< HEAD
    document.addEventListener('touchend', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchend', handleMouseDown);
=======

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
>>>>>>> 6de0440 (feat)
    };
  }, [callbackFunc, ref]);
}
