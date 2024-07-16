import { IconBaseType } from './type';

export function Profile({ size, color }: IconBaseType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3857 7.16973C16.3857 9.61122 14.4061 11.5895 11.966 11.5895C9.52447 11.5895 7.54492 9.61122 7.54492 7.16973C7.54492 4.72824 9.52447 2.75 11.966 2.75C14.4061 2.75 16.3857 4.72824 16.3857 7.16973Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
      <path
        d="M11.9999 14.8189C15.2563 14.8106 18.0251 16.3057 19.0428 19.5242C16.9914 20.7748 14.5768 21.2564 11.9999 21.2501C9.42304 21.2564 7.0084 20.7748 4.95703 19.5242C5.97593 16.3022 8.74006 14.8105 11.9999 14.8189Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  );
}
