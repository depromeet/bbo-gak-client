import { useCallback } from 'react';
import { useTagSelectorContext } from './TagSelectorGroup';
import type { As, ClassNamesType, ReactRef } from '@/types';
import { cn } from '@/utils';

export interface UseTagSelectorProps {
  value: string;
  as?: As;
  ref?: ReactRef<HTMLElement>;
  classNames?: ClassNamesType<'base' | 'content' | 'trigger'>;
}

export function useTagSelector({ ...props }: UseTagSelectorProps) {
  const { value, as, ref, classNames } = props;
  const { selected, open, close } = useTagSelectorContext();
  const Component = as || 'div';

  const isSelected = selected === value;

  const handleTriggerClick = useCallback(() => {
    if (isSelected) {
      close();
      return;
    }
    open(value);
  }, [value, isSelected]);

  const getBaseProps = useCallback(
    (props = {}) => ({
      ref,
      className: cn('w-[660px] flex items-center gap-8 relative', classNames?.base),
      ...props,
    }),
    [ref, classNames?.base],
  );

  const getTriggerProps = useCallback(
    (props = {}) => ({
      className: cn(
        'w-[624px] h-52 flex gap-8 items-center py-8 pl-16 pr-16 border-1 border-transparent rounded-8 text-neutral-20',
        isSelected && 'rounded-bl-none rounded-br-none border-neutral-5 bg-neutral-1',
        classNames?.trigger,
      ),
      onClick: handleTriggerClick,
      ...props,
    }),
    [handleTriggerClick, classNames?.trigger, isSelected],
  );

  const getContentProps = useCallback(
    () => ({
      className: cn(
        'absolute top-52 left-36 w-[624px] bg-[white] border-1 rounded-bl-8 rounded-br-8',
        isSelected && 'z-[210000000]',
        classNames?.content,
      ),
    }),
    [classNames?.content, isSelected],
  );

  return { Component, getTriggerProps, getBaseProps, getContentProps, isSelected };
}

export type UseTagSelectorReturn = ReturnType<typeof useTagSelector>;
