import { useCallback, useState } from 'react';
import type { As, ClassNamesType, ReactRef } from '@/types';
import { cn } from '@/utils';
import useDOMRef from '@/hooks/useDOMRef';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export interface UseTagSelectorProps {
  as?: As;
  ref?: ReactRef<HTMLElement>;
  classNames?: ClassNamesType<'base' | 'content' | 'trigger'>;
  disabled?: boolean;
  onChange?: (open: boolean) => void;
}

export function useTagSelector({ ...props }: UseTagSelectorProps) {
  const { as, ref, classNames, disabled, onChange } = props;
  const Component = as || 'div';
  const baseDOMRef = useDOMRef(ref);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOutsideClick(baseDOMRef, () => {
    onChange?.(false);
    setIsOpen(false);
  });

  const handleTriggerClick = useCallback(() => {
    setIsOpen((prev) => {
      onChange?.(!prev);
      return !prev;
    });
  }, [isOpen]);

  const getBaseProps = useCallback(
    (props = {}) => ({
      ref: baseDOMRef,
      className: cn('flex items-center gap-8 relative', classNames?.base),
      ...props,
    }),
    [ref, classNames?.base],
  );

  const getTriggerProps = useCallback(
    (props = {}) => ({
      className: cn(
        'w-[624px] h-40 flex gap-8 items-center text-[14px] py-8 pl-8 pr-16 border-1 border-transparent rounded-8 text-neutral-20',
        isOpen && 'rounded-bl-none rounded-br-none border-neutral-5 bg-neutral-1 shadow-memo',
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
        isOpen && 'z-[20000] shadow-memo',
        classNames?.content,
      ),
    }),
    [classNames?.content, isOpen, disabled],
  );

  return { Component, getTriggerProps, getBaseProps, getContentProps, isOpen, disabled };
}

export type UseTagSelectorReturn = ReturnType<typeof useTagSelector>;
