import { IconBaseType } from './type';

export function Down({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_805_23618"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <rect width="24" height="24" fill={color} />
      </mask>
      <g mask="url(#mask0_805_23618)">
        <path d="M12 15L6.5 8H17.5L12 15Z" fill={color} />
      </g>
    </svg>
  );
}
