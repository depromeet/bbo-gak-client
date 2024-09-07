'use client';

import { ACCESS_TOKEN, JOB_SELECTION, REFRESH_TOKEN } from './login/constants/token';
import { redirect } from 'next/navigation';
import type { StrictPropsWithChildren } from '@/types';
import { deleteCookie, getCookie } from 'cookies-next';

export default function AuthRedirect({ children }: StrictPropsWithChildren) {
  const accessToken = getCookie(ACCESS_TOKEN) as string;
  const isJobSelection = getCookie(JOB_SELECTION) as string;

  if (!accessToken || !isJobSelection) {
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    deleteCookie(JOB_SELECTION);
    redirect('/login');
  }

  return <>{children}</>;
}
