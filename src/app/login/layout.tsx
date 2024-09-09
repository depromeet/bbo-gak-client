import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { ACCESS_TOKEN, JOB_SELECTION } from './constants/token';

export default async function Layout({ children }: StrictPropsWithChildren) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const jobSelection = cookies().get(JOB_SELECTION)?.value;

  return (
    <main className="h-screen flex justify-center items-center bg-neutral-95">
      <Redirect condition={accessToken != null && jobSelection != null} to="/">
        <Suspense>{children}</Suspense>
      </Redirect>
    </main>
  );
}
