import { If } from '@/system/utils/If';
import { Spacing } from '@/system/utils/Spacing';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { dday } from '@/utils/date';
import { MoreButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/MoreButton';
import { StatusButton } from './common/StatusButton';
import { cn } from '@/utils';

interface RowCardProps {
  id: number;
  type: '서류 마감' | '1차 면접' | '2차 면접';
  status: '지원 완료' | '서류 통과' | '서류 탈락';
  dueDate: Date | null;
  period: string;
  title: string;
  highlighted?: boolean;
}

export function RowCard({ type, title, status, dueDate, period, highlighted = false }: RowCardProps) {
  return (
    <div className="rounded-[10px] overflow-hidden flex cursor-pointer">
      <div className={cn('w-12', highlighted ? 'bg-mint-40' : 'bg-neutral-95')} />
      <div
        className={cn(
          'px-24 py-22 flex-1 flex items-center border-1 border-l-transparent rounded-r-[10px] justify-between',
          highlighted ? 'border-mint-10 bg-[rgba(221,243,235,0.50)]' : 'border-neutral-5',
        )}>
        <div className="flex items-center">
          <span className="text-neutral-50 text-label2 font-medium">{period}</span>
          <Spacing size={24} direction="row" />
          <If condition={dueDate != null}>
            <div className="px-6 py-4 rounded-[4px] bg-neutral-95 flex gap-[2px]">
              <Icon name="clover" size={20} color={color.mint30} />
              <span className="text-white text-label2 ">
                {type} D-{dday(dueDate!)}
              </span>
            </div>
          </If>
          <Spacing size={12} direction="row" />
          <span className="font-semibold font-body1">{title}</span>
        </div>
        <div className="flex items-center">
          <StatusButton currentStatus={status} />
          <Spacing size={32} direction="row" />
          <MoreButton />
        </div>
      </div>
    </div>
  );
}
