import { IconBaseType } from './type';

export default function Warning({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1522 26.3305H16.9022L16.8887 24.0805H19.1522V26.3305ZM16.8992 22.15H19.1492V15.6985H16.8992V22.15ZM20.187 8.75148C19.2358 7.03582 16.7695 7.03401 15.8158 8.74827L5.79655 26.7581C4.86972 28.4241 6.07386 30.4728 7.98031 30.4735L27.9883 30.4809C29.894 30.4816 31.0997 28.4354 30.1757 26.7687L20.187 8.75148Z"
        fill={color}
      />
    </svg>
  );
}
