import { IconBaseType } from './type';

export function Shoes({ size, color }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.97279 4.33203L11.5554 7.64181L15.9443 7.11639L17.9928 14.1779L22.6934 17.9819V22.6444L15.0635 22.637L2.12699 10.6882L7.97279 4.33203Z"
        fill="#2DC98E"
      />
      <path d="M23.3262 24.147V21H16L3.17285 8L0.673275 11.3722L14.476 24.147H23.3262Z" fill="#186D50" />
      <path d="M14.0654 10.1581H16.834L16.4031 8.66992H14.0654V10.1581Z" fill="#A2F1D6" />
      <path d="M14.5388 12.4198L17.4902 12.4483L17.0578 10.9316H14.5388V12.4198Z" fill="#A2F1D6" />
      <path
        d="M7.98135 4.3321L11.6729 0L17.0215 5.67573L15.9496 7.1255L11.564 7.64188L7.98135 4.3321Z"
        fill="#A2F1D6"
      />
    </svg>
  );
}
