'use client';

import { Icon } from '@/system/components';
import { RocketIcon } from './components/RocketIcon';
import { Spacing } from '@/components/Spacing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/system/components/DropdownMenu/DropdownMenu';

export function All() {
  return (
    <>
      <DropdownMenu>
        <button className="flex gap-[8px] outline-none">
          <RocketIcon />
          <DropdownMenuTrigger asChild>
            <div className="flex gap-[8px]">
              <span className="text-heading2 font-semibold">모든 공고</span>
              <Icon name="up" size={24} color="#1B1C1E" />
            </div>
          </DropdownMenuTrigger>
        </button>
        <DropdownMenuContent className="min-w-175">
          <DropdownMenuItem className="flex justify-between items-center">
            <span className="text-label1 text-neutral-30">모든 공고</span>
            <Icon name="check" size={16} color="#AEB0B6" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Spacing size={24} />
      <div className="w-full h-70 flex justify-center items-center rounded-[12px] border-neutral-30 border-dashed border-[1px]">
        <span className="text-neutral-30 text-label1">등록된 공고가 없어요</span>
      </div>
    </>
  );
}
