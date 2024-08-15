import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Check({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M3.5 7.5L6.4 10.4008L12 4.80078" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
