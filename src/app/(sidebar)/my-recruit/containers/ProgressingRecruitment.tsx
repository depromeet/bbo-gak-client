import { Spacing } from '@/components/Spacing';
import { ShoeIcon } from './components/ShoeIcon';
import { Dialog } from '@/system/components/Dialog/ShadnDialog';
import { motion } from 'framer-motion';
import { color } from '@/system/token/color';

export function ProgressingRecruitment() {
  return (
    <>
      <div className="flex gap-[8px]">
        <ShoeIcon />
        <span className="text-heading2 font-semibold">현재 진행중인 공고 모아보기</span>
      </div>
      <Spacing size={24} />
      <Dialog.Trigger asChild>
        <motion.button
          initial="initial"
          whileHover="hover"
          variants={{ initial: { backgroundColor: 'transparent' }, hover: { backgroundColor: color.neutral5 } }}
          className="w-250 h-150 flex justify-center items-center rounded-[12px] border-neutral-30 border-dashed border-[1px]">
          <span className="text-neutral-30 text-label1">진행중인 공고가 없어요</span>
        </motion.button>
      </Dialog.Trigger>
    </>
  );
}
