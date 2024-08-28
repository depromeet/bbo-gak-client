import { IconBaseType } from './type';

export function Add({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_3051_19736"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}>
        <rect width={size} height={size} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3051_19736)">
        <path d="M9.99967 3.3335V16.6668M16.6663 10.0002H3.33301" stroke={color} stroke-width="1.5" />
      </g>
    </svg>
  );
}
