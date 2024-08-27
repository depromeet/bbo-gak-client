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
import { useGetRecruitCards } from '../api/useGetRecruitCards';
import TagList from './TagList';

const PROGRESS_OPTIONS = ['서류_준비', '과제_준비', '인터뷰_준비'] as const;

export type ProgressType = (typeof PROGRESS_OPTIONS)[number];

export function DetailContent({ recruitId }: { recruitId: string }) {
  const [currentOption, setCurrentOption] = useState<ProgressType>('서류_준비');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: cardCount } = useGetCardCount(recruitId);
  const { data: tagsData } = useGetAllTags();
  const { data: cardList } = useGetRecruitCards({ id: recruitId, progress: currentOption });

  const filteredCardList =
    selectedTags.length > 0
      ? cardList?.filter((card) => card.tagList.some((tag) => selectedTags.includes(tag.name)))
      : cardList;

  return (
    <section className="flex-1 py-[64px] px-[80px]">
      <div className="flex justify-between mb-[28px]">
        <div className="flex gap-[24px]">
          {PROGRESS_OPTIONS.map((option) => {
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
                  {cardCount?.[option]}
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

      <TagList tagsData={tagsData || []} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <div className="overflow-y-auto h-[calc(100vh-350px)] ::-webkit-scrollbar">
        {filteredCardList && filteredCardList.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
            {filteredCardList.map((info: InfoCardType) => (
              <li key={info.id} className="min-w-[343px]">
                <InfoCard {...info} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <Icon name="empty" size={280} />
            <p className="mt-[16px] text-body1 font-neutral-30">아직 생성된 정보 카드가 없어요!</p>
          </div>
        )}
      </div>
    </section>
  );
}
