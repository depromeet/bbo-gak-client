'use client';

import { motion } from 'framer-motion';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { googleLogin } from './actions';

export default function Page() {
  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 150,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 1 }}
      action={googleLogin}
      className="w-552 h-604 p-68 pt-116 flex flex-col justify-between rounded-30 shadow-login">
      <div className="flex flex-col items-center gap-16">
        <Icon name="cloverLogo" size={74} />

        <h1 className="text-28 font-bold tracking-[-0.972px]">뽀각 시작하기</h1>
        <p className="text-center text-neutral-70 trackiing-[0.091px]">
          취업 준비 과정에서의 정보를 쉽게 <br />
          정리하고 탐색해보세요
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <TouchButton type="submit" className="relative h-62 rounded-54 bg-[#F2F2F2]">
          <div className="absolute top-6 left-6">
            <Icon name="google" size={50} />
          </div>
          <p className="font-semibold tracking-[-0.091px]">구글로 시작하기</p>
        </TouchButton>
      </div>
    </motion.form>
  );
}
