'use client';

import { motion } from 'framer-motion';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { useGoogleLogin } from '@react-oauth/google';
import { usePostLogin } from '../api/postLogin';
import { useFunnelContext } from '@/system/components/Funnel/useFunnel';
import { ACCESS_TOKEN, JOB_SELECTION, REFRESH_TOKEN, SELECT, NONE } from '@/app/login/constants/token';
import { setCookie } from 'cookies-next';

export function Login() {
  const { mutate } = usePostLogin();
  const { setStep } = useFunnelContext();
  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log('success', res.access_token);

      mutate(
        { provider: 'GOOGLE', token: res.access_token },
        {
          onSuccess: ({ data: { isFirstLogin, accessToken, refreshToken } }) => {
            const jobSelection = isFirstLogin ? SELECT : NONE;
            setCookie(ACCESS_TOKEN, accessToken);
            setCookie(REFRESH_TOKEN, refreshToken);
            setCookie(JOB_SELECTION, jobSelection);

            setStep('select');
          },
        },
      );
    },
    onError: (res) => console.log('fail', res),
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 150,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: 120,
      }}
      transition={{ duration: 1 }}
      className="w-552 h-604 p-68 pt-116 flex flex-col justify-between rounded-30 bg-[white]">
      <div className="flex flex-col items-center gap-16">
        <Icon name="cloverLogo" size={74} />

        <h1 className="text-28 font-bold tracking-[-0.972px]">뽀각 시작하기</h1>
        <p className="text-center text-neutral-70 trackiing-[0.091px]">
          취업 준비 과정에서의 정보를 쉽게 <br />
          정리하고 탐색해보세요
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <TouchButton onClick={() => login()} type="submit" className="relative h-62 rounded-54 bg-[#F2F2F2]">
          <div className="absolute top-6 left-6">
            <Icon name="google" size={50} />
          </div>
          <p className="font-semibold tracking-[-0.091px]">구글로 시작하기</p>
        </TouchButton>
      </div>
    </motion.div>
  );
}
