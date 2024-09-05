import { cookies } from 'next/headers';
import { ACCESS_TOKEN, JOB_SELECTION } from './login/constants/token';
import { redirect } from 'next/navigation';
import type { StrictPropsWithChildren } from '@/types';

export default async function AuthRedirect({ children }: StrictPropsWithChildren) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const isJobSelection = cookies().get(JOB_SELECTION)?.value;

  if (accessToken == null || isJobSelection == null) {
    cookies().delete(ACCESS_TOKEN);
    cookies().delete(JOB_SELECTION);
    redirect('/login');
  }

  return { children };
}
