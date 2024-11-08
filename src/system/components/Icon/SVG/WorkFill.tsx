import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function WorkFill({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1471 15.8149C17.6871 16.7949 14.8771 17.3149 11.9971 17.3149C9.11709 17.3149 6.30709 16.7949 3.85709 15.8149C3.48709 15.6649 3.12709 15.5149 2.77709 15.3449C2.60709 15.2649 2.43709 15.1849 2.26709 15.0849L2.48709 21.3249H21.5171L21.7271 15.0849C21.5571 15.1849 21.3871 15.2649 21.2171 15.3449C20.8671 15.5149 20.5071 15.6649 20.1471 15.8149Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.41691 5.5048L9.99291 4.1748H14.0059L14.5819 5.5048H9.41691ZM16.2169 5.5048L14.9929 2.6748H9.00591L7.78191 5.5048H2.25391V12.7918L2.50091 12.9368C4.90291 14.3418 7.93591 15.1598 11.1199 15.2888V16.5858H12.8789V15.2888C16.0649 15.1588 19.0979 14.3408 21.4969 12.9368L21.7449 12.7918V5.5048H16.2169Z"
        fill={color}
      />
    </svg>
  );
}
