'use client';

import { InfoCard } from '@/components/InfoCard';
import { AsyncBoundaryWithQuery } from '@/lib';
import { DndContextWithOverlay } from '@/lib/dnd-kit/DndContextWithOverlay';
import { Dropdown, Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { cn } from '@/utils';
import { DragEndEvent } from '@dnd-kit/core';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePostCardToRecruit } from '../api/usePostCardToRecruit';
import { RightSidebar } from '../containers/RightSidebar/RightSidebar';
import { DueDateDialog } from '../containers/components/DueDateDialog';
import { useDeleteRecruit } from './api/useDeleteRecruit';
import { DetailContent } from './components/DetailContent';
import DetailHeader from './components/DetailHeader';

export default function CompanyDetail({ params: { id: recruitId } }: { params: { id: string } }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { mutate: deleteRecruit } = useDeleteRecruit();
  const { mutate: mutatePostCardToRecruit } = usePostCardToRecruit();
  const router = useRouter();

  const handleDeleteRecruit = () => {
    deleteRecruit(recruitId);
    router.push('/my-recruit');
  };

  const onDragEnd = ({ over, active }: DragEndEvent) => {
    if (over == null || active == null || typeof over.id !== 'number' || typeof active.id !== 'number') {
      return;
    }
    mutatePostCardToRecruit({ recruitId: over.id, cardId: active.id });
  };

  return (
    <AsyncBoundaryWithQuery>
      <DndContextWithOverlay OverlayElement={InfoCard} onDragEnd={onDragEnd}>
        <div className="flex overflow-hidden max-h-[100vh]">
          <div className="flex-1 mx-auto max-w-[1700px]">
            <div className="z-[-1] fixed left-0 top-0 w-full h-[100px] bg-white border-b-1 border-neutral-5 "></div>
            <div className="flex justify-between w-full px-[80px] py-[24px]">
              <DetailHeader recruitId={recruitId} />

              <div className={cn('flex items-center gap-[16px]')}>
                <Dropdown>
                  <Dropdown.Trigger asChild>
                    <div
                      className="p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10"
                      aria-label="calendarFill button">
                      <Icon name="calendarFill" size={16} color={color.neutral95} />
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Content align="end">
                    <Dropdown.CheckedItem className="gap-[8px]">
                      <DueDateDialog onDuedateAppend={() => {}} />
                    </Dropdown.CheckedItem>
                  </Dropdown.Content>
                </Dropdown>

                <button
                  onClick={() => setSidebarOpened(!sidebarOpened)}
                  className="p-[12px] rounded-[6px] hover:bg-neutral-3 border border-neutral-10 bg-white max-h-[42px]"
                  aria-label="copy button">
                  <Icon name="copy" size={16} color={color.neutral95} />
                </button>

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
            <DetailContent recruitId={recruitId} />
          </div>
          <AnimatePresence>
            {sidebarOpened ? <RightSidebar onCloseButtonClick={() => setSidebarOpened(false)} /> : null}
          </AnimatePresence>
        </div>
      </DndContextWithOverlay>
    </AsyncBoundaryWithQuery>
  );
}
