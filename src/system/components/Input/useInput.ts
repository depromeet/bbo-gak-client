import { useCallback } from 'react';
import type { InputHTMLAttributes, ChangeEvent } from 'react';
import { chain, cn } from '@/utils';
import type { ClassNamesType, ReactRef } from '@/types';
import useDOMRef from '@/hooks/useDOMRef';

export interface UseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: ReactRef<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  classNames?: ClassNamesType<'base'>;
}

export function useInput(props: UseInputProps) {
  const { ref, classNames, onValueChange, ...otherProps } = props;
  const domRef = useDOMRef<HTMLInputElement>(ref);

  const getBaseProps = useCallback(
    () => ({
      className: cn('w-full flex items-center', classNames?.base),
    }),
    [classNames?.base],
  );

  const getInputProps = useCallback(
    () => ({
      ...otherProps,
      ref: domRef,
      className: cn(
        'w-full bg-transparent py-8 px-16 rounded-8 text-[14px] focus:outline-none border-1 border-neutral-5 placeholder:text-neutral-30',
        otherProps.className,
      ),
      onChange: !otherProps.disabled
        ? chain(otherProps.onChange, (e: ChangeEvent<HTMLInputElement>) => onValueChange?.(e.target.value))
        : () => {},
    }),
    [domRef, onValueChange, otherProps],
  );

  return {
    getBaseProps,
    getInputProps,
  };
}
