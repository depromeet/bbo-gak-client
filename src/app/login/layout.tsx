import { StrictPropsWithChildren } from '@/types';
import { Suspense } from 'react';

export default async function Layout({ children }: StrictPropsWithChildren) {
  return (
    <main className="h-screen flex justify-center items-center bg-neutral-95">
      <Suspense>{children}</Suspense>
    </main>
  );
}
