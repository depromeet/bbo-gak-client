import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function Link({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M4.33938 5.64482L3.29428 6.48196C1.8513 7.63779 1.61852 9.74456 2.77436 11.1875C3.9302 12.6305 6.03696 12.8633 7.47994 11.7075L8.52504 10.8703"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path d="M5.91075 8.67489L10.0912 5.32637" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path
        d="M11.6587 8.35859C11.6587 8.35859 12.7038 7.52146 12.7038 7.52146C14.1468 6.36562 14.3795 4.25886 13.2237 2.81588C12.0679 1.37289 9.96109 1.14012 8.51811 2.29596C8.51811 2.29596 7.473 3.13309 7.473 3.13309"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}
