'use client';

import { InfoCard } from '@/components/InfoCard';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { InfoCardType } from '@/types';
import { cn } from '@/utils/tailwind-util';
import { useState } from 'react';
import { mockInfoCount, mockInfoList } from '../mocks';

const INFO_OPTIONS = ['서류 준비', '과제 준비', '면접 준비'] as const;

export function DetailContent() {
  const [currentOption, setCurrentOption] = useState<(typeof INFO_OPTIONS)[number]>('서류 준비');

  // TODO: API로 받아오기
  const infoCount = mockInfoCount;
  const infoList = mockInfoList;

  return (
    <section>
      <div className="flex justify-between mb-[28px] ">
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
        <button className="flex items-center gap-[8px] bg-neutral-95 py-[0.5rem] px-[1rem] rounded-[6px]">
          <Icon name="add" color={color.mint30} />
          <div className="text-white text-[14px] font-semibold">카드 추가</div>
        </button>
      </div>
      {/* <TagList /> */}
      {infoList && infoList.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
          {infoList.map((info: InfoCardType) => (
            <li key={info.id} className="min-w-[343px]">
              <InfoCard {...info} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="w-[280px] h-[280px] bg-[#D9D9D9]" />
          <p className="mt-[16px]">정보가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
