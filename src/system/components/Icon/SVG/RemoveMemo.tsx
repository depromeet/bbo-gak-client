import { IconBaseType } from './type';

export function RemoveMemo({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} rx="4" fill={color} fillOpacity="0.8" />
      <path d="M16.5 7.5L7.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M7.5 7.5L16.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
