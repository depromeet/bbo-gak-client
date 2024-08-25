import { Logo } from '@/components/Logo';
import { TouchButton } from '@/components/TouchButton';

export function Header() {
  return (
    <header className="flex justify-between items-center px-[80px] py-[16px] bg-neutral-95 fixed top-0 right-0 w-full">
      <Logo />
      <TouchButton className="bg-mint-30 rounded-[6px] px-[16px] py-[8px] text-label1 text-neutral-95 font-semibold">
        시작하기
      </TouchButton>
    </header>
  );
}
