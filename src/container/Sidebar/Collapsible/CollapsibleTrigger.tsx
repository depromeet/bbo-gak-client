import type { ReactNode } from 'react';
import { useCollapsibleContext } from './context';

interface Props {
  children?: ReactNode;
}

export function CollapsibleTrigger({ children }: Props) {
  const { collapsed, onCollapsedChange } = useCollapsibleContext();

  return (
    <button aria-expanded={!collapsed} onClick={() => onCollapsedChange(!collapsed)}>
      {children}
    </button>
  );
}
