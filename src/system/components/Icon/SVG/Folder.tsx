import type { IconBaseType } from './type';

export function Folder({ size, color }: IconBaseType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none">
      <path
        d="M12 17.2265V14.6895"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.2449 5.87988V12.3799C18.7849 13.8199 15.5349 14.6899 11.9949 14.6899C8.45488 14.6899 5.21488 13.8199 2.75488 12.3799V5.87988H21.2449Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M15.5 5.61115L14.5001 3.2998H9.5001L8.5 5.61115"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M2.7793 15.1932L2.9683 20.7002H21.0313L21.2203 15.1932"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
