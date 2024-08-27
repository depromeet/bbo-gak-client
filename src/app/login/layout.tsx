import { auth } from '@/auth';
import { Redirect } from '@/components/Redirect';
import { StrictPropsWithChildren } from '@/types';

export default async function Layout({ children }: StrictPropsWithChildren) {
  const session = await auth();

  return (
    <Redirect condition={!!session?.accessToken}>
      <main className="h-screen flex justify-center items-center bg-neutral-95">{children}</main>;
    </Redirect>
  );
}
