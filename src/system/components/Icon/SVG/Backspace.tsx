import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Backspace({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 5L8.5 12L15.5 19" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
