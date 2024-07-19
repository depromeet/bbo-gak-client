import { IconBaseType } from './type';

export function ProfileFill({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5193 19.3911C18.5033 16.1781 15.7733 14.3371 12.0263 14.3371H11.9993C8.2423 14.3161 5.4983 16.1701 4.4803 19.3911L4.3623 19.7651L4.6963 19.9691C6.6543 21.1631 9.0963 21.7681 11.9523 21.7681C11.9843 21.7681 12.0163 21.7681 12.0473 21.7681C14.9433 21.7681 17.3173 21.1791 19.3033 19.9691L19.6373 19.7651L19.5193 19.3911Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9998 12.1089C14.7228 12.1089 16.9388 9.89393 16.9388 7.17093C16.9388 4.44693 14.7228 2.23193 11.9998 2.23193C9.27683 2.23193 7.06183 4.44693 7.06183 7.17093C7.06183 9.89393 9.27683 12.1089 11.9998 12.1089Z"
        fill={color}
      />
    </svg>
  );
}
