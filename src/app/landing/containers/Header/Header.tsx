'use client';

import { TouchButton } from '@/components/TouchButton';
import { LOGO } from './Logo';
import { Text } from './Text';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header
      className="z-[10000] flex justify-between items-center px-[80px] py-[16px] fixed top-0 right-0 w-full"
      style={{
        backdropFilter: 'blur(5px)',
      }}>
      <div className="flex items-center gap-[6px]">
        <LOGO />
        <Text />
      </div>

      <TouchButton
        className="bg-mint-30 rounded-[6px] px-[16px] py-[8px] text-label1 text-neutral-95 font-semibold"
        onClick={() => router.push('/login')}>
        시작하기
      </TouchButton>
    </header>
  );
}
