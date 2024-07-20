import { IconBaseType } from './type';

export function Delete({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.62598 7.40259H19.3736L18.0473 21.25H5.95222L4.62598 7.40259Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
      <path d="M7.81177 2.75H16.1884" stroke={color} stroke-width="1.5" stroke-linecap="square" />
      <path d="M12 11.9995L12 16.6525" stroke={color} stroke-width="1.5" stroke-linecap="square" />
    </svg>
  );
}
