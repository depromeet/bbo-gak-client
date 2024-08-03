import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Up({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <mask id="mask0_1494_82041" maskUnits="userSpaceOnUse" x="0" y="0" width={size} height={size}>
        <rect width={size} height={size} transform={`matrix(1 0 0 -1 0 ${size})`} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1494_82041)">
        <path
          d="M12.7863 9.00077C12.3859 8.4912 11.6141 8.4912 11.2137 9.00077L7.77114 13.3822C7.25561 14.0383 7.72303 15 8.55746 15H15.4425C16.277 15 16.7444 14.0383 16.2289 13.3822L12.7863 9.00077Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
