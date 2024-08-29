import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from './login/constants/token';

export default async function AuthRedirect({ children }: StrictPropsWithChildren) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;

  return (
    <Redirect condition={accessToken != null} to="/login">
      {children}
    </Redirect>
  );
}
