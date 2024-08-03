import { useCallback, useMemo } from 'react';
import { Button } from '@/system/components';
import { cn } from '@/utils';

export type ToggleProps = {
  active?: boolean;
  onChange: (active: boolean) => void;
  size?: 'small' | 'large';
};

export function Toggle({ onChange, active = false, size = 'large' }: ToggleProps) {
  const state = useMemo(() => (active ? 'checked' : 'unchecked'), [active]);
  const value = useMemo(() => (active ? 'on' : 'off'), [active]);

  const buttonClassName = cn(
    'inline-flex cursor-pointer items-center rounded-full border-transparent transition-colors',
    !active ? 'bg-[#D9D9D9]' : 'bg-black',
    !active ? 'dark:bg-neutral-800 dark:hover:bg-neutral-700' : 'dark:bg-white',
    size === 'small' && 'h-12 w-24 px-2',
    size === 'large' && 'h-20 w-36 px-2',
  );

  const pinClass = cn(
    'rounded-full pointer-events-none block transition-transform',
    'bg-white dark:bg-black',
    size === 'small' && 'h-8 w-8',
    size === 'large' && 'h-16 w-16',
    active ? cn(size === 'small' ? 'translate-x-12' : '', size === 'large' ? 'translate-x-16' : '') : 'translate-x-0',
  );

  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active, onChange]);

  return (
    <Button
      role="switch"
      className={buttonClassName}
      type="button"
      aria-checked={active}
      data-state={state}
      value={value}
      onClick={handleChange}>
      <span className={pinClass} data-state={state} />
    </Button>
  );
}
