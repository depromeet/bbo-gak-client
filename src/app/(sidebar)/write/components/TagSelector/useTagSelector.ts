import { useCallback, useState } from 'react';
import type { As, ClassNamesType, ReactRef } from '@/types';
import { cn } from '@/utils';
import useDOMRef from '@/hooks/useDOMRef';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { zIndex } from '@/system/token/zIndex';

export interface UseTagSelectorProps {
  as?: As;
  ref?: ReactRef<HTMLElement>;
  classNames?: ClassNamesType<'base' | 'content' | 'trigger'>;
}

export function useTagSelector({ ...props }: UseTagSelectorProps) {
  const { as, ref, classNames } = props;
  const Component = as || 'div';
  const baseDOMRef = useDOMRef(ref);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOutsideClick(baseDOMRef, () => setIsOpen(false));

  const handleTriggerClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const getBaseProps = useCallback(
    (props = {}) => ({
      ref: baseDOMRef,
      className: cn('w-[820px] flex items-center gap-8 relative', classNames?.base),
      ...props,
    }),
    [ref, classNames?.base],
  );

  const getTriggerProps = useCallback(
    (props = {}) => ({
      className: cn(
        'w-[624px] h-40 flex gap-8 items-center py-8 pl-8 pr-16 border-1 border-transparent rounded-8 text-neutral-20',
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
        'absolute top-39 left-116 w-[624px] bg-[white] border-1 rounded-bl-8 rounded-br-8',
        isOpen && 'z-[20000]',
        classNames?.content,
      ),
    }),
    [classNames?.content, isOpen],
  );

  return { Component, getTriggerProps, getBaseProps, getContentProps, isOpen };
}

export type UseTagSelectorReturn = ReturnType<typeof useTagSelector>;
