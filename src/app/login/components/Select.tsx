import { easeIn, motion } from 'framer-motion';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { cn } from '@/utils';
import { useState } from 'react';
import { useFunnelContext } from '@/system/components/Funnel/useFunnel';

export default function Select() {
  const [position, setPosition] = useState<'designer' | 'developer' | ''>('');
  const { setStep } = useFunnelContext();

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 150,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -150,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-552 h-604 p-68 pt-116 flex flex-col justify-center gap-56 rounded-30 shadow-login bg-[white]">
      <div className="flex flex-col items-center gap-16">
        <h1 className="text-36 font-bold">환영해요 조혜원님!</h1>

        <p className="text-center text-neutral-70 trackiing-[0.091px]">
          취업 준비 중인 직군을 선택해주시면 <br />
          직군에 맞는 키워드 태그를 제공해드려요
        </p>
      </div>

      <div>
        <div className="flex gap-28">
          <TouchButton
            onClick={() => setPosition('developer')}
            className={cn(
              'relative flex flex-col justify-center items-center gap-16 w-190 h-212 hover:bg-neutral-1 transition-all rounded-18',
              position === 'developer' && 'bg-neutral-1',
            )}>
            <Icon name="codingSignUp" size={120} />
            <p className="font-bold text-20 tracking-[-0.24px]">개발자</p>
          </TouchButton>

          <TouchButton
            onClick={() => setPosition('designer')}
            className={cn(
              'relative flex flex-col justify-center items-center gap-16 w-190 h-212 hover:bg-neutral-1 transition-all rounded-18',
              position === 'designer' && 'bg-neutral-1',
            )}>
            <Icon name="designSignUp" size={120} />
            <p className="font-bold text-20 tracking-[-0.24px]">디자이너</p>
          </TouchButton>
        </div>
      </div>

      <TouchButton
        disabled={position === ''}
        className={cn(
          'bg-neutral-5 rounded-6 py-13 h-48 px-20 w-full text-15 font-semibold text-neutral-30 transition-all',
          position !== '' && 'text-white bg-[black]',
        )}
        onClick={() => {
          setStep('aaa');
        }}>
        선택 완료
      </TouchButton>
    </motion.section>
  );
}
