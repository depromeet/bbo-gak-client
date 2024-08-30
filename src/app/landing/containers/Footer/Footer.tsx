import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/system/utils/Spacing';
import { NoteIcon } from './components/NoteIcon';
import { PencilIcon } from './components/PencilIcon';
import { CloverIcon } from './components/CloverIcon';
import { TitleIcon } from './components/TitleIcon';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();

  return (
    <footer className="flex flex-col items-center justify-center bg-neutral-95">
      <Spacing size={120} />
      <div className="flex items-center gap-[6px]">
        <span className="text-title3 text-white">흩어져있는 내 경험들</span>
        <NoteIcon />
        <span className="text-title3 text-white">모아모아 취뽀까지</span>
        <PencilIcon />
      </div>
      <Spacing size={32} />
      <div className="flex items-center gap-[18px]">
        <CloverIcon />
        <TitleIcon />
      </div>
      <Spacing size={37} />
      <TouchButton
        className="bg-mint-30 rounded-[6px] px-[20px] py-[13px] text-body2 text-neutral-95 font-semibold"
        onClick={() => router.push('/login')}>
        취뽀하러 가기
      </TouchButton>
      <Spacing size={180} />
    </footer>
  );
}
