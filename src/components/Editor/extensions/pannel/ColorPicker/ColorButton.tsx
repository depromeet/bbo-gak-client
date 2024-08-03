import { memo, useCallback } from 'react';
import { cn } from '@/utils';
import { Button } from '@/system/components';

export type ColorButtonProps = {
  color?: string;
  active?: boolean;
  onColorChange?: (color: string) => void; // eslint-disable-line no-unused-vars
};

export const ColorButton = memo(({ color, active, onColorChange }: ColorButtonProps) => {
  const wrapperClassName = cn(
    'flex items-center justify-center px-6 py-6 rounded group',
    !active && 'hover:bg-neutral-5',
    active && 'bg-neutral-5',
  );
  const bubbleClassName = cn(
    'w-16 h-16 rounded bg-slate-100 shadow-sm ring-offset-2 ring-current',
    !active && `hover:ring-1`,
    active && `ring-1`,
  );

  const handleClick = useCallback(() => {
    onColorChange?.(color || '');
  }, [onColorChange, color]);

  return (
    <Button onClick={handleClick} className={wrapperClassName}>
      <div style={{ backgroundColor: color, color: color }} className={bubbleClassName}></div>
    </Button>
  );
});

ColorButton.displayName = 'ColorButton';
