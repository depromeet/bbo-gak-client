import { Spacing } from '@/components/Spacing';
import { Button, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';
import { Calendar } from '@/system/components/Calendar/Calendar';
import { format } from 'date-fns/format';
import { useState } from 'react';

interface DueDateDialogProps {
  title: string;
}

export function DueDateDialog({ title }: DueDateDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const isDateSelected = selectedDate != null;

  return (
    <div className="p-20">
      <div className="flex items-center w-314">
        <Icon name="folderFill" size={16} color={color.neutral95} />
        <Spacing size={4} direction="row" />
        <span className="text-body1 font-semibold flex-1 overflow-hidden text-ellipsis line-clamp-1">{title}</span>
        <span className="text-body1">의 공고 일정 등록하기</span>
      </div>
      <Spacing size={4} />
      <span className="text-caption1 text-neutral-35">일정을 등록하면 잊지 않도록 알려드릴게요!</span>
      <Spacing size={24} />
      {/* 마감일 입력 */}
      <div className="w-full flex justify-between items-center p-8 bg-neutral-1 rounded-[8px]">
        <span className="text-label1 text-neutral-95">서류마감</span>
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
              <Icon name={isDateSelected ? 'calendarFill' : 'calendar'} size={20} color="#AEB0B6" />
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
      <Button className="w-full h-46 flex justify-center items-center gap-[4px] border-[1px] border-neutral-35 border-dashed rounded-[6px]">
        <Icon name="add" color={color.neutral35} />
        <span className="text-caption1 font-medium text-neutral-35">일정 추가하기</span>
      </Button>
    </div>
  );
}
