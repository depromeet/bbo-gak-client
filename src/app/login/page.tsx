'use client';

import { Redirect } from '@/components/Redirect';
import { useFunnel } from '@/system/components/Funnel/useFunnel';
import { getCookie } from 'cookies-next';
import { Login } from './components/Login';
import Select from './components/Select';
import { JOB_SELECTION, SELECT } from './constants/token';

export default function Page() {
  const Funnel = useFunnel(['login', 'select'] as const, { initialStep: 'login', stepQueryKey: 'auth' });
  const isSelectJob = getCookie(JOB_SELECTION) === SELECT;

  return (
    <Funnel mode="wait">
      <Funnel.Step name="login">
        <Redirect condition={!isSelectJob} to="/login?auth=select">
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
