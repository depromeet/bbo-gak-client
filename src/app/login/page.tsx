'use client';

import { useFunnel } from '@/system/components/Funnel/useFunnel';
import { Login } from './components/Login';
import { Redirect } from '@/components/Redirect';
import Select from './components/Select';
import { getCookie } from 'cookies-next';

export default function Page() {
  const Funnel = useFunnel(['login', 'select'] as const, { initialStep: 'login', stepQueryKey: 'auth' });
  const isSelectJob = getCookie('jobSelection') === 'select';
  const accessToken = !!getCookie('accessToken');

  return (
    <Funnel mode="wait">
      <Funnel.Step name="login">
        <Redirect condition={accessToken}>
          <Login />
        </Redirect>
      </Funnel.Step>

      <Funnel.Step name="select">
        <Redirect condition={isSelectJob}>
          <Select />
        </Redirect>
      </Funnel.Step>
    </Funnel>
  );
}
