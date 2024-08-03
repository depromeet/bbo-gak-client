import { Spacing } from '@/components/Spacing';
import { ShoeIcon } from './components/ShoeIcon';

export function ProgressingRecruitment() {
  return (
    <>
      <div className="flex gap-[8px]">
        <ShoeIcon />
        <span className="text-heading2 font-semibold">현재 진행중인 공고 모아보기</span>
      </div>
      <Spacing size={24} />
      <div className="w-250 h-150 flex justify-center items-center rounded-[12px] border-neutral-30 border-dashed border-[1px]">
        <span className="text-neutral-30 text-label1">진행중인 공고가 없어요</span>
      </div>
    </>
  );
}
