import { InfoCard } from '@/components/InfoCard';
import { Draggable } from '@/lib/dnd-kit/dnd-kit';
import { useGetCards } from '../../api/useGetCards';

interface CardListProps {
  type: string;
}

export function CardList({ type }: CardListProps) {
  const cardList = useGetCards({ type }).data;

  return (
    <ul className="flex flex-col items-center gap-[8px] overflow-auto">
      {cardList.map(({ tagList, ...info }) => (
        <li key={info.id} className="w-full">
          <Draggable id={info.id} dataForOverlay={{ ...info, tagList }}>
            <InfoCard key={info.id} tagList={tagList} {...info} />
          </Draggable>
        </li>
      ))}
    </ul>
  );
}
