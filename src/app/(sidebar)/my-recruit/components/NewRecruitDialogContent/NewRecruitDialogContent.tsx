import { Spacing } from '@/system/utils/Spacing';
import { TouchButton } from '@/components/TouchButton';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { color } from '@/system/token/color';
import { InputField } from './InputField';
import { useEffect, useState } from 'react';
import { Icon } from '@/system/components';
import { Dropdown } from '@/system/components';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/system/components/Popover/Popover';
import { Calendar } from '@/system/components/Calendar/Calendar';
import { format } from 'date-fns/format';
import { useGetSeasons } from '../../api/useGetSeasons';
import { recruitStatusList } from '../../constant';
import { recruitScheduleStageList } from '@/app/(sidebar)/my-recruit/constant';

export interface CardData {
  season: string;
  title: string;
  siteUrl: string;
  recruitScheduleStage: string;
  deadLine: string | null;
}

interface NewRecruitDialogContentProps {
  onSubmit: (data: CardData) => void;
}

const TITLE_MAX_LENGTH = 30;

export function NewRecruitDialogContent({ onSubmit }: NewRecruitDialogContentProps) {
  const [title, setTitle] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentRecruitStage, setCurrentRecruitStage] = useState<string>(recruitScheduleStageList[0]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedSeason, setSelectedSeason] = useState<string>();
  const seasonList = useGetSeasons()?.data ?? [];
  const isDateSelected = selectedDate != null;

  useEffect(() => {
    setIsOpen(false);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedSeason == null) {
      setSelectedSeason(seasonList[0]?.name);
    }
  }, [seasonList.length]);

  const canSubmit = title.length !== 0 && selectedSeason != null;

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
      <Dropdown colorVariant="black">
        <Dropdown.Trigger asChild>
          <button className="w-full flex justify-between items-center px-16 py-12 bg-neutral-1 border-neutral-20 rounded-[8px] border-[1px]">
            <span>{selectedSeason}</span>
            <Icon name="down" size={24} color={color.neutral40} />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content className="w-360">
          {seasonList.reverse().map((season) => (
            <Dropdown.CheckedItem
              key={season.name}
              checked={season.name === selectedSeason}
              disabled={season.name === selectedSeason}
              onClick={() => setSelectedSeason(season.name)}>
              <span className={'text-label1'}>{season.name}</span>
            </Dropdown.CheckedItem>
          ))}
        </Dropdown.Content>
      </Dropdown>
      <Spacing size={8} />

      {/* 마감일 입력 */}
      <div className="w-full flex justify-between items-center px-8 pt-10 pb-8 bg-neutral-1 border-neutral-20 rounded-[8px] border-[1px]">
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center gap-[4px] px-8 py-4">
              <span className="text-label1 text-neutral-95">{currentRecruitStage}</span>
              <Dropdown.TriggerArrow />
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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
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
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
          </PopoverContent>
        </Popover>
      </div>
      <Spacing size={8} />

      {/* 공고 링크 입력 */}
      <InputField
        value={siteUrl}
        placeholder="공고 링크를 입력해주세요"
        right={<Icon name={siteUrl.length === 0 ? 'unlink' : 'link'} size={16} color={color.neutral50} />}
        onChange={(event) => setSiteUrl(event.target.value)}
      />
      <Spacing size={20} />

      {/* 제출 버튼 */}
      <Dialog.Close asChild>
        <TouchButton
          variants={{
            inactive: { backgroundColor: color.neutral5, color: color.neutral30 },
            active: { backgroundColor: color.neutral95, color: color.white },
          }}
          animate={canSubmit ? 'active' : 'inactive'}
          disabled={canSubmit === false}
          onClick={() => {
            if (canSubmit) {
              onSubmit({
                title,
                siteUrl,
                season: selectedSeason,
                recruitScheduleStage: currentRecruitStage,
                deadLine: selectedDate != null ? format(selectedDate, 'yyyy-MM-dd') : null,
              });
            }
          }}
          className="w-full flex justify-center items-center h-48 rounded-[6px]">
          공고 추가하기
        </TouchButton>
      </Dialog.Close>
    </div>
  );
}
