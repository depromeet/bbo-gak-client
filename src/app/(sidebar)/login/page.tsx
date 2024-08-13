'use client';

import { postLogin } from '@/apis/login';
import { SSRSafeSuspense } from '@/lib';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(token != null);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await postLogin({ loginId, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      alert('로그인 성공');
      router.replace('/');
    } catch (error) {
      alert('로그인 실패');
    }
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded"
            onClick={() => {
              router.replace('/');
            }}>
            홈으로
          </Button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="flex flex-col justify-center gap-10">
            <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="이메일" className="mb-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="mb-4"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">
            로그인
          </button>
        </form>
      )}
    </div>
    </SSRSafeSuspense>
  );
}
