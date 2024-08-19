import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Close({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M18 6L6 18" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}