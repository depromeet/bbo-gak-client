'use client';

import {
  MouseEvent,
  useCallback,
  ButtonHTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import { cn } from '@/util';
import type { ReactRef } from '@/system/types';

export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: ReactRef<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
};

export function useButton(props: UseButtonProp) {
  const { ref, onClick, disabled, isLoading, className, ...otherProps } = props;

  const children = useMemo(
    () => (isLoading ? '로딩 중' : props.children),
    [isLoading],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading) {
        onClick?.(event);
      }
    },
    [disabled, onClick],
  );

  const getButtonProps = useCallback(
    () => ({
      disabled,
      ...otherProps,
      ref,
      onClick: handleClick,
      className: cn(
        'py-10 px-40 rounded-button bg-primary h-51 text-[22px] text-[#fff] flex items-center gap-10 justify-center focus:outline-none',
        disabled && 'cursor-not-allowed opacity-70',
        className,
      ),
    }),

    [handleClick, otherProps, disabled, className],
  );

  return { getButtonProps, children };
}
