'use client';

import { Icon } from '@/system/components';
import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/system/utils/Spacing';
import { ProgressingRecruitment } from './containers/ProgressingRecruitment/ProgressingRecruitment';
import { AllRecruitment } from './containers/AllRecruitment/AllRecruitment';
import { useState } from 'react';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { NewRecruitDialogContent } from './components/NewRecruitDialogContent/NewRecruitDialogContent';
import { RightSidebar } from './containers/RightSidebar/RightSidebar';
import { DndContextWithOverlay, DragEndEvent } from '@/lib/dnd-kit/dnd-kit';
import { InfoCard } from '@/components/InfoCard';
import { AnimatePresence } from 'framer-motion';
import { usePostRecruit } from './api/usePostRecruit';
import { CardData } from './components/NewRecruitDialogContent/NewRecruitDialogContent';
import { cn } from '@/utils';
import { color } from '@/system/token/color';
import { usePostCardToRecruit } from './api/usePostCardToRecruit';

export default function MyRecruit() {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const { mutate: mutatePostCard } = usePostRecruit();
  const { mutate: mutatePostCardToRecruit } = usePostCardToRecruit();
  const onCreateNewRecruitCard = (data: CardData) => mutatePostCard(data);

  const onDragEnd = ({ over, active }: DragEndEvent) => {
    if (over == null || active == null || typeof over.id !== 'number' || typeof active.id !== 'number') {
      return;
    }
    mutatePostCardToRecruit({ recruitId: over.id, cardId: active.id });
  };

  return (
    <DndContextWithOverlay OverlayElement={InfoCard} onDragEnd={onDragEnd}>
      <Dialog>
        <div className="flex max-h-[100vh] overflow-auto">
          <div className="flex-1 max-w-[1700px] py-[64px] px-[80px] mx-auto">
            <div className="flex justify-between">
              <h1 className="text-title2 font-bold">내 공고 뽀각</h1>
              <div className="flex gap-[16px]">
                <TouchButton
                  disabled={sidebarOpened}
                  className="bg-white flex items-center gap-[4px] py-[8px] px-[12px] rounded-[6px] border-neutral-5 border-[1px]"
                  onClick={() => setSidebarOpened(!sidebarOpened)}>
                  <Icon name="copy" size={16} color={sidebarOpened ? color.neutral20 : color.neutral95} />
                  <span
                    className={
                      'text-label1 ' + cn('font-semibold', sidebarOpened ? 'text-neutral-20' : 'text-neutral-95')
                    }>
                    내 정보 가져오기
                  </span>
                </TouchButton>
                <Dialog.Trigger asChild>
                  <div>
                    <TouchButton className="bg-neutral-95 flex items-center gap-[4px] py-[8px] px-[16px] rounded-[6px]">
                      <Icon name="add" size={24} color="#20E79D" />
                      <span className="text-label1 text-white font-semibold">새 공고</span>
                    </TouchButton>
                  </div>
                </Dialog.Trigger>
              </div>
            </div>
            <Spacing size={54} />
            <ProgressingRecruitment />
            <AllRecruitment />
          </div>

          <AnimatePresence>
            {sidebarOpened ? <RightSidebar onCloseButtonClick={() => setSidebarOpened(false)} /> : null}
          </AnimatePresence>
        </div>

        <Dialog.Content className="w-400">
          <NewRecruitDialogContent onSubmit={onCreateNewRecruitCard} />
        </Dialog.Content>
      </Dialog>
    </DndContextWithOverlay>
  );
}
