import { cn } from '@/utils';
import { ComponentProps } from 'react';
import { match } from 'ts-pattern';

interface BadgeProps extends ComponentProps<'div'> {
  variant?: 'A' | 'B';
}

export function Badge({ variant = 'A', className, ...restProps }: BadgeProps) {
  const paddingClassName = match(variant)
    .with('A', () => 'py-[12px] px-[20px]')
    .with('B', () => 'py-[2px] px-[11px]')
    .exhaustive();

  return (
    <div
      className={cn(
        className,
        paddingClassName,
        'rounded-[8px] bg-[#D1E8E0] text-[#186D50] text-[16px] font-[600] w-fit',
      )}
      {...restProps}
    />
  );
}
