'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { ACCESS_TOKEN, JOB_SELECTION, REFRESH_TOKEN } from './login/constants/token';
import type { StrictPropsWithChildren } from '@/types';

export default function AuthRedirect({ children }: StrictPropsWithChildren) {
  const accessToken = getCookie(ACCESS_TOKEN) as string;
  const isJobSelection = getCookie(JOB_SELECTION) as string;

  useEffect(() => {
    if (!accessToken || !isJobSelection) {
      deleteCookie(ACCESS_TOKEN);
      deleteCookie(REFRESH_TOKEN);
      deleteCookie(JOB_SELECTION);
      redirect('/login');
    }
  }, [accessToken, isJobSelection]);

  return <>{children}</>;
}
