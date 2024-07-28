import { HTMLProps, forwardRef } from 'react';
import { cn } from '@/utils';

export const Spinner = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(({ className, ...rest }, ref) => {
  const spinnerClass = cn(
    'animate-spin rounded-full border-2 border-current border-t-transparent h-16 w-16',
    className,
  );

  return <div className={spinnerClass} ref={ref} {...rest} />;
});

Spinner.displayName = 'Spinner';
