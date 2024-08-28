'use client';

import { InfoCard } from '@/components/InfoCard';
import { TouchButton } from '@/components/TouchButton';
import { Droppable } from '@/lib/dnd-kit/Droppable';
import { Icon } from '@/system/components';
import { InfoCardType } from '@/types';
import { cn } from '@/utils/tailwind-util';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePostCardToRecruit } from '../../api/usePostCardToRecruit';
import { useGetAllTags } from '../api/useGetAllTag';
import { useGetCardCount } from '../api/useGetCardCount';
import { useGetRecruitCards } from '../api/useGetRecruitCards';
import { AddRecruitCardDialog } from './AddRecruitCardDialog';
import TagList from './TagList';

export const PROGRESS_OPTIONS = ['서류_준비', '과제_준비', '인터뷰_준비'] as const;

export type ProgressType = (typeof PROGRESS_OPTIONS)[number];

export function DetailContent({ recruitId }: { recruitId: string }) {
  const [currentOption, setCurrentOption] = useState<ProgressType>('서류_준비');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const { data: cardCount } = useGetCardCount(recruitId);
  const { data: tagsData } = useGetAllTags();
  const { data: cardList } = useGetRecruitCards({ id: recruitId, type: currentOption, tagIds: selectedTags });
  const { mutate: mutatePostCardToRecruit } = usePostCardToRecruit();

  const filteredCardList =
    selectedTags.length > 0
      ? cardList?.filter((card) => card.tagList.some((tag) => selectedTags.includes(tag.id)))
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

        <AddRecruitCardDialog>
          <TouchButton layout>
            <motion.div
              initial={{ padding: '8px 16px' }}
              variants={{ longPadding: { padding: '8px 16px' }, shortPadding: { padding: '8px 8px' } }}
              className="bg-neutral-95 flex items-center gap-[4px] rounded-[6px]">
              <Icon name="add" size={20} color="#20E79D" />
              <span className="text-label1 text-white font-semibold">카드 추가</span>
            </motion.div>
          </TouchButton>
        </AddRecruitCardDialog>
      </div>

      <TagList tagsData={tagsData || []} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <div className="overflow-y-auto h-[calc(100vh-350px)] ::-webkit-scrollbar">
        {filteredCardList && filteredCardList.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
            {filteredCardList.map((info: InfoCardType) => (
              <Droppable key={info.id} id={info.id}>
                <li className="min-w-[343px]">
                  <InfoCard {...info} />
                </li>
              </Droppable>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <Droppable id={1234}>
              <Icon name="empty" size={280} />
              <p className="mt-[16px] text-body1 text-neutral-30">아직 생성된 정보 카드가 없어요!</p>
            </Droppable>
          </div>
        )}
      </div>
    </section>
  );
}
