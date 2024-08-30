'use client';

import { Icon } from '@/system/components';
import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/system/utils/Spacing';
import { ProgressingRecruitment } from './containers/ProgressingRecruitment/ProgressingRecruitment';
import { AllRecruitment } from './containers/AllRecruitment/AllRecruitment';
import { useRef, useState } from 'react';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { NewRecruitDialogContent } from './components/NewRecruitDialogContent/NewRecruitDialogContent';
import { RightSidebar } from './containers/RightSidebar/RightSidebar';
import { DndContextWithOverlay, DragEndEvent } from '@/lib/dnd-kit/dnd-kit';
import { AnimatePresence, motion } from 'framer-motion';
import { usePostRecruit } from './api/usePostRecruit';
import { CardData } from './components/NewRecruitDialogContent/NewRecruitDialogContent';
import { cn } from '@/utils';
import { color } from '@/system/token/color';
import { usePostCardToRecruit } from './api/usePostCardToRecruit';
import { useScroll } from '@/hooks/useScroll';
import { If } from '@/system/utils/If';
import { fontSize } from '@/system/token/typography';
import { DraggableInfoCard } from '@/app/(sidebar)/my-recruit/components/DraggableInfoCard';
import { AsyncBoundaryWithQuery } from '@/lib';

const STICKY_THRESHOLD = 30;

export default function MyRecruit() {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  useScroll(headerRef, (y) => setIsSticky(y > STICKY_THRESHOLD));

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
    <DndContextWithOverlay OverlayElement={DraggableInfoCard} onDragEnd={onDragEnd}>
      <Dialog>
        <div ref={headerRef} className="flex max-h-[100vh] overflow-auto">
          <div className="flex-1 max-w-[1700px] mx-auto">
            <Spacing size={STICKY_THRESHOLD} />
            <div className="sticky top-0 z-[100] bg-neutral-1">
              <Spacing size={34} />
              <div className="flex justify-between items-center px-[80px] bg-neutral-1">
                <motion.h1
                  variants={{
                    big: { fontSize: fontSize.title2 },
                    small: { fontSize: fontSize.heading1 },
                  }}
                  animate={isSticky ? 'small' : 'big'}
                  className="text-title2 font-bold">
                  내 공고
                </motion.h1>
                <div className="flex gap-[16px]">
                  <TouchButton
                    layout
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
                      <TouchButton layout>
                        <motion.div
                          initial={{ padding: '8px 16px' }}
                          variants={{ longPadding: { padding: '8px 16px' }, shortPadding: { padding: '8px 8px' } }}
                          animate={isSticky ? 'shortPadding' : 'longPadding'}
                          className="bg-neutral-95 flex items-center gap-[4px] rounded-[6px]">
                          <Icon name="add" size={20} color="#20E79D" />
                          {!isSticky && <span className="text-label1 text-white font-semibold">새 공고</span>}
                        </motion.div>
                      </TouchButton>
                    </div>
                  </Dialog.Trigger>
                </div>
              </div>
              <Spacing size={34} />
              <If condition={isSticky}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-neutral-5 h-[1px]" />
              </If>
            </div>
            <div className="px-[80px]">
              <Spacing size={20} />
              <ProgressingRecruitment />
              <AllRecruitment />
            </div>
          </div>

          <AnimatePresence>
            {sidebarOpened ? <RightSidebar onCloseButtonClick={() => setSidebarOpened(false)} /> : null}
          </AnimatePresence>
        </div>

        <AsyncBoundaryWithQuery>
          <Dialog.Content className="w-400">
            <NewRecruitDialogContent onSubmit={onCreateNewRecruitCard} />
          </Dialog.Content>
        </AsyncBoundaryWithQuery>
      </Dialog>
    </DndContextWithOverlay>
  );
}
