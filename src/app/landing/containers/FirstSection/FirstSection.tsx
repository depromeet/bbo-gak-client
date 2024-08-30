import { Spacing } from '@/system/utils/Spacing';
import { DownArrow } from './components/DownArrow';
import Image from 'next/image';

export function FirstSection() {
  return (
    <div className="bg-neutral-95 h-[100vh] flex flex-col items-center justify-between pt-[88px] pb-[30px]">
      <Image src="/landing/landing_scape.png" alt="" width={1440} height={900} className="z-[0] absolute top-0" />
      <div className="flex flex-col items-center">
        <span className="text-white font-[700] text-[48px]">아.. 그때 써놓은 자소서 항목 어딨더라?</span>
        <Spacing size={24} />
        <span className="text-neutral-30 font-[500] text-[24px] whitespace-pre text-center">
          {`취준 중 모으는 수많은 정보들, 막상 필요할 때\n어디 있었는지 찾기 힘들었던 경험 있으셨나요?`}
        </span>
      </div>

      <div>
        <DownArrow />
        <Spacing size={60} />
      </div>
    </div>
  );
}
