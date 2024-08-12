import type { IconBaseType } from './type';

export function Trash({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 6.48816H15L14.1007 15.8777H5.89929L5 6.48816Z"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      <path d="M7.15982 3.3335H12.8398" stroke={color} strokeWidth="1.25" strokeLinecap="square" />
      <path d="M10 9.60522L10 12.7603" stroke={color} strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}
