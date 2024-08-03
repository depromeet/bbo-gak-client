import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Calendar({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M3.13477 7.99923H16.8741" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M13.4238 11.0095H13.4309" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M10.0039 11.0097H10.011" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M6.57614 11.0097H6.58328" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M13.4238 14.0053H13.4309" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M10.0039 14.0056H10.011" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M6.57614 14.0056H6.58328" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
      <path d="M13.1168 2.29175V4.8284" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M6.89026 2.29175V4.8284" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9375 3.50879H3.0625V17.7082H16.9375V3.50879Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}
