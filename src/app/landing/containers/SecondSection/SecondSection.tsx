import { Spacing } from '@/system/utils/Spacing';
import { Badge } from '../../components/Badge';
import Image from 'next/image';
import { TitleIcon } from '@/app/landing/containers/SecondSection/components/TitleIcon';

export function SecondSection() {
  return (
    <div className="bg-neutral-95 relative">
      <div className="bg-neutral-95 flex flex-col items-center relative">
        <div className="absolute left-[50%] translate-x-[-50%] top-[70px]">
          <Image src="/landing/landing_03.png" width={410} height={1355} alt="" />
        </div>
        <div
          className="flex flex-col items-center relative w-full"
          style={{ background: 'linear-gradient(180deg, #1B1C1E 15%, rgba(27, 28, 30, 0.00) 100%)' }}>
          <Spacing size={240} />
          <div className="flex flex-col items-center relative w-full">
            <Image
              src="/landing/landing_effect.png"
              alt=""
              width={1227}
              height={509}
              className="z-[0] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
            <span className="text-title3 text-white">여기저기 쌓여있는 내 취준 정보, 이젠 쉽게 정리해보세요! </span>
            <Spacing size={20} />
            <span className="font-[600] text-[52px] text-[white]">취준 데이터 관리 서비스</span>
            <Spacing size={16} />
            <TitleIcon />
          </div>
          <Spacing size={768} />
        </div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-b to-[#81ECC5] from-[rgba(129,236,197,0)] ">
        <Spacing size={370} />
        <Badge>내 정보</Badge>
        <Spacing size={50} />
        <span className="text-white text-[42px] font-[600] whitespace-pre text-center">{`마스터 자소서부터 필수 면접 답변까지\n공통적으로 쓰이는 내 정보를 따로 모아놔요`}</span>
        <Spacing size={24} />
        <span className="text-title2 text-mint-10">자주쓰는 정보를 태그로 쉽게 분류할 수 있어요</span>
        <Spacing size={100} />
        <div className="mx-[20px]">
          <Image src="/landing/image152_2.png" alt="" width={1010} height={640} />
        </div>
        <Spacing size={160} />
      </div>
    </div>
  );
}
