'use client';

import { useFunnel } from '@/system/components/Funnel/useFunnel';
import { Login } from './components/Login';
import { Redirect } from '@/components/Redirect';
import Select from './components/Select';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN, JOB_SELECTION, SELECT } from './constants/token';

export default function Page() {
  const Funnel = useFunnel(['login', 'select'] as const, { initialStep: 'login', stepQueryKey: 'auth' });
  const isSelectJob = getCookie(JOB_SELECTION) === SELECT;
  const accessToken = !!getCookie(ACCESS_TOKEN);

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
