import { useCollapsibleContext } from './context';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function CollapsibleTrigger({ children }: Props) {
  const { collapsed, onCollapsedChange } = useCollapsibleContext();

  return (
    <button
      aria-expanded={!collapsed}
      onClick={(e) => {
        e.stopPropagation();
        onCollapsedChange(!collapsed);
      }}
      className="overflow-hidden">
      {children}
    </button>
  );
}
