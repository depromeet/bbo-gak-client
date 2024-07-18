import { IconBaseType } from './type';

export function Bell({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M5.81186 8.93778C5.81186 5.52036 8.58222 2.75 11.9996 2.75C15.417 2.75 18.1874 5.52036 18.1874 8.93777V13.5184L19.8 17.8572H4.19922L5.81186 13.5184V8.93778Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M15.1673 17.8574V18.0834C15.1673 19.8323 13.7496 21.2501 12.0007 21.2501C10.2517 21.2501 8.83398 19.8323 8.83398 18.0834V17.8574"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
