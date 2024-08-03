'use client';

import { useState } from 'react';
import { mockInfoCount, mockInfoList } from '../mock';
import { cn } from '@/utils/tailwind-util';
import { Button, Icon } from '@/system/components';
import { InfoCardItem } from './InfoCardItem';
import { AddInfoCardDialog } from './AddInfoCardDialog';
import { CARD_TYPES, CardType } from '@/types/info';

export function InfoCardList() {
  const [currentCardType, setCurrentCardType] = useState<CardType>('경험 정리');

  // TODO: API 연동 시 response data로 변경
  const infoCount = mockInfoCount;
  const infoList = mockInfoList;

  return (
    <section>
      <div className="mb-[28px] flex justify-between">
        <div className="flex gap-[24px]">
          {CARD_TYPES.map((type) => (
            <button
              key={type}
              className="flex gap-[6px] items-center cursor-pointer"
              onClick={() => setCurrentCardType(type)}>
              <div
                className={cn(
                  'text-[18px] text-neutral-10 font-semibold',
                  currentCardType === type && 'text-neutral-80',
                )}>
                {type}
              </div>
              <div
                className={cn(
                  'px-[8px] py-[2px] bg-neutral-10 rounded-[6px] text-neutral-1 text-[14px] font-semibold',
                  currentCardType === type && 'bg-neutral-80',
                )}>
                {infoCount[type]}
              </div>
            </button>
          ))}
        </div>
        <AddInfoCardDialog>
          <Button className="flex items-center gap-[4px] bg-neutral-95 py-[8px] px-[16px] rounded-[6px]">
            <Icon name="add" color="#08F29B" />
            <div className="text-white text-[14px] font-semibold">카드 추가</div>
          </Button>
        </AddInfoCardDialog>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
        {infoList.map((info) => (
          <InfoCardItem key={info.id} {...info} />
        ))}
      </div>
    </section>
  );
}
