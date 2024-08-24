'use client';

import { Icon } from '@/system/components';
import { InfoCardList } from './components/InfoCardList';

export default function MyInfo() {
  return (
    <div className="max-w-[1700px] py-[64px] px-[80px] mx-auto bg-neutral-1">
      <div className="mb-[72px] flex justify-between">
        <h1 className="text-[28px] font-bold">내 정보</h1>
        <button className="flex gap-[24px] p-[16px] border rounded-[8px] border-neutral-5 bg-white">
          <div className="text-[16px] font-semibold">김뽀각님의 기본정보</div>
          <Icon name="down" color="#878A93" />
        </button>
      </div>
      <InfoCardList />
    </div>
  );
}
