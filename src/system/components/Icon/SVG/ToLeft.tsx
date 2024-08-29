import { IconBaseType } from './type';

export function ToLeft({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3V17" stroke={color} strokeWidth="1.25" />
      <path d="M11.5 6.5L7.99969 9.99969L11.5 13.5" stroke={color} strokeWidth="1.25" />
      <path d="M8.15989 10.0003L17 9.99999" stroke={color} strokeWidth="1.25" />
    </svg>
  );
}
