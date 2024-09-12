import { InfoCard } from '@/components/InfoCard';
import { useDndContext } from '@/lib/dnd-kit/dnd-kit';
import { If } from '@/system/utils/If';
import { ComponentProps } from 'react';

export function DraggableInfoCard(props: ComponentProps<typeof InfoCard>) {
  const { over } = useDndContext();

  const title = over?.data.current?.title;
  const overTitle = title?.length > 12 ? `${title.slice(0, 12)}...` : title;

  return (
    <div className="relative">
      <If condition={overTitle != null}>
        <div className="absolute top-0 left-[50%] translate-y-[calc(-100%-8px)] translate-x-[-50%] px-[10px] py-[4px] bg-[rgba(112,115,124,0.85)] text-[white] text-label1 font-semibold rounded-[6px] whitespace-pre">
          {`내 공고 '${overTitle}' 폴더로 복사 중`}
        </div>
      </If>
      <InfoCard {...props} />
    </div>
  );
}
