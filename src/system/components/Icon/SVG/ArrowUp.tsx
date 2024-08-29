import { IconBaseType } from './type';
export function ArrowUp({ size, color = '#F9F9FA' }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M5.5 11.5L12 5M12 5L18.5 11.5M12 5V20.5" stroke={color} stroke-width="1.5" />
    </svg>
  );
}
