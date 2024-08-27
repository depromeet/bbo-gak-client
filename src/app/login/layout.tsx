import { StrictPropsWithChildren } from '@/types';

export default function Layout({ children }: StrictPropsWithChildren) {
  return <main className="h-screen flex justify-center items-center border-1">{children}</main>;
}
