import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function SavingSuccess({ size }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="6" fill="#2DC98E" stroke="#2DC98E" strokeWidth="1.33333" />
      <path d="M7.33366 10L9.33366 12L12.667 8" stroke="white" strokeWidth="1.33333" />
    </svg>
  );
}
