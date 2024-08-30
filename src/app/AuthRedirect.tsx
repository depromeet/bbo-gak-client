import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, JOB_SELECTION } from './login/constants/token';

export default async function AuthRedirect({ children }: StrictPropsWithChildren) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const isJobSelection = cookies().get(JOB_SELECTION)?.value;

  return (
    <Redirect condition={accessToken == null || isJobSelection == null} to="/login">
      {children}
    </Redirect>
  );
}
