import { Spacing } from '@/components/Spacing';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { dday } from '@/utils/date';
import { MoreButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/MoreButton';
import { StatusButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/StatusButton';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { DueDateDialog } from '../DueDateDialog';

export type ProgressingCardType = {
  type: '서류 마감' | '1차 면접' | '2차 면접';
  status: '지원 완료' | '서류 통과' | '서류 탈락';
  dueDate: Date | null;
  period: string;
  title: string;
};

export function BoxCard({ type, title, status, dueDate, period }: ProgressingCardType) {
  return (
    <div className="w-[320px] rounded-[10px] overflow-hidden cursor-pointer">
      <div className="h-38 pr-12 pl-20 bg-neutral-95 flex justify-between items-center">
        {dueDate == null ? (
          <Dialog>
            <Dialog.Trigger className="flex justify-between items-center w-full">
              <span className="text-label2 text-neutral-50">공고 일정을 등록해주세요</span>
              <Icon name="add" size={24} color={color.neutral50} />
            </Dialog.Trigger>
            <Dialog.Content className="w-400">
              <DueDateDialog title={title} />
            </Dialog.Content>
          </Dialog>
        ) : (
          <>
            <div className="flex items-center gap-[4px]">
              <Icon name="clover" size={20} color={color.mint30} />
              <span className="text-white text-label2 ">
                {type} D-{dday(dueDate)}
              </span>
            </div>
            <MoreButton />
          </>
        )}
      </div>
      <div className="p-20 pt-16 bg-white border-neutral-5 border-1 rounded-b-[10px] hover:border-neutral-95">
        <div className="flex justify-between items-center">
          <div className="bg-mint-1 text-mint-50 text-label1 px-8 py-4 rounded-4">{period}</div>
          <StatusButton currentStatus={status} />
        </div>
        <Spacing size={16} />
        <span className="text-nuetral-95 font-semibold font-body1 text-ellipsis line-clamp-1">{title}</span>
      </div>
    </div>
  );
}

const statusList = [
  { variant: 'text', text: '지원 준비' },
  { variant: 'text', text: '지원 완료' },
  { variant: 'border' },
  { variant: 'text', text: '서류 통과' },
  { variant: 'text', text: '서류 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '면접 통과' },
  { variant: 'text', text: '면접 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '최종 합격' },
  { variant: 'text', text: '최종 탈락' },
] as const;
