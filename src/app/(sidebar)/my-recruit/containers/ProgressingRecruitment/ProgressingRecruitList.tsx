import { BoxCard, MIN_CARD_WIDTH } from '@/app/(sidebar)/my-recruit/containers/components/Card/BoxCard';
import { useGetProgressingRecruits } from '@/app/(sidebar)/my-recruit/api/useGetProgressingRecruits';
import { Dialog } from '@/system/components/Dialog/ShadcnDialog';
import { motion } from 'framer-motion';
import { color } from '@/system/token/color';
import { Spacing } from '@/system/utils/Spacing';
import { TouchButton } from '@/components/TouchButton';
import { useState } from 'react';
import { If } from '@/system/utils/If';
import { SwitchCase } from '@/system/utils/SwitchCase';
import { usePatchRecruitStatus } from '../../api/usePatchRecruitStatus';
import { useDeleteRecruit } from '../../api/useDeleteRecruit';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { AnimateHeight } from '@/system/utils/AnimateHeight';

const 최초_노출_카드_갯수 = 1;
const CARD_GAP = 16;

export function ProgressingRecruitList() {
  const recruitCards = useGetProgressingRecruits().data;
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const { mutate: patchRecruitStatus } = usePatchRecruitStatus();
  const { mutate: deleteRecruit } = useDeleteRecruit();

  const [cardsPerRow, setCardsPerRow] = useState(최초_노출_카드_갯수);
  const resizeRef = useResizeObserver(({ contentRect }) => {
    setCardsPerRow(Math.max(1, Math.floor(contentRect.width / (MIN_CARD_WIDTH + CARD_GAP))));
  });
  const gridTemplateColumns = new Array(cardsPerRow).fill('1fr').join(' ');

  const recruitCardForShow = shouldShowMore ? recruitCards : recruitCards.slice(0, cardsPerRow);
  const hasButton = recruitCards.length > cardsPerRow;

  return (
    <>
      <SwitchCase
        value={recruitCards.length === 0 ? 'empty' : 'present'}
        caseBy={{
          empty: (
            <Dialog.Trigger asChild>
              <motion.button
                initial="initial"
                whileHover="hover"
                variants={{ initial: { backgroundColor: 'transparent' }, hover: { backgroundColor: color.neutral5 } }}
                className="w-250 h-150 flex justify-center items-center rounded-[12px] border-neutral-30 border-dashed border-[1px]">
                <span className="text-neutral-30 text-label1">진행중인 공고가 없어요</span>
              </motion.button>
            </Dialog.Trigger>
          ),
          present: (
            <>
              <AnimateHeight>
                <div ref={resizeRef} className="grid flex-wrap" style={{ gridTemplateColumns, gap: CARD_GAP }}>
                  {recruitCardForShow.map((cardInfo) => (
                    <BoxCard
                      key={`${cardInfo.season}-${cardInfo.title}`}
                      {...cardInfo}
                      onDuedateAppend={() => {}}
                      onRecruitDelete={deleteRecruit}
                      onRecruitStatusChange={(id, status) => {
                        patchRecruitStatus({ id, recruitStatus: status });
                      }}
                    />
                  ))}
                </div>
              </AnimateHeight>
              <Spacing size={32} />
              <If condition={hasButton}>
                <div className="flex justify-center">
                  <SwitchCase
                    value={shouldShowMore ? 'collapse' : 'expand'}
                    caseBy={{
                      expand: (
                        <TouchButton
                          onClick={() => setShouldShowMore(true)}
                          className="px-12 py-8 bg-neutral-5 rounded-[6px] text-caption1 text-neutral-50">
                          더보기
                        </TouchButton>
                      ),
                      collapse: (
                        <TouchButton
                          onClick={() => setShouldShowMore(false)}
                          className="px-12 py-8 bg-neutral-5 rounded-[6px] text-caption1 text-neutral-50">
                          간략히 보기
                        </TouchButton>
                      ),
                    }}
                  />
                </div>
              </If>
            </>
          ),
        }}
      />
      <Spacing size={hasButton ? 32 : 88} />
    </>
  );
}
