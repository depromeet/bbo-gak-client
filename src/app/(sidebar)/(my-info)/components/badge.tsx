// ISSUE: 공통 컴포넌트로 하기 위해 system 폴더에 위치시켰는데, tailwind 스타일이 먹지 않는 이슈 발생. 원인은 아직 못찾음
// system 폴더가 아닌 현재 폴더에 위치시키면 문제가 발생하지 않음
import { cn } from '@/utils/cn';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'blue' | 'purple';
}

// TODO: cva 사용 로직으로 변경
const variantStyle = {
  default: 'bg-neutral-5 text-neutral-75',
  blue: 'bg-blue-bg-1 text-blue-text-1',
  purple: 'bg-purple-bg-1 text-purple-text-1',
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn('whitespace-nowrap px-[8px] py-[3px] rounded-[4px] text-[14px]', variantStyle[variant])}>
      {label}
    </span>
  );
}
