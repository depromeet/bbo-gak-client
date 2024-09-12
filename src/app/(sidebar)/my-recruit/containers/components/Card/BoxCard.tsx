import { MoreButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/MoreButton';
import { StatusButton } from '@/app/(sidebar)/my-recruit/containers/components/Card/common/StatusButton';
import { RecruitCard } from '@/app/(sidebar)/my-recruit/type';
import { AsyncBoundaryWithQuery } from '@/lib';
import { Icon } from '@/system/components';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { cn } from '@/utils';
import { dday } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { DueDateDialog } from '../DueDateDialog/DueDateDialog';

interface BoxCardProps extends RecruitCard {
  highlighted?: boolean;
  onRecruitDelete: (id: number) => void;
  onRecruitStatusChange: (id: number, status: string) => void;
}

export const MIN_CARD_WIDTH = 250;

export function BoxCard({
  id,
  title,
  recruitStatus,
  season,
  nearestSchedule,
  highlighted = false,
  onRecruitStatusChange,
  onRecruitDelete,
}: BoxCardProps) {
  const router = useRouter();
  const minWidth = MIN_CARD_WIDTH;

  return (
    <div className="flex-1 rounded-[10px] overflow-hidden cursor-pointer" style={{ minWidth, maxWidth: 350 }}>
      <div
        className={cn(
          'h-38 pr-12 pl-20 flex justify-between items-center',
          highlighted ? 'bg-mint-40' : 'bg-neutral-95',
        )}>
        {nearestSchedule == null ? (
          <Dialog>
            <Dialog.Trigger className="flex justify-between items-center w-full">
              <span className="text-label2 text-neutral-50">공고 일정을 등록해주세요</span>
              <Icon name="add" size={20} color={color.neutral50} />
            </Dialog.Trigger>
            <Dialog.Content className="w-400">
              <AsyncBoundaryWithQuery pendingFallback={<></>}>
                <DueDateDialog id={id} title={title} />
              </AsyncBoundaryWithQuery>
            </Dialog.Content>
          </Dialog>
        ) : (
          <>
            <div className="flex items-center gap-[4px]">
              <Icon name="clover" size={20} color={highlighted ? color.mint10 : color.mint30} />
              <span className="text-white text-label2 ">
                {nearestSchedule.recruitScheduleStage} D-{dday(nearestSchedule.deadLine) || 'DAY'}
              </span>
            </div>
            <MoreButton highlighted={highlighted} onDeleteClick={() => onRecruitDelete(id)} />
          </>
        )}
      </div>
      <div
        className={cn(
          'p-20 pt-16 bg-white border-neutral-5 border-1 rounded-b-[10px] hover:border-neutral-95',
          highlighted ? 'border-mint-10 bg-[rgba(221,243,235,0.50)]' : 'border-neutral-5 bg-[white]',
        )}
        onClick={() => router.push(`/my-recruit/${id}`)}>
        <div className="flex justify-between items-center">
          <div className="bg-mint-1 text-mint-50 text-label1 px-8 py-4 rounded-4">{season}</div>
          <div onClick={(e) => e.stopPropagation()}>
            <StatusButton
              currentStatus={recruitStatus}
              onRecruitStatusChange={(status) => onRecruitStatusChange(id, status)}
            />
          </div>
        </div>
        <Spacing size={16} />
        <span className="text-nuetral-95 font-semibold font-body1 text-ellipsis line-clamp-1">{title}</span>
      </div>
    </div>
  );
}
