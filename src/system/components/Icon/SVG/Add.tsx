import { IconBaseType } from './type';

export function Add({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_1054_1585"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}>
        <rect width={size} height={size} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1054_1585)">
        <path d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z" fill={color} />
      </g>
    </svg>
  );
}
