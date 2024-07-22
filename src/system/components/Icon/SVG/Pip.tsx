import { IconBaseType } from './type';

export function Pip({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.9746 4.97484H19.0249V13.42V19.0252H13.4198H4.9746V4.97484Z" stroke={color} strokeWidth="1.22556" />
      <path
        d="M11.9453 11.9455H16.3052V14.6447V16.3055H14.6445H11.9453V11.9455Z"
        fill={color}
        stroke={color}
        strokeWidth="1.22556"
      />
    </svg>
  );
}
