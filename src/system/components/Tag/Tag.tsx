import { cn } from '@/utils/tailwind-util';
import { PropsWithChildren } from 'react';

export interface TagProps {
  color?: 'default' | 'blue' | 'purple';
}

// TODO: cva 사용 로직으로 변경
const colorStyle = {
  default: 'bg-neutral-5 text-neutral-75',
  blue: 'bg-blue-bg-1 text-blue-text-1',
  purple: 'bg-purple-bg-1 text-purple-text-1',
};

export function Tag({ color = 'default', children }: PropsWithChildren<TagProps>) {
  return (
    <span className={cn('whitespace-nowrap px-[8px] py-[3px] rounded-[4px] text-[14px]', colorStyle[color])}>
      {children}
    </span>
  );
}
