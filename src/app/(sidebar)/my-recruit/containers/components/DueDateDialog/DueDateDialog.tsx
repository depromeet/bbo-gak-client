import { Button, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { cn } from '@/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useGetRecruitSchedule } from '../../../api/useGetRecruitSchedule';
import { Form } from '@/app/(sidebar)/my-recruit/containers/components/DueDateDialog/Form';
import { If } from '@/system/utils/If';
import { useQueryClient } from '@tanstack/react-query';
import { GET_ALL_RECRUITS_KEY } from '../../../api/useGetAllRecruits';
import { GET_PROGRESSING_RECRUITS_KEY } from '../../../api/useGetProgressingRecruits';
import { useDeleteRecruitSchedule } from '../../../api/useDeleteRecruitSchedule';

interface DueDateDialogProps {
  id: number;
  title?: string;
  onDuedateAppend: () => void;
}

export function DueDateDialog({ id, title }: DueDateDialogProps) {
  const [additonalScheduleForm, setAdditionalScheduleForm] = useState(false);
  const scheduleList = useGetRecruitSchedule({ id }).data;

  const { mutate: deleteRecruitSchedule } = useDeleteRecruitSchedule();

  const activatedAddButton =
    additonalScheduleForm === false &&
    scheduleList.length !== 0 &&
    scheduleList[0].deadLine != null &&
    scheduleList[0].recruitScheduleStage != null;

  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESSING_RECRUITS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RECRUITS_KEY] });
    };
  }, []);

  return (
    <div className="p-20" key={scheduleList.length}>
      <div className="flex items-center w-314">
        {title && (
          <>
            <Icon name="folderFill" size={20} color={color.neutral95} />
            <Spacing size={4} direction="row" />
          </>
        )}
        <span
          className={cn('text-body1 font-semibold overflow-hidden text-ellipsis line-clamp-1', title ? 'flex-1' : '')}>
          {title ? `${title}의 공고 일정 등록하기` : '공고 일정 등록하기'}
        </span>
      </div>
      <Spacing size={4} />
      <span className={clsx('text-caption1 text-neutral-35', title ? '' : 'block text-start')}>
        일정을 등록하면 잊지 않도록 알려드릴게요!
      </span>
      <Spacing size={24} />
      {/* 마감일 입력 */}
      <div className="flex w-full flex-col gap-[8px]">
        {scheduleList.length === 0 ? (
          <Form recruitId={id} hasArrow={title != null} />
        ) : (
          scheduleList.map((schedule, index) => (
            <Form
              recruitId={id}
              key={schedule.id}
              {...schedule}
              hasArrow={title != null}
              hasDeleteButton={index !== 0}
              onDeleteClick={() => deleteRecruitSchedule({ id, recruitScheduleId: schedule.id })}
            />
          ))
        )}
        <If condition={additonalScheduleForm}>
          <Form
            recruitId={id}
            hasArrow={title != null}
            hasDeleteButton
            onDeleteClick={() => setAdditionalScheduleForm(false)}
          />
        </If>
      </div>
      <Spacing size={16} />
      <Button
        onClick={() => setAdditionalScheduleForm(true)}
        disabled={activatedAddButton === false}
        className={cn(
          activatedAddButton ? 'bg-neutral-95' : 'border-dashed',
          'w-full h-46 flex justify-center items-center gap-[4px] border-[1px] border-neutral-35 rounded-[6px]',
        )}>
        <Icon name="add" color={activatedAddButton ? 'white' : color.neutral70} />
        <span className={clsx(activatedAddButton ? 'text-white' : 'text-neutral-70', 'text-caption1 font-medium')}>
          일정 추가하기
        </span>
      </Button>
    </div>
  );
}
