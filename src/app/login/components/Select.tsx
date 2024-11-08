import { motion } from 'framer-motion';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { cn } from '@/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePutUserJob } from '../api/usePutUserJob';

const jobMapper = {
  developer: '개발자',
  designer: '디자이너',
} as const;

export default function Select() {
  const [position, setPosition] = useState<'designer' | 'developer' | ''>('');
  const { push } = useRouter();
  const { mutateAsync } = usePutUserJob();

  const handleSubmit = async () => {
    if (position === '') return;

    await mutateAsync(jobMapper[position]);
    push('/');
  };

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
        opacity: [1, 0.9, 0],
        y: [0, 30, -500],
        transition: {
          duration: 0.6,
          times: [0, 0.4, 1],
        },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-552 h-604 p-68 pt-116 flex flex-col justify-center gap-56 rounded-30 bg-[white]">
      <div className="flex flex-col items-center gap-16">
        <h1 className="text-36 font-bold">환영해요 {'뽀각러'}님!</h1>

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
              'relative flex flex-col justify-center items-center gap-16 w-190 h-212 hover:bg-neutral-1 transition-all rounded-18 border-1 border-transparent',
              position === 'developer' && 'bg-[#EEF9F5] border-[#2DC98E] hover:bg-bg-[#EEF9F5]',
            )}>
            <Icon name="codingSignUp" size={120} />
            <p className="font-bold text-20 tracking-[-0.24px]">개발자</p>
          </TouchButton>

          <TouchButton
            onClick={() => setPosition('designer')}
            className={cn(
              'relative flex flex-col justify-center items-center gap-16 w-190 h-212 hover:bg-neutral-1 transition-all rounded-18 border-1 border-transparent',
              position === 'designer' && 'bg-[#EEF9F5] border-[#2DC98E] hover:bg-bg-[#EEF9F5]',
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
        onClick={handleSubmit}>
        선택 완료
      </TouchButton>
    </motion.section>
  );
}
