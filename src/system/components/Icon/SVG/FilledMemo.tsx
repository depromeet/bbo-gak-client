import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function FilledMemo({ size }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.00781 2.00781H21.9922V15L15 22L2.00781 21.9922V2.00781Z" fill="#A2F1D6" />
      <path d="M22 15L15 22V15H22Z" fill="#20E79D" />
      <rect x="4" y="5" width="16" height="2" fill="#20E79D" />
      <rect x="4" y="9.19995" width="12" height="2" fill="#20E79D" />
      <rect x="4" y="13.3999" width="7" height="2" fill="#20E79D" />
    </svg>
  );
}
