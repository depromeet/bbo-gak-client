import { StrictPropsWithChildren } from '@/types';

export default async function Layout({ children }: StrictPropsWithChildren) {
  return <main className="h-screen flex justify-center items-center bg-neutral-95">{children}</main>;
}
