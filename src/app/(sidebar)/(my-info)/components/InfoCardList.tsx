'use client';

import { InfoType } from '@/types/info';
import { useGetInfoCardList } from '../apis/useGetInfoCardList';
import { InfoCard } from '@/components/InfoCard';
import { Icon } from '@/system/components';
import { If } from '@/system/utils/If';

interface InfoCardListProps {
  cardType: InfoType;
}

export function InfoCardList({ cardType }: InfoCardListProps) {
  const { data: infoCardList } = useGetInfoCardList(cardType);

  return (
    <section>
      <If condition={!!infoCardList.length}>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
          {infoCardList.map((info) => (
            <li key={info.id} className="min-w-[343px]">
              <InfoCard {...info} />
            </li>
          ))}
        </ul>
      </If>
      <If condition={!infoCardList.length}>
        <div className="flex flex-col h-[calc(100vh-400px)] items-center justify-center gap-16">
          <Icon name="empty" size={280} />
          <p className="text-center text-body1 text-neutral-30">아직 생성된 정보 카드가 없어요!</p>
        </div>
      </If>
    </section>
  );
}
