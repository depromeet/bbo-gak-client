import { IconBaseType } from './type';

export function SubmitArrow({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1643 16.8209L16.8332 13.4776V21.3732H15.1665V13.4776L11.8354 16.8209L10.6543 15.6443L15.9998 10.2798L21.3443 15.6443L20.1643 16.8209ZM5.1665 26.8332H26.8332V5.1665H5.1665V26.8332Z"
        fill={color}
      />
    </svg>
  );
}
