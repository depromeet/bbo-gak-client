import React from 'react';
import { IconBaseType } from './type';

export function Downloads({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M4.16406 12.3333V15.6666H15.8307V12.3333" stroke={color} strokeWidth="1.25" />
      <path
        d="M10 2.33325V10.6666M10 10.6666L13.75 6.91659M10 10.6666L6.25 6.91659"
        stroke={color}
        strokeWidth="1.25"
      />
    </svg>
  );
}
