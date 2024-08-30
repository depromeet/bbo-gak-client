import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { ACCESS_TOKEN } from './constants/token';

export default async function Layout({ children }: StrictPropsWithChildren) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;

  return (
    <main className="h-screen flex justify-center items-center bg-neutral-95">
      <Redirect condition={accessToken != null} to="/">
        <Suspense>{children}</Suspense>
      </Redirect>
    </main>
  );
}
