import { Spacing } from '@/system/utils/Spacing';
import { Badge } from '../../components/Badge';
import Image from 'next/image';

export function ThirdSection() {
  return (
    <div className="py-[160px] flex flex-col items-center">
      <Badge>내 공고</Badge>
      <Spacing size={40} />
      <span className="text-neutral-95 text-[42px] font-[600] whitespace-pre text-center">{`지원하고 싶은 공고가 떴나요?\n공고 폴더를 만들어 효율적으로 지원 현황을 관리해요`}</span>
      <Spacing size={112} />
      <div className="relative h-[640px]">
        <div className="absolute flex top-[50%] left-[50%] gap-[12px] translate-x-[calc(-50%+120px)] -translate-y-1/2">
          <div className="flex flex-col">
            <Badge variant="B">1</Badge>
            <Spacing size={20} />
            <span className="text-[24px] whitespace-pre">
              {`추가한 공고들을 분기별로 확인하고\n공고 일정에 맞춰 리마인드 알림까지!\n`}
              <span className="font-[700] text-[#00AF6D]">효율적으로 내 공고별 정보를 관리해요</span>
            </span>
          </div>

          <Spacing size={100} direction="row" />

          <div className="w-[1010px] rounded-[16px] border-neutral-95 border-[8px] overflow-hidden mx-[20px]">
            <Image src="/landing/image153.png" alt="" width={1010} height={640} />
          </div>
          <div className="absolute bottom-[-180px] right-[47%]">
            <Image src="/landing/image142.png" alt="" width={468} height={452} />
          </div>
        </div>
      </div>

      <Spacing size={340} />

      <div className="relative h-[640px]">
        <div className="absolute flex top-[50%] left-[50%] gap-[12px] translate-x-[calc(-50%-100px)] -translate-y-1/2">
          <div className="w-[1010px] rounded-[16px] border-neutral-95 border-[8px] overflow-hidden mx-[20px]">
            <Image src="/landing/image154.png" alt="" width={1010} height={640} />
          </div>

          <Spacing size={70} direction="row" />

          <div>
            <Spacing size={94} />
            <div className="flex flex-col">
              <Badge variant="B">2</Badge>
              <Spacing size={20} />
              <Image src="/landing/image155.png" alt="" width={323} height={48} />
              <Spacing size={16} />
              <span className="text-[24px] whitespace-pre">
                {`미리 모아둔 내 정보들을 단계별로 분류해\n`}
                <span className="font-[700] text-[#00AF6D]">공고 진행상황에 맞춰 빠른 파악이 가능해요</span>
              </span>
            </div>
            <Spacing size={164} />

            <div className="flex flex-col">
              <Badge variant="B">3</Badge>
              <Spacing size={20} />
              <div className="px-[12px] py-[10px] rounded-[12px] border-dashed border-[1px] border-neutral-20">
                <div className="px-[10px] py-[4px] rounded-[6px] text-white bg-[rgba(112,115,124,0.85)] text-label1">
                  내 공고 ‘팀네이버 2024 디자이...’ 폴더로 복사 중
                </div>
              </div>
              <Spacing size={16} />
              <span className="text-[24px] whitespace-pre">
                {`필요한 정보만 `}
                <span className="font-[700] text-[#00AF6D]">드래그 앤 드롭</span>
                {`으로\n간단하게 복사해서 모아요`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
