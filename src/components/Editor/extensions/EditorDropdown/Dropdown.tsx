import type { ReactNode } from 'react';
import { cn } from '@/utils';

export function DropdownCategoryTitle({ children, className }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'text-[.65rem] font-semibold mb-4 uppercase text-neutral-500 dark:text-neutral-400 px-6',
        className,
      )}>
      {children}
    </div>
  );
}

export function DropdownButton({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const buttonClass = cn(
    'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:black dark:hover:text-neutral-200',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800 dark:black dark:text-neutral-200',
    disabled && 'text-neutral-400 cursor-not-allowed dark:text-neutral-600',
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
