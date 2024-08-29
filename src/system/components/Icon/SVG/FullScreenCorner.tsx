import { IconBaseType } from './type';

export function FullScreenCorner({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 9V4H11" stroke={color} strokeWidth="1.25" />
      <path d="M15.834 4.16615L9.5577 10.4424" stroke={color} strokeWidth="1.25" />
      <path d="M8 5.5H4.00011L4.00034 16H14.5V12" stroke={color} strokeWidth="1.25" />
    </svg>
  );
}
