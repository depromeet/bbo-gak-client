import { IconBaseType } from './type';

export function Setting({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M12 15.6875C14.0366 15.6875 15.6876 14.0365 15.6876 11.9999C15.6876 9.96335 14.0366 8.31238 12 8.31238C9.96347 8.31238 8.3125 9.96335 8.3125 11.9999C8.3125 14.0365 9.96347 15.6875 12 15.6875Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M18.8038 18.7156L18.3659 15.6753L21.2177 14.5345V9.46567L18.3669 8.32522L18.8049 5.28442L14.4152 2.75L12.0006 4.64979L9.5861 2.75L5.19636 5.28442L5.63427 8.32471L2.78223 9.46567V14.5345L5.63527 15.6759L5.19744 18.7156L9.58718 21.25L12.0006 19.3511L14.4141 21.25L18.8038 18.7156Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
