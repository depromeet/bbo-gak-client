'use client';

import { InfoCard } from '@/components/InfoCard';
import { TouchButton } from '@/components/TouchButton';
import { AsyncBoundaryWithQuery } from '@/lib';
import { DndContextWithOverlay } from '@/lib/dnd-kit/DndContextWithOverlay';
import { Dropdown, Icon, Text } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useDeleteRecruit } from '../api/useDeleteRecruit';
import { usePostCardToRecruit } from '../api/usePostCardToRecruit';
import { RightSidebar } from '../containers/RightSidebar/RightSidebar';
import { DueDateDialog } from '../containers/components/DueDateDialog/DueDateDialog';
import { DetailContent } from './components/DetailContent';
import DetailHeader from './components/DetailHeader';

export default function CompanyDetail({ params: { id: recruitId } }: { params: { id: string } }) {
  const router = useRouter();
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { mutate: deleteRecruit } = useDeleteRecruit();
  const { mutate: mutatePostCardToRecruit } = usePostCardToRecruit();

  const handleDeleteRecruit = () => {
    deleteRecruit(parseInt(recruitId, 10));
    router.push('/my-recruit');
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over == null || active == null || typeof over.id !== 'number' || typeof active.id !== 'number') {
      return;
    }

    mutatePostCardToRecruit({
      recruitId: parseInt(recruitId, 10),
      cardId: active.id,
    });
  };

  return (
    <DndContextWithOverlay OverlayElement={InfoCard} onDragEnd={onDragEnd}>
      <div className="flex overflow-hidden max-h-[100vh] h-[100vh] bg-white">
        <div className="flex-1 mx-auto max-w-[1700px]">
          <div className="flex justify-between w-full px-[80px] py-[24px] bg-white border-b-1 border-neutral-5">
            <AsyncBoundaryWithQuery>
              <DetailHeader recruitId={recruitId} />
            </AsyncBoundaryWithQuery>

            <div className={cn('flex items-center gap-[16px]')}>
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <TouchButton
                    layout
                    whileHover="hover"
                    aria-label="calendarFill button"
                    className="relative p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10">
                    <Icon name="calendarFill" size={16} color={color.neutral95} />
                    <motion.div
                      className="absolute top-full left-1/2 translate-x-[-50%] mt-[4px] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}>
                      <Text typography="body1" color="white">
                        공고 일정 등록
                      </Text>
                    </motion.div>
                  </TouchButton>
                </Dropdown.Trigger>
                <Dropdown.Content align="end" className="gap-[8px]">
                  <AsyncBoundaryWithQuery pendingFallback={<></>}>
                    <DueDateDialog id={Number(recruitId)} />
                  </AsyncBoundaryWithQuery>
                </Dropdown.Content>
              </Dropdown>

              <TouchButton
                layout
                whileHover="hover"
                onClick={() => setSidebarOpened(!sidebarOpened)}
                className="relative p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10 bg-white max-h-[42px]"
                aria-label="copy button">
                <Icon name="copy" size={16} color={color.neutral95} />
                <motion.div
                  className="absolute top-full left-1/2 translate-x-[-50%] mt-[4px] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
                  initial={{ opacity: 0 }}
                  variants={{ hover: { opacity: 1 } }}>
                  <Text typography="label1" color="white">
                    내 정보 가져오기
                  </Text>
                </motion.div>
              </TouchButton>

              <Dropdown>
                <Dropdown.Trigger asChild>
                  <div className="p-[12px] rounded-[6px]" aria-label="more button">
                    <Icon name="more" color={color.neutral95} />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                  <Dropdown.CheckedItem onClick={handleDeleteRecruit}>
                    <div className="flex items-center gap-[8px]">
                      <Icon name="delete" color="#FF5C5C" />
                      <div className="text-red-50 text-[15px] font-normal">삭제하기</div>
                    </div>
                  </Dropdown.CheckedItem>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>

          <Suspense>
            <DetailContent recruitId={recruitId} />
          </Suspense>
        </div>
        <AnimatePresence>
          {sidebarOpened ? <RightSidebar onCloseButtonClick={() => setSidebarOpened(false)} /> : null}
        </AnimatePresence>
      </div>
    </DndContextWithOverlay>
  );
}
