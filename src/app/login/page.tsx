'use client';

import { useSession } from 'next-auth/react';
import { useFunnel } from '@/system/components/Funnel/useFunnel';
import { Login } from './components/Login';
import { Redirect } from '@/components/Redirect';
import Select from './components/Select';

export default function Page() {
  const session = useSession();
  const Funnel = useFunnel(['login', 'select'] as const, { initialStep: 'login', stepQueryKey: 'auth' });

  return (
    <Funnel mode="wait">
      <Funnel.Step name="login">
        <Login />
      </Funnel.Step>

      <Funnel.Step name="select">
        {/* TODO: initial 로그인 여부 확인 */}
        <Redirect condition={!session.data?.accessToken}>
          <Select />
        </Redirect>
      </Funnel.Step>
    </Funnel>
  );
}
