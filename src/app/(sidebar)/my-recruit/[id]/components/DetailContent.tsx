'use client';

import { AddInfoCardDialog } from '@/app/(sidebar)/(my-info)/components/AddInfoCardDialog';
import { InfoCard } from '@/components/InfoCard';
import { TouchButton } from '@/components/TouchButton';
import { Droppable } from '@/lib/dnd-kit/Droppable';
import { Icon } from '@/system/components';
import { InfoCardType } from '@/types';
import { RECRUIT_TYPES, RecruitType } from '@/types/recruit';
import { cn } from '@/utils/tailwind-util';
import { useDndContext } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useGetAllTags } from '../api/useGetAllTag';
import { useGetCardCount } from '../api/useGetCardCount';
import { useGetRecruitCards } from '../api/useGetRecruitCards';
import TagList from './TagList';

export function DetailContent({ recruitId }: { recruitId: string }) {
  const [currentOption, setCurrentOption] = useState<RecruitType>('서류_준비');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { over } = useDndContext();

  const { data: cardCount } = useGetCardCount(recruitId);
  const { data: tagsData } = useGetAllTags();
  const { data: cardList } = useGetRecruitCards({ id: recruitId, type: currentOption, tagIds: selectedTags });

  const filteredCardList =
    selectedTags.length > 0
      ? cardList?.filter((card) => card.tagList.some((tag) => selectedTags.includes(tag.id)))
      : cardList;

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollPosition(contentRef.current.scrollTop);
      }
    };

    const divElement = contentRef.current;
    if (divElement) {
      divElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  return (
    <section className="flex-1 py-[64px] px-[80px]">
      <div className="flex justify-between mb-[28px]">
        <div className="flex gap-[24px]">
          {RECRUIT_TYPES.map((option) => {
            const isActive = currentOption === option;
            return (
              <TouchButton
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
              </TouchButton>
            );
          })}
        </div>

        <AddInfoCardDialog>
          <TouchButton layout>
            <motion.div
              initial={{ padding: '8px 16px' }}
              variants={{ longPadding: { padding: '8px 16px' }, shortPadding: { padding: '8px 8px' } }}
              className="bg-neutral-95 flex items-center gap-[4px] rounded-[6px]">
              <Icon name="add" size={20} color="#20E79D" />
              <span className="text-label1 text-white font-semibold">카드 추가</span>
            </motion.div>
          </TouchButton>
        </AddInfoCardDialog>
      </div>

      <TagList tagsData={tagsData || []} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <Droppable id={1234}>
        <div
          ref={contentRef}
          className={cn(
            'p-10 overflow-y-auto h-[calc(100vh-350px)] ::-webkit-scrollbar',
            over?.id === 1234 && 'file:border-mint-20 bg-[rgba(221,243,235,0.50)] rounded-20',
          )}
          style={{ scrollBehavior: 'smooth' }}>
          {filteredCardList && filteredCardList.length > 0 ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
              {filteredCardList.map((info: InfoCardType) => (
                <li key={info.id} className="min-w-[343px]">
                  <InfoCard {...info} />
                </li>
              ))}
              {scrollPosition > 0 && (
                <TouchButton
                  layout
                  onClick={scrollToTop}
                  className="fixed flex flex-col justify-center items-center a w-62 h-62 rounded-full right-[95px] bottom-[40px] bg-neutral-95 border-neutral-9">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <Icon name="arrowUp" size={24} />
                    <span className="text-neutral-1 text-caption1">TOP</span>
                  </motion.div>
                </TouchButton>
              )}
            </ul>
          ) : (
            <div className={'flex flex-col w-full h-full justify-center items-center'}>
              <Icon name="empty" size={280} />
              <p className="my-[16px] text-body1 text-neutral-30">아직 생성된 정보 카드가 없어요!</p>
            </div>
          )}
        </div>
      </Droppable>
    </section>
  );
}
