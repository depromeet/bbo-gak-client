'use client';

import { Icon } from '@/system/components';
import { TouchButton } from '@/components/TouchButton';
import { Spacing } from '@/system/utils/Spacing';
import { ProgressingRecruitment } from './containers/ProgressingRecruitment';
import { AllRecruitment } from './containers/AllRecruitment';
import { useState } from 'react';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { NewRecruitDialogContent } from './components/NewRecruitDialogContent/NewRecruitDialogContent';
import { RightSidebar } from './containers/RightSidebar';
import { DndContextWithOverlay } from '@/lib/dnd-kit/dnd-kit';
import { InfoCard } from '@/components/InfoCard';
import { AnimatePresence } from 'framer-motion';

export default function MyRecruit() {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <DndContextWithOverlay OverlayElement={InfoCard}>
      <Dialog>
        <div className="flex">
          <div className="flex-1 max-w-[1700px] py-[64px] px-[80px] mx-auto">
            <div className="flex justify-between">
              <h1 className="text-title2 font-bold">내 공고 뽀각</h1>
              <div className="flex gap-[16px]">
                <TouchButton
                  className="bg-white flex gap-[4px] py-[8px] px-[12px] rounded-[6px]"
                  onClick={() => setSidebarOpened(!sidebarOpened)}>
                  <Icon name="copy" size={16} color="#CCCDD1" />
                  <span className="text-label1 font-semibold text-neutral-20">내 정보 가져오기</span>
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
            <Spacing size={88} />
            <AllRecruitment />
          </div>
          <AnimatePresence>
            {sidebarOpened ? <RightSidebar onCloseButtonClick={() => setSidebarOpened(false)} /> : null}
          </AnimatePresence>
        </div>
        <Dialog.Content className="w-400">
          <NewRecruitDialogContent />
        </Dialog.Content>
      </Dialog>
    </DndContextWithOverlay>
  );
}
