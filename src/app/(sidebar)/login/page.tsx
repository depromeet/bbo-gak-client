'use client';

import { loginMutation } from '@/apis/login';
import { logoutMutation } from '@/apis/logout';
import { SSRSafeSuspense } from '@/lib';
import { Button } from '@/system/components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InputField } from '../my-recruit/components/NewRecruitDialogContent/InputField';

export default function Page() {
  const router = useRouter();

  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const { mutate: loginMutate } = loginMutation();
  const { mutate: logoutMutate } = logoutMutation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(token != null);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutate({ loginId, password });
  };

  return (
    <SSRSafeSuspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <div>로딩 중...</div>
        </div>
      }>
      <div className="w-full h-full flex justify-center items-center">
        {isLogin ? (
          <div className="flex flex-col gap-4">
            <div>이미 로그인 되어있습니다.</div>
            <Button
              className="bg-neutral-95 flex items-center gap-[4px] py-[8px] px-[16px] rounded-[6px]"
              onClick={() => {
                router.replace('/');
              }}>
              <span className="w-full text-label1 text-white font-semibold">홈으로</span>
            </Button>
            <Button
              className="bg-neutral-95 flex items-center gap-[4px] py-[8px] px-[16px] rounded-[6px]"
              onClick={() => {
                logoutMutate();
              }}>
              <span className="w-full text-label1 text-white font-semibold">로그아웃</span>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="flex flex-col justify-center gap-10 mb-15">
              <InputField value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="이메일" />
              <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="mb-4"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Button className="bg-neutral-95 flex items-center gap-[4px] py-[8px] px-[16px] rounded-[6px]">
                <span className="w-full text-label1 text-white font-semibold">로그인</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </SSRSafeSuspense>
  );
}
