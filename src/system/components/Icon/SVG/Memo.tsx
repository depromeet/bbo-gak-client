import type { IconBaseType } from './type';

export function Memo({ size, color }: IconBaseType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none">
      <path
        d="M3.93763 3.93763H20.0624V13.3384L13.3384 20.0624H3.93763V3.93763Z"
        stroke={color}
        strokeWidth="1.40651"
      />
      <path d="M12.5439 20V12.5439H20" stroke={color} strokeWidth="1.40651" />
    </svg>
  );
}
