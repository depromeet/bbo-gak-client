import { match } from 'ts-pattern';
import { If } from '@/system/utils/If';
import { Spacing } from '@/system/utils/Spacing';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { dday } from '@/utils/date';
import { MoreButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/MoreButton';
import { StatusButton } from './common/StatusButton';
import { cn } from '@/utils';
import { RecruitCard } from '@/app/(sidebar)/my-recruit/type';

type RowCardProps = RecruitCard & {
  highlighted?: boolean;
  onRecruitDelete: (id: number) => void;
  onRecruitStatusChange: (id: number, status: string) => void;
};

export function RowCard({
  id,
  title,
  recruitStatus,
  season,
  nearestSchedule,
  highlighted = false,
  onRecruitDelete,
  onRecruitStatusChange,
}: RowCardProps) {
  const isOutOfDate = nearestSchedule != null && dday(nearestSchedule.deadLine) < 0;

  const pointerEventsClassName = isOutOfDate ? 'pointer-events-none' : 'pointer-events-auto';
  const rightMarkBackgroundColorClassName = match({ isOutOfDate, highlighted })
    .with({ isOutOfDate: true }, () => 'bg-neutral-10')
    .with({ highlighted: true }, () => 'bg-mint-40')
    .otherwise(() => 'bg-neutral-95');

  return (
    <div className={cn('w-full rounded-[10px] overflow-hidden flex cursor-pointer', pointerEventsClassName)}>
      <div className={cn('w-12 disabled:bg-neutral-10 h-70', rightMarkBackgroundColorClassName)} />
      <div
        className={cn(
          'px-24 py-22 flex-1 flex items-center border-1 border-l-transparent rounded-r-[10px] justify-between hover:border-neutral-95 hover:border-l-transparent',
          highlighted ? 'border-mint-10 bg-[rgba(221,243,235,0.50)]' : 'border-neutral-5',
        )}>
        <div className="flex items-center">
          <span className="text-neutral-50 text-label2 font-medium">{season}</span>
          <Spacing size={24} direction="row" />
          <If condition={nearestSchedule != null}>
            <div className="px-6 py-4 rounded-[4px] bg-neutral-95 flex gap-[2px]">
              <Icon name="clover" size={20} color={color.mint30} />
              <span className="text-white text-label2 ">
                {recruitStatus} D-{dday(nearestSchedule?.deadLine!)}
              </span>
            </div>
          </If>
          <Spacing size={12} direction="row" />
          <span className="font-semibold font-body1">{title}</span>
        </div>
        <div className="flex items-center">
          <StatusButton
            currentStatus={recruitStatus}
            onRecruitStatusChange={(status) => onRecruitStatusChange(id, status)}
          />
          <Spacing size={32} direction="row" />
          <MoreButton onDeleteClick={() => onRecruitDelete(id)} />
        </div>
      </div>
    </div>
  );
}
