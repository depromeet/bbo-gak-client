import { StrictPropsWithChildren } from '@/types';
import { redirect } from 'next/navigation';

interface Props extends StrictPropsWithChildren {
  to?: string;
  condition: boolean | ((...args: any[]) => boolean);
}

export function Redirect({ children, to = '/', condition }: Props) {
  if (typeof condition === 'function' && condition()) {
    redirect(to);
  }

  if (condition) {
    redirect(to);
  }
  return <>{children}</>;
}
