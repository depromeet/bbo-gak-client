import { IconBaseType } from './type';

export function Division({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" stroke={color} stroke-width="1.5" />
      <rect x="8" y="3" width="1.5" height="18" fill={color} />
    </svg>
  );
}
