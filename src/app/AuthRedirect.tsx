import { auth } from '@/auth';
import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';

export default async function AuthRedirect({ children }: StrictPropsWithChildren) {
  const session = await auth();

  return (
    <Redirect condition={session?.accessToken != null} to="/login">
      {children}
    </Redirect>
  );
}
