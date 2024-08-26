import { recruitStatusList } from '@/app/(sidebar)/my-recruit/constant';
import { Button, Dropdown, Icon } from '@/system/components';
import { Calendar } from '@/system/components/Calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { cn } from '@/utils';
import clsx from 'clsx';
import { format } from 'date-fns/format';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { recruitScheduleStageList } from '../../constant';

interface DueDateDialogProps {
  title?: string;
  onDuedateAppend: () => void;
}

export function DueDateDialog({ title }: DueDateDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentRecruitStage, setCurrentRecruitStage] = useState<string>(recruitStatusList[3].text);
  const [dueDateList, setDueDateList] = useState<
    Array<{
      recruitScheduleStage: string | null;
      deadLine: `${number}-${number}-${number}` | null;
    }>
  >([]);

  const isDateSelected = selectedDate != null;
  const activatedAddButton =
    dueDateList.length !== 0 && dueDateList[0].deadLine != null && dueDateList[0].recruitScheduleStage != null;

  return (
    <div className="p-20 z-10">
      <div className="flex items-center w-314">
        {title && (
          <>
            <Icon name="folderFill" size={16} color={color.neutral95} />
            <Spacing size={4} direction="row" />
          </>
        )}
        <span
          className={cn('text-body1 font-semibold overflow-hidden text-ellipsis line-clamp-1', title ? 'flex-1' : '')}>
          {title ? `${title}의 공고 일정 등록하기` : '공고 일정 등록하기'}
        </span>
      </div>
      <Spacing size={4} />
      <span className={(cn('text-caption1 text-neutral-35'), title ? '' : 'block text-start')}>
        일정을 등록하면 잊지 않도록 알려드릴게요!
      </span>
      <Spacing size={24} />
      {/* 마감일 입력 */}
      <div className="w-full flex justify-between items-center p-8 bg-neutral-1 rounded-[8px]">
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center gap-[4px] px-8 py-4">
              <span className="text-label1 text-neutral-95">{currentRecruitStage}</span>
              {title && <Dropdown.TriggerArrow />}
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {recruitScheduleStageList.map((item, index) => (
              <Dropdown.CheckedItem
                key={index}
                checked={currentRecruitStage === item}
                disabled={currentRecruitStage === item}
                onClick={() => setCurrentRecruitStage(item)}>
                {item}
              </Dropdown.CheckedItem>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <Popover>
          <PopoverTrigger>
            <motion.div
              initial="initial"
              variants={{
                initial: { backgroundColor: 'rgb(241, 242, 243, 0)' },
                touch: { scale: 0.96, transition: { duration: 0.1 } },
                hover: { backgroundColor: 'rgb(241, 242, 243, 1)' },
              }}
              whileTap="touch"
              whileHover="hover"
              className="px-8 py-4 flex items-center gap-[4px] rounded-[4px]">
              <Icon name={isDateSelected ? 'calendarFill' : 'calendar'} size={20} color={color.neutral30} />
              <span className={clsx('text-label2', isDateSelected ? 'text-neutral-95' : 'text-neutral-40')}>
                {isDateSelected ? format(selectedDate, 'yyyy.mm.dd') : '마감일을 선택해주세요'}
              </span>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-200">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
          </PopoverContent>
        </Popover>
      </div>
      <Spacing size={16} />
      <Button
        disabled={activatedAddButton === false}
        className="w-full h-46 flex justify-center items-center gap-[4px] border-[1px] border-neutral-35 border-dashed rounded-[6px]">
        <Icon name="add" color={color.neutral35} />
        <span className="text-caption1 font-medium text-neutral-35">일정 추가하기</span>
      </Button>
    </div>
  );
}
