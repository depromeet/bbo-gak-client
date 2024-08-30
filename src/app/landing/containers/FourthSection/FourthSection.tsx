import { Tag } from '@/system/components';
import { Spacing } from '@/system/utils/Spacing';
import { Badge } from '../../components/Badge';
import Image from 'next/image';

export function FourthSection() {
  return (
    <div className="py-[160px] bg-neutral-3 flex flex-col items-center">
      <Badge>태그 검색</Badge>
      <Spacing size={50} />
      <span className="text-neutral-95 text-[42px] font-[600] text-center">
        태그 검색으로 원하는 정보 탐색이 쉬워져요
      </span>
      <Spacing size={24} />
      <span className="text-neutral-50 text-title2 whitespace-pre text-center">{`취준 정보를 작성하는 순간부터 태그를 등록하여\n원하는 키워드의 정보를 빠르게 찾을 수 있어요`}</span>
      <Spacing size={100} />
      <div className="rounded-[30px] border-neutral-95 border-[8px] overflow-hidden mx-[20px]">
        <Image src="/landing/image156_2.png" alt="" width={1000} height={640} />
      </div>
    </div>
  );
}
