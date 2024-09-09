import { recruitScheduleStageList } from '@/app/(sidebar)/my-recruit/constant';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { cn } from '@/utils';
import { immer } from '@/utils/immer';
import clsx from 'clsx';
import { format } from 'date-fns/format';
import { useState } from 'react';
import { usePostRecruitSchedule } from '../../api/usePostRecruitSchedule';
import { AddIcon } from '../../containers/components/DueDateDialog/AddIcon';
import { Form } from '../../containers/components/DueDateDialog/Form';

interface DueDateDropDownProps {
  id: number;
  title?: string;
  close: () => void;
}

const DEFAULT_FORM = {
  recruitScheduleStage: recruitScheduleStageList[0],
  deadLine: undefined,
};

export function DueDateDropDown({ id, title, close }: DueDateDropDownProps) {
  const { mutate: postRecruitSchedule } = usePostRecruitSchedule();
  const [scheduleList, setScheduleList] = useState<
    Array<{
      recruitScheduleStage: string;
      deadLine?: Date;
    }>
  >([DEFAULT_FORM]);

  const handleDelete = (index: number) => {
    const newList = [...scheduleList];
    newList.splice(index, 1);
    setScheduleList(newList);
  };

  const save = () => {
    scheduleList.forEach((schedule) => {
      if (schedule.deadLine == null) {
        return;
      }
      postRecruitSchedule({
        id,
        recruitScheduleStage: schedule.recruitScheduleStage,
        deadLine: format(schedule.deadLine, 'yyyy-MM-dd'),
      });
    });
    close();
  };

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
        {scheduleList.map((schedule, index) => (
          <Form
            key={index}
            currentRecruitStage={schedule.recruitScheduleStage}
            selectedDate={schedule.deadLine != null ? new Date(schedule.deadLine) : schedule.deadLine}
            hasDeleteButton={index !== 0}
            hasArrow={title == null}
            onStageClick={(stage) => {
              const newSchedule = immer(scheduleList);
              newSchedule[index].recruitScheduleStage = stage;
              setScheduleList([...newSchedule]);
            }}
            onDeadLineClick={(date) => {
              const newSchedule = immer(scheduleList);
              newSchedule[index].deadLine = date;
              setScheduleList([...newSchedule]);
            }}
            onDeleteClick={() => handleDelete(index)}
          />
        ))}
      </div>
      <Spacing size={16} />
      <TouchButton
        onClick={() => setScheduleList([...scheduleList, DEFAULT_FORM])}
        className="hover:bg-neutral-3 w-full h-46 gap-[4px] rounded-[6px] py-[13px] flex items-center justify-center">
        <AddIcon />
        <span className="text-neutral-40 text-label2 font-medium">일정 추가</span>
      </TouchButton>
      <Spacing size={8} />
      <TouchButton
        onClick={save}
        className="bg-neutral-95 w-full h-46 gap-[4px] rounded-[6px] text-white text-body2 font-semibold py-[13px]">
        저장하기
      </TouchButton>
    </div>
  );
}
