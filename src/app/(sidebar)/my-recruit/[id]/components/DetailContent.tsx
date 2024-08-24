'use client';

import { InfoCard } from '@/components/InfoCard';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { InfoCardType } from '@/types';
import { cn } from '@/utils/tailwind-util';
import Link from 'next/link';
import { useState } from 'react';
import { useGetAllTags } from '../api/useGetAllTag';
import { useGetCardCount } from '../api/useGetCardCount';
import { mockInfoList } from '../mocks';
import TagList from './TagList';

const INFO_OPTIONS = ['서류_준비', '과제_준비', '인터뷰_준비'] as const;

export function DetailContent({ recruitId }: { recruitId: string }) {
  const [currentOption, setCurrentOption] = useState<(typeof INFO_OPTIONS)[number]>('서류_준비');

  const infoList = mockInfoList;

  const { data: cardCount } = useGetCardCount(recruitId);
  const { data: tagsData } = useGetAllTags();

  return (
    <section className="mt-60">
      <div className="flex justify-between mb-[28px]">
        <div className="flex gap-[24px]">
          {INFO_OPTIONS.map((option) => {
            const isActive = currentOption === option;

            return (
              <button
                key={option}
                className="flex gap-[6px] items-center cursor-pointer"
                onClick={() => setCurrentOption(option)}>
                <div className={cn('text-[18px] font-semibold', isActive ? 'text-neutral-80' : 'text-neutral-10')}>
                  {option.replace(/_/g, ' ')}
                </div>
                <div
                  className={cn(
                    'px-[8px] py-[2px] rounded-[6px] text-[14px] font-semibold',
                    isActive ? 'bg-neutral-80 text-neutral-1' : 'bg-neutral-10 text-neutral-1',
                  )}>
                  {cardCount ? cardCount[option] : 0}
                </div>
              </button>
            );
          })}
        </div>

        <Link
          className="flex items-center gap-[8px] bg-neutral-95 py-[0.5rem] px-[1rem] rounded-[6px]"
          href={`/write/${recruitId}`}>
          <Icon name="add" color={color.mint30} />
          <div className="text-white text-[14px] font-semibold">카드 추가</div>
        </Link>
      </div>
      <TagList tagsData={tagsData} />

      <div className="overflow-y-auto h-[calc(100vh-350px)]">
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
      </div>
    </section>
  );
}
