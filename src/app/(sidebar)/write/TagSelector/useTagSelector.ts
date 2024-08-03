import { useCallback, useState } from 'react';
import type { As, ClassNamesType, ReactRef } from '@/types';
import { cn } from '@/utils';
import useDOMRef from '@/hooks/useDOMRef';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export interface UseTagSelectorProps {
  as?: As;
  ref?: ReactRef<HTMLElement>;
  classNames?: ClassNamesType<'base' | 'content' | 'trigger'>;
}

export function useTagSelector({ ...props }: UseTagSelectorProps) {
  const { as, ref, classNames } = props;
  const Component = as || 'div';
  const domRef = useDOMRef(ref);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOutsideClick(domRef, () => setIsOpen(false));

  const handleTriggerClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, [isOpen]);

  const getBaseProps = useCallback(
    (props = {}) => ({
      ref: domRef,
      className: cn('w-[660px] flex items-center gap-8 relative', classNames?.base),
      ...props,
    }),
    [ref, classNames?.base],
  );

  const getTriggerProps = useCallback(
    (props = {}) => ({
      className: cn(
        'w-[624px] h-52 flex gap-8 items-center py-8 pl-16 pr-16 border-1 border-transparent rounded-8 text-neutral-20',
        isOpen && 'rounded-bl-none rounded-br-none border-neutral-5 bg-neutral-1',
        classNames?.trigger,
      ),
      onClick: handleTriggerClick,
      ...props,
    }),
    [handleTriggerClick, classNames?.trigger, isOpen],
  );

  const getContentProps = useCallback(
    () => ({
      className: cn(
        'absolute top-52 left-36 w-[624px] bg-[white] border-1 rounded-bl-8 rounded-br-8',
        isOpen && 'z-[210000000]',
        classNames?.content,
      ),
    }),
    [classNames?.content, isOpen],
  );

  return { Component, getTriggerProps, getBaseProps, getContentProps, isOpen };
}

export type UseTagSelectorReturn = ReturnType<typeof useTagSelector>;
