'use client';

import { Button } from '@/system/components';
import { Dialog, DialogClose, DialogContent } from '@/system/components/Dialog/Dialog';
import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'never-show-shutter';

export function ShutterDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNeverShowAgain = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(localStorage.getItem(LOCAL_STORAGE_KEY) !== 'true');
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-460 text-center p-32"
        hasClose={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}>
        <h1 className="mb-8 text-heading1 font-bold">뽀각 서비스가 종료됩니다.</h1>
        <p className="mb-36 text-body2 font-regular text-neutral-50 leading-[175%]">
          안녕하세요. 뽀각팀입니다. 지난 9월 뽀각이 오픈한 이후로 뽀각을 이용해주신 모든 분들께 감사 드립니다.
          <br />
          <br />
          아쉽게도 <span className="text-neutral-70 font-bold">24년 11월 22일</span> 이후로 뽀각 서비스를 종료합니다.
          <br />
          22일 이후 모든 데이터가 삭제될 예정이니 기간안에 중요한 정보는 모두 백업하시는 것을 추천드립니다.
          <br />
          <br /> 아쉽게 서비스는 종료하지만 뽀각팀은 여러분의 행운의 취뽀를 언제까지나 응원합니다. 뽀각을 이용해주셔
          진심으로 감사드립니다.
        </p>
        <div className="flex gap-16">
          <Button
            className="w-full py-14 border bg-neutral-1 rounded-6 text-label1 font-semibold text-neutral-50"
            onClick={handleNeverShowAgain}>
            다시 보지 않기
          </Button>
          <DialogClose asChild>
            <Button className="w-full py-14 bg-black rounded-6 text-white text-label1 font-semibold">닫기</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
