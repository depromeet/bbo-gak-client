'use client';

import { Dropdown, Icon } from '@/system/components';
import { InfoCardList } from './components/InfoCardList';
import { useRef, useState } from 'react';
import { AddInfoCardDialog } from './components/AddInfoCardDialog';
import { TouchButton } from '@/components/TouchButton';
import { INFO_TYPES, InfoType } from '@/types';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/utils/tailwind-util';
import { useGetCardTypeCount } from './apis/useGetCardTypeCount';
import { If } from '@/system/utils/If';
import { motion } from 'framer-motion';
import { InfoCardSkeleton } from './components/InfoCardSkeleton';
import { AsyncBoundaryWithQuery } from '@/lib';
import { Onboarding } from './containers/Onboarding/Onboarding';
import { useSearchParams } from 'next/navigation';

export default function MyInfo() {
  const [showHeader, setShowHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const [currentCardType, setCurrentCardType] = useState<InfoType>('경험_정리');

  const { data: cardCount } = useGetCardTypeCount();

  useScroll(headerRef, (y) => setShowHeader(y > 192));

  const params = useSearchParams();

  return (
    <div ref={headerRef} className="max-h-[100vh] w-full overflow-auto">
      <div className="mx-auto max-w-[1700px] py-[64px] px-[80px] bg-neutral-1">
        <div className="mb-[48px] flex justify-between">
          <h1 className="text-[28px] font-bold">내 정보</h1>
        </div>
        <div className="sticky top-0 bg-neutral-1">
          <div className="flex justify-between py-[24px]">
            <If condition={showHeader}>
              <div className="flex gap-12 items-center">
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-heading1 font-bold">
                  내 정보
                </motion.h1>
                <Dropdown>
                  <Dropdown.Trigger>
                    <TouchButton layout>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 rounded-6 border bg-white px-12 py-6">
                        <span className="text-label1 font-semibold text-neutral-95">
                          {currentCardType.replaceAll('_', ' ')}
                        </span>
                        <Dropdown.TriggerArrow />
                      </motion.div>
                    </TouchButton>
                  </Dropdown.Trigger>
                  <Dropdown.Content align="end">
                    {INFO_TYPES.map((type) => (
                      <Dropdown.CheckedItem
                        key={type}
                        checked={type === currentCardType}
                        className={type === currentCardType ? 'text-neutral-30' : ''}
                        onClick={() => setCurrentCardType(type)}>
                        {type.replace('_', ' ')}
                      </Dropdown.CheckedItem>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </If>
            <If condition={!showHeader}>
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
            </If>
            <AddInfoCardDialog>
              <TouchButton layout>
                <motion.div
                  initial={{ padding: '8px 16px' }}
                  variants={{ longPadding: { padding: '8px 16px' }, shortPadding: { padding: '8px 8px' } }}
                  animate={showHeader ? 'shortPadding' : 'longPadding'}
                  className="bg-neutral-95 flex items-center gap-[4px] rounded-[6px]">
                  <Icon name="add" size={20} color="#20E79D" />
                  {!showHeader && <span className="text-label1 text-white font-semibold">카드 추가</span>}
                </motion.div>
              </TouchButton>
            </AddInfoCardDialog>
          </div>
          <If condition={showHeader}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-[-80px] bg-neutral-5 h-[1px]" />
          </If>
        </div>
        <AsyncBoundaryWithQuery
          errorFallback={<InfoCardSkeleton count={4} />}
          pendingFallback={<InfoCardSkeleton count={4} />}>
          <InfoCardList cardType={currentCardType} />
        </AsyncBoundaryWithQuery>
        <If condition={params.get('onboarding') === 'true'}>
          <Onboarding />
        </If>
      </div>
    </div>
  );
}
