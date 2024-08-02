import { IconBaseType } from './type';

export function More({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_1054_878"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}>
        <rect width={size} height={size} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1054_878)">
        <rect x="10.5991" y="4.82007" width="2.80176" height="2.80176" fill={color} />
        <rect x="10.5991" y="10.5991" width="2.80176" height="2.80176" fill={color} />
        <rect x="10.5991" y="16.3782" width="2.80176" height="2.80176" fill={color} />
      </g>
    </svg>
  );
}
