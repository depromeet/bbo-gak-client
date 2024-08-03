import { Icon } from '@/system/components';
import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/components/Spacing';
import { Progressing } from './containers/Progressing';
import { All } from './containers/All';

export default function MyRecruit() {
  return (
    <div className="max-w-[1700px] py-[64px] px-[80px] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-title2 font-bold">내 공고 뽀각</h1>
        <div className="flex gap-[16px]">
          <TouchButton className="bg-white flex gap-[4px] py-[8px] px-[12px] rounded-[6px]">
            <Icon name="copy" size={16} color="#CCCDD1" />
            <span className="text-label1 font-semibold text-neutral-20">내 정보 가져오기</span>
          </TouchButton>
          <TouchButton className="bg-neutral-95 flex items-center gap-[4px] py-[8px] px-[16px] rounded-[6px]">
            <Icon name="add" size={24} color="#20E79D" />
            <span className="text-label1 text-white font-semibold">새 공고</span>
          </TouchButton>
        </div>
      </div>
      <Spacing size={54} />
      <Progressing />
      <Spacing size={88} />
      <All />
    </div>
  );
}
