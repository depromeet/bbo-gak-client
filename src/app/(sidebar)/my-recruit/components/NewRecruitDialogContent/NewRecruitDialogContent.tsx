import { Spacing } from '@/components/Spacing';
import { TouchButton } from '@/components/TouchButton';
import { Dialog } from '@/system/components/Dialog/ShadnDialog';
import { color } from '@/system/token/color';
import { InputField } from './InputField';
import { useState } from 'react';
import { Icon } from '@/system/components';
import { getCurrentYearAndHalf, getNextYearAndHalf } from './date';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';
import { Calendar } from '@/system/components/Calendar/Calendar';
import { format } from 'date-fns/format';
import { If } from '@/components/If';

interface Props {
  onSubmit: () => void;
}

const TITLE_MAX_LENGTH = 30;
// FIXME: 서버쪽에서 전달해주는 데이터로 교체
const DEFAULT_DROPDOWN_PERIOD = [getCurrentYearAndHalf(), getNextYearAndHalf()];

export function NewRecruitDialogContent() {
  const [title, setTitle] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentYearAndHalf());
  const [link, setLink] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const isButtonActivated = title.length !== 0;
  const isDateSelected = selectedDate != null;

  return (
    <div className="p-20">
      <Dialog.Title>
        <span className="text-neutral-95 text-body1 font-semibold">새 공고 추가하기</span>
      </Dialog.Title>
      <Spacing size={4} />
      <span className="text-caption1 text-neutral-35 font-regular">공고를 등록하고 정보를 모아보세요!</span>
      <Spacing size={24} />

      {/* 공고 제목 입력 */}
      <InputField
        required
        value={title}
        placeholder="공고 제목을 입력해주세요"
        maxLength={TITLE_MAX_LENGTH}
        right={<span className="text-neutral-60 text-caption2">{`${title.length}/${TITLE_MAX_LENGTH}`}</span>}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Spacing size={8} />

      {/* 지원 시기 입력 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex justify-between items-center p-12 bg-neutral-1 border-neutral-20 rounded-[8px] border-[1px]">
            <span>{selectedPeriod}</span>
            <Icon name="down" size={24} color="#878A93" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-360 py-8">
          {/* TODO: 이전 공고들의 연도들도 추가 */}
          {[...DEFAULT_DROPDOWN_PERIOD].reverse().map((period) => (
            <DropdownMenuItem
              key={period}
              className="w-full flex justify-between px-16 py-8"
              onClick={() => setSelectedPeriod(period)}>
              <span className={clsx('text-label1', period === selectedPeriod ? 'text-neutral-30' : 'text-neutral-80')}>
                {period}
              </span>
              <If condition={period === selectedPeriod}>
                <Icon size={16} name="check" color="#AEB0B6" />
              </If>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Spacing size={8} />

      {/* 마감일 입력 */}
      <div className="w-full flex justify-between items-center p-12 bg-neutral-1 border-neutral-20 rounded-[8px] border-[1px]">
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
      <Spacing size={8} />

      {/* 공고 링크 입력 */}
      <InputField
        value={link}
        placeholder="공고 링크를 입력해주세요"
        right={<Icon name={link.length === 0 ? 'unlink' : 'link'} size={16} color="#70737C" />}
        onChange={(event) => setLink(event.target.value)}
      />
      <Spacing size={20} />

      {/* 제출 버튼 */}
      <TouchButton
        variants={{
          inactive: {
            backgroundColor: color.neutral5,
            color: color.neutral30,
          },
          active: {
            backgroundColor: color.neutral95,
            color: color.white,
          },
        }}
        animate={isButtonActivated ? 'active' : 'inactive'}
        disabled={isButtonActivated === false}
        className="w-full flex justify-center items-center h-48 rounded-[6px]">
        공고 추가하기
      </TouchButton>
    </div>
  );
}
