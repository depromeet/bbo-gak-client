import { IconBaseType } from './type';

export function X({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke={color} stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M6 6L18 18" stroke={color} stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
    </svg>
  );
}
