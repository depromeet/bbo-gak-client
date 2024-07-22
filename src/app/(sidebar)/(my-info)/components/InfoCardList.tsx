'use client';

import { useState } from 'react';
import { mockInfoCount, mockInfoList } from '../mock';
import { cn } from '@/utils/tailwind-util';
import { Icon } from '@/system/components';
import { InfoCardItem } from './InfoCardItem';

const INFO_OPTIONS = ['경험 정리', '자기소개서', '면접 질문'] as const;

export function InfoCardList() {
  const [currentOption, setCurrentOption] = useState<(typeof INFO_OPTIONS)[number]>('경험 정리');

  // TODO: API 연동 시 response data로 변경
  const infoCount = mockInfoCount;
  const infoList = mockInfoList;

  return (
    <div>
      <div className="mb-[28px] flex justify-between">
        <div className="flex gap-[24px]">
          {INFO_OPTIONS.map((option) => (
            <button
              key={option}
              className="flex gap-[6px] items-center cursor-pointer"
              onClick={() => setCurrentOption(option)}>
              <div
                className={cn(
                  'text-[18px] text-neutral-10 font-semibold',
                  currentOption === option && 'text-neutral-80',
                )}>
                {option}
              </div>
              <div
                className={cn(
                  'px-[8px] py-[2px] bg-neutral-10 rounded-[6px] text-neutral-1 text-[14px] font-semibold',
                  currentOption === option && 'bg-neutral-80',
                )}>
                {infoCount[option]}
              </div>
            </button>
          ))}
        </div>
        <button className="flex items-center gap-[8px] bg-neutral-95 py-[6px] pl-[16px] pr-[10px] rounded-[6px]">
          <div className="text-white text-[14px] font-semibold">카드 추가</div>
          <Icon name="add" color="#08F29B" />
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
        {infoList.map((info) => (
          <InfoCardItem key={info.id} {...info} />
        ))}
      </div>
    </div>
  );
}
