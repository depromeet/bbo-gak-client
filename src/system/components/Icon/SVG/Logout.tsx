import { IconBaseType } from './type';

export function Logout({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 11.25L22.2778 11.25L22.2778 12.75L10 12.75L10 11.25Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0583 7.66443L24.4132 12L20.0585 16.3368L19 15.274L22.2873 12.0001L19 8.72745L20.0583 7.66443Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 2L17 8.125L15.6179 8.125L15.6179 3.5L6.38207 3.5L6.38207 20.5L15.6179 20.5L15.6179 15.875L17 15.875L17 22L5 22L5 2L17 2Z"
        fill={color}
      />
    </svg>
  );
}
