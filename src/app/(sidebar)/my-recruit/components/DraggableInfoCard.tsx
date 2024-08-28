import { InfoCard } from '@/components/InfoCard';
import { ComponentProps } from 'react';

export function DraggableInfoCard(props: ComponentProps<typeof InfoCard>) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-[50%] translate-y-[calc(-100%-8px)] translate-x-[-50%] px-[10px] py-[4px] bg-[rgba(112,115,124,0.85)] text-[white] text-label1 font-semibold rounded-[6px]">
        {props.title || '제목을 입력해주세요'}
      </div>
      <InfoCard {...props} />
    </div>
  );
}
