import { cn } from '@/utils/tailwind-util';
import { PropsWithChildren } from 'react';

export interface TagProps {
  color?: 'default' | 'blue' | 'purple';
}

// TODO: cva 사용 로직으로 변경
// FIXME: tailwind 커스텀 속성이 안먹혀서 색상 코드로 직접 지정함
const colorStyle = {
  default: 'bg-[#F1F2F3] text-[#37383C]',
  blue: 'bg-[#E8F1FF] text-[#418CC3]',
  purple: 'bg-[#F1E8FF] text-[#9C6BB3]',
};

export function Tag({ color = 'default', children }: PropsWithChildren<TagProps>) {
  return (
    <span className={cn('whitespace-nowrap px-[8px] py-[3px] rounded-[4px] text-[14px]', colorStyle[color])}>
      {children}
    </span>
  );
}
