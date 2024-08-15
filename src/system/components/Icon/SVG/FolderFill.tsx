import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function FolderFill({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.58667 10.5599H11.4133V9.55995H4.58667V10.5599ZM8.14 3.96661L6.63333 2.11328H1.5V13.8866H14.5V3.96661H8.14Z"
        fill={color}
      />
    </svg>
  );
}
