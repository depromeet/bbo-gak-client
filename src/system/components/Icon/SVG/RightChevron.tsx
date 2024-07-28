import type { IconBaseType } from './type';

export function RightChevron({ color, size }: IconBaseType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none">
      <path
        d="M16 10L12 14L8 10"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  );
}
