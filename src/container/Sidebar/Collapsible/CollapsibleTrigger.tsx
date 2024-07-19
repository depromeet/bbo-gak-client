import type { ReactNode } from 'react';
import { useCollapsibleContext } from './context';

interface Props {
  children?: ReactNode;
}

export function CollapsibleTrigger({ children }: Props) {
  const { collapsed, onCollapsedChange } = useCollapsibleContext();

  return <div onClick={() => onCollapsedChange(!collapsed)}>{children}</div>;
}
