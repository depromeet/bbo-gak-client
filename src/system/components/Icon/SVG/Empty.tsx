import { IconBaseType } from './type';

export function Empty({ size }: IconBaseType) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33 153.938L53 239L214 239L194.554 125.411L166.631 122.817L93.3333 125.411L83.3609 114H33V153.938Z"
        fill="url(#paint0_linear_3031_93259)"
      />
      <path
        d="M67.5 179L53 239.001H214L240 201.356L255 150.117L159.5 147.5L155.5 137.043L90 140.543L67.5 179Z"
        fill="#EAEBEC"
      />
      <path d="M104 183.211L152.936 179L177.853 185L204 183.211" stroke={'#989BA2'} strokeWidth="8" />
      <path d="M97 201.912L146.033 197L171 204" stroke="#989BA2" strokeWidth="8" />
      <path
        d="M210.348 57.5129L242.069 50L272.121 66.6954L269.199 99.6689L244.991 115.529L235.491 113.49L219.254 127L220.754 110.327L210.348 108.094L202 83.8082L210.348 57.5129Z"
        fill="#A2F1D6"
      />
      <path
        d="M225 72.1213L236.028 82.5128M236.028 82.5128L246.704 92.5732M236.028 82.5128L248.791 70.8691M236.028 82.5128L225 92.5732"
        stroke="#2DC98E"
        strokeWidth="6.67817"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3031_93259"
          x1="123.5"
          y1="114"
          x2="123.5"
          y2="239"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#AEB0B6" />
          <stop offset="1" stopColor="#8B8F9C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
