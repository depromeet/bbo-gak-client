import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Unlink({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M4.33938 5.64482L3.29428 6.48196C1.8513 7.63779 1.61852 9.74456 2.77436 11.1875C3.9302 12.6305 6.03696 12.8633 7.47994 11.7075L8.52504 10.8703"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path
        d="M11.6587 8.35859L12.7038 7.52146C14.1468 6.36562 14.3795 4.25886 13.2237 2.81588C12.0679 1.37289 9.96109 1.14012 8.51811 2.29596L7.473 3.13309"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}
