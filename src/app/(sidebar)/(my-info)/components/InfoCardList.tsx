'use client';

import { useState } from 'react';
import { cn } from '@/utils/tailwind-util';
import { Button, Icon } from '@/system/components';
import { AddInfoCardDialog } from './AddInfoCardDialog';
import { INFO_TYPES, InfoType } from '@/types/info';
import { useGetInfoCardList } from '../apis/useGetInfoCardList';
import { useGetCardTypeCount } from '../apis/useGetCardTypeCount';
import { InfoCard } from '@/components/InfoCard';
import { TouchButton } from '@/components/TouchButton';

export function InfoCardList() {
  const [currentCardType, setCurrentCardType] = useState<InfoType>('경험_정리');

  const { data: infoCardList } = useGetInfoCardList(currentCardType);
  const { data: cardCount } = useGetCardTypeCount();

  return (
    <section>
      <div className="mb-[28px] flex justify-between">
        <div className="flex gap-[24px]">
          {INFO_TYPES.map((type) => (
            <TouchButton
              key={type}
              className="flex gap-[6px] items-center cursor-pointer"
              onClick={() => setCurrentCardType(type)}>
              <div
                className={cn(
                  'text-[18px] text-neutral-10 font-semibold',
                  currentCardType === type && 'text-neutral-80',
                )}>
                {type.replaceAll('_', ' ')}
              </div>
              <div
                className={cn(
                  'px-[8px] py-[2px] bg-neutral-10 rounded-[6px] text-neutral-1 text-[14px] font-semibold',
                  currentCardType === type && 'bg-neutral-80',
                )}>
                {cardCount?.[type] || 0}
              </div>
            </TouchButton>
          ))}
        </div>
        <AddInfoCardDialog>
          <TouchButton className="flex items-center gap-[4px] bg-neutral-95 py-[8px] px-[16px] rounded-[6px]">
            <Icon name="add" color="#08F29B" />
            <div className="text-white text-[14px] font-semibold">카드 추가</div>
          </TouchButton>
        </AddInfoCardDialog>
      </div>
      {infoCardList?.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
          {infoCardList?.map((info) => (
            <li key={info.id} className="min-w-[343px]">
              <InfoCard {...info} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-50 text-center text-body1 text-neutral-30">아직 생성된 정보 카드가 없어요!</div>
      )}
    </section>
  );
}
