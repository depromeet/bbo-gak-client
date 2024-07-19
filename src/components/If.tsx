import { PropsWithChildren } from 'react';

interface IfProps {
  condition: boolean | undefined;
}

export function If({ condition, children }: PropsWithChildren<IfProps>) {
  if (condition) {
    return children;
  }
  return null;
}
