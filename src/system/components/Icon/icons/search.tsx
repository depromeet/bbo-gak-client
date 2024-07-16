import { IconBaseType } from './type';

export function Search({ size, color }: IconBaseType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none">
      <circle
        cx="10.9985"
        cy="10.7888"
        r="8.03854"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
      <path
        d="M16.4873 16.7084L21.0408 21.25"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  );
}
