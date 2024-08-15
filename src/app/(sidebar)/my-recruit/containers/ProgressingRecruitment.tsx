import { Spacing } from '@/components/Spacing';
import { ShoeIcon } from './components/ShoeIcon';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { motion } from 'framer-motion';
import { color } from '@/system/token/color';
import { cardList } from '../mock';
import { BoxCard } from './components/Card/BoxCard';
import { TouchButton } from '@/components/TouchButton';

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

      <div className="flex gap-[16px]">
        {cardList.map((cardInfo) => (
          <BoxCard key={`${cardInfo.period}-${cardInfo.title}`} {...cardInfo} />
        ))}
      </div>

      <Spacing size={32} />
      <div className="flex justify-center">
        <TouchButton className="px-12 py-8 bg-neutral-5 rounded-[6px] text-caption1 text-neutral-50">
          더보기
        </TouchButton>
        <TouchButton className="px-12 py-8 bg-neutral-5 rounded-[6px] text-caption1 text-neutral-50">
          간략히 보기
        </TouchButton>
      </div>
    </>
  );
}
