import { Dropdown, Icon } from '@/system/components';
import { Calendar } from '@/system/components/Calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';
import { color } from '@/system/token/color';
import clsx from 'clsx';
import { format } from 'date-fns/format';
import { motion } from 'framer-motion';
import { recruitScheduleStageList } from '@/app/(sidebar)/my-recruit/constant';
import { useState } from 'react';
import { usePostRecruitSchedule } from '../../../api/usePostRecruitSchedule';
import { usePutRecruitScheduleDeadline } from '../../../api/usePutRecruitScheduleDeadline';
import { usePutRecruitScheduleStage } from '../../../api/usePutRecruitScheduleStage';
import { If } from '@/system/utils/If';

interface Props {
  id?: number;
  recruitId: number;
  deadLine?: string;
  recruitScheduleStage?: string;
  hasDeleteButton?: boolean;
  hasArrow: boolean;
  onDeleteClick?: () => void;
}

// 매번 서버요청 안하도록 리팩토링
export function Form({
  id,
  recruitId,
  hasArrow,
  deadLine,
  recruitScheduleStage,
  hasDeleteButton,
  onDeleteClick,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(deadLine != null ? new Date(deadLine) : undefined);
  const [currentRecruitStage, setCurrentRecruitStage] = useState<string>(
    recruitScheduleStage ?? recruitScheduleStageList[0],
  );

  const isDateSelected = selectedDate != null;
  const { mutate: postRecruitSchedule } = usePostRecruitSchedule();
  const { mutate: putRecruitScheduleDeadline } = usePutRecruitScheduleDeadline();
  const { mutate: putRecruitScheduleState } = usePutRecruitScheduleStage();

  const handleStageClick = (item: string) => {
    if (id != null) {
      putRecruitScheduleState({ id: recruitId, recruitScheduleId: id, recruitScheduleStage: item });
      return;
    }
    setCurrentRecruitStage(item);
    if (selectedDate == null) {
      return;
    }
    postRecruitSchedule({
      id: recruitId,
      deadLine: format(selectedDate, 'yyyy-MM-dd'),
      recruitScheduleStage: currentRecruitStage,
    });
  };

  const handleDeadlineClick = (date?: Date) => {
    if (date == null) {
      return;
    }
    if (id != null) {
      putRecruitScheduleDeadline({ id: recruitId, recruitScheduleId: id, deadLine: format(date, 'yyyy-MM-dd') });
      return;
    }
    setSelectedDate(date);
    postRecruitSchedule({
      id: recruitId,
      deadLine: format(date, 'yyyy-MM-dd'),
      recruitScheduleStage: currentRecruitStage,
    });
  };

  return (
    <div className="w-full flex justify-between items-center p-8 bg-neutral-1 rounded-[8px]">
      <Dropdown>
        <Dropdown.Trigger>
          <div className="flex items-center gap-[4px] px-8 py-4">
            <span className="text-label1 text-neutral-95">{currentRecruitStage}</span>
            {hasArrow && <Dropdown.TriggerArrow />}
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content>
          {recruitScheduleStageList.map((item, index) => (
            <Dropdown.CheckedItem
              key={index}
              checked={currentRecruitStage === item}
              disabled={currentRecruitStage === item}
              onClick={() => handleStageClick(item)}>
              {item}
            </Dropdown.CheckedItem>
          ))}
        </Dropdown.Content>
      </Dropdown>
      <div className="flex items-center">
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
                {isDateSelected ? format(selectedDate, 'yyyy.MM.dd') : '마감일을 선택해주세요'}
              </span>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-270 mr-[120px]">
            <Calendar mode="single" selected={selectedDate} onSelect={handleDeadlineClick} />
          </PopoverContent>
          <If condition={hasDeleteButton}>
            <button onClick={onDeleteClick}>
              <Icon name="close" size={16} color={'#989BA2'} />
            </button>
          </If>
        </Popover>
      </div>
    </div>
  );
}
