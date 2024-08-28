'use client';

import { InfoType } from '@/types/info';
import { useGetInfoCardList } from '../apis/useGetInfoCardList';
import { InfoCard } from '@/components/InfoCard';

interface InfoCardListProps {
  cardType: InfoType;
}

export function InfoCardList({ cardType }: InfoCardListProps) {
  const { data: infoCardList } = useGetInfoCardList(cardType);

  return (
    <section>
      {infoCardList?.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(343px,1fr))] gap-[16px]">
          {infoCardList?.map((info) => (
            <li key={info.id} className="min-w-[343px]">
              <InfoCard {...info} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-50 text-center text-body1 text-neutral-30">아직 생성된 정보 카드가 없어요!</div>
      )}
    </section>
  );
}
