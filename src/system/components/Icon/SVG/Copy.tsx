import { IconBaseType } from '@/system/components/Icon/SVG/type';

export default function Copy({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.49891 3.87463H0.716797V15.7099H10.6342V13.0002H4.49891V3.87463Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7138 3.98715V1.15881L14.4268 3.98715H11.7138ZM11.8461 8.13558H10.3482V9.63472H9.4378V8.13558H7.93805V7.22517H9.4378V5.72603H10.3482V7.22517H11.8461V8.13558ZM12.0112 0.290283H5.36523V12.1256H15.2826V3.70128L12.0112 0.290283Z"
        fill={color}
      />
    </svg>
  );
}
