import type { SVGProps } from 'react';
import type { IconBaseType } from './type';

export function Remove<T extends SVGSVGElement>({ size, color, onClick, ...props }: IconBaseType & SVGProps<T>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      {...props}>
      <path d="M11 5L5 11" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 5L11 11" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
