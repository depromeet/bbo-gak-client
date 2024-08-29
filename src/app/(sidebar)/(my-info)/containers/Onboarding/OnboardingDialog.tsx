import { Dialog, DialogContent } from '@/system/components/Dialog/Dialog';
import { Logo } from './Logo';
import { Spacing } from '@/system/utils/Spacing';
import { AnimateSlide } from '@/system/utils/AnimateSlide/AnimateSlide';
import { TouchButton } from '@/components/TouchButton';
import { useEffect, useState } from 'react';
import { If } from '@/system/utils/If';
import { cn } from '@/utils';
import { motion, useAnimationControls } from 'framer-motion';
import { color } from '@/system/token/color';
import { LogoLeaf } from './LogoLeaf';
import { Icon } from '@/system/components';

const MAX_INDEX = 3;

interface OnboardingDialogProps {
  onClose?: () => void;
}

export function OnboardingDialog({}: OnboardingDialogProps) {
  const [step, setStep] = useState<'text' | 'card' | 'finish'>('text');
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();

  const onNextClick = () => {
    if (currentIndex < MAX_INDEX) {
      setCurrentIndex(currentIndex + 1);
      return;
    }
    setStep('card');
  };

  useEffect(() => {
    if (step === 'card') {
      const interval = setInterval(() => controls.start('wiggle'), 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStep('finish');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <Dialog open>
      <DialogContent className="p-0 w-auto max-w-[auto]">
        <motion.div
          variants={{
            text: {},
            // wiggle: { x: [-2, 2, -2, 2] },
            card: { width: 260, height: 440, transition: { delay: 0.2 } },
            finish: { width: 260, height: 440, transition: { delay: 0.2 } },
          }}
          animate={step}
          className="relative flex flex-col items-center p-[24px]">
          <Spacing size={8} />
          <button
            className="outline-none p-[8px] text-label1 text-neutral-50 font-bold self-end"
            onClick={() => setStep('card')}>
            SKIP
          </button>
          <Logo />
          <Spacing size={12} />
          <AnimateSlide height={64} currentIndex={currentIndex}>
            <AnimateSlide.Item>
              <span className="text-neutral-95 text-title3 font-bold">떠오른 아이디어, 간단히 적어두려면?</span>
              <span className="inline-block pt-[8px] text-neutral-60 text-body1 font-regular">
                경험 정리, 자소서, 면접으로 나뉜 공고 단계에 맞는 정보를 빠르게 찾을 수 있어요
              </span>
            </AnimateSlide.Item>
            <AnimateSlide.Item>
              <span className="text-neutral-95 text-title3 font-bold">
                작성해둔 정보들을 내 공고 폴더로 빠르게 복사
              </span>
              <span className="inline-block pt-[8px] text-neutral-60 text-body1 font-regular">
                내용을 복붙하는 번거로움 없이 스플릿뷰에서 드래그만 하세요
              </span>
            </AnimateSlide.Item>
            <AnimateSlide.Item>
              <span className="text-neutral-95 text-title3 font-bold">편리한 작성을 돕는 윈도우 모달</span>
              <span className="inline-block pt-[8px] text-neutral-60 text-body1 font-regular">
                이전에 작성한 정보와 비교하거나, 참고해 새로운 정보를 작성할때 이용해보세요
              </span>
            </AnimateSlide.Item>
            <AnimateSlide.Item>
              <span className="text-neutral-95 text-title3 font-bold">떠오른 아이디어, 간단히 적어두려면?</span>
              <span className="inline-block pt-[8px] text-neutral-60 text-body1 font-regular">
                새로 글을 작성할 필요없이 메모추가로 정리 가능! 메모들만 모아볼수도 있어요
              </span>
            </AnimateSlide.Item>
          </AnimateSlide>

          <Spacing size={39} />
          <div style={{ width: 552, height: 360 }}></div>
          <Spacing size={18} />
          <div className="flex gap-[6px]">
            <div className={cn(currentIndex === 0 ? 'bg-mint-40' : 'bg-neutral-5', 'w-5 h-5')} />
            <div className={cn(currentIndex === 1 ? 'bg-mint-40' : 'bg-neutral-5', 'w-5 h-5')} />
            <div className={cn(currentIndex === 2 ? 'bg-mint-40' : 'bg-neutral-5', 'w-5 h-5')} />
            <div className={cn(currentIndex === 3 ? 'bg-mint-40' : 'bg-neutral-5', 'w-5 h-5')} />
          </div>
          <Spacing size={42} />
          <div className="flex justify-between items-center w-full">
            <If condition={currentIndex !== 0}>
              <TouchButton
                className="p-[8px] text-label1 font-bold text-neutral-95"
                onClick={() => setCurrentIndex(currentIndex - 1)}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  뒤로
                </motion.div>
              </TouchButton>
            </If>
            <span />
            <TouchButton layout className="font-semibold text-label1 text-white" onClick={onNextClick}>
              <motion.div
                variants={{
                  finish: { backgroundColor: color.mint40 },
                  next: { backgroundColor: color.neutral95 },
                }}
                transition={{ duration: 0.1 }}
                animate={currentIndex === MAX_INDEX ? 'finish' : 'next'}
                className="px-[16px] py-[8px] rounded-[6px]">
                {currentIndex === MAX_INDEX ? '뽀각 시작하기' : '다음'}
              </motion.div>
            </TouchButton>
          </div>
        </motion.div>
        <If condition={step !== 'text'}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bg-white top-0 left-0 w-full h-full rounded-[24px]"
          />
        </If>
        <If condition={step === 'finish'}>
          <div className="absolute left-[50%] translate-x-[-50%] bottom-[-84px]">
            <TouchButton>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="px-[20px] py-[13px] flex items-center gap-[6px] text-white bg-neutral-95 rounded-[6px] text-bold2 font-semibold whitespace-pre">
                <LogoLeaf />
                <span className="flex items-center">
                  행운의 취뽀 부적 다운받기
                  <Icon name="download" />
                </span>
                <LogoLeaf />
              </motion.div>
            </TouchButton>
          </div>
        </If>
      </DialogContent>
    </Dialog>
  );
}
