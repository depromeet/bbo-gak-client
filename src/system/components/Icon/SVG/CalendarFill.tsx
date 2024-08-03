import { IconBaseType } from '@/system/components/Icon/SVG/type';

export function CalendarFill({ size, color }: IconBaseType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.705 1.6194V0.273682H9.53137V3.83357H8.74898V1.6194H4.86048V0.273682H3.68689V3.83357H2.9045V1.6194H0.0957031V5.63308H13.9049V1.6194H10.705Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.3754 11.98V13.1536H3.20181L3.19398 11.98H4.3754ZM4.3754 9.17118V10.3448H3.20181L3.19398 9.17118H4.3754ZM7.59103 11.98V13.1536H6.41744L6.40962 11.98H7.59103ZM7.59103 9.17118V10.3448H6.41744L6.40962 9.17118H7.59103ZM10.8067 11.98V13.1536H9.63308L9.62526 11.98H10.8067ZM10.8067 9.17118V10.3448H9.63308L9.62526 9.17118H10.8067ZM0.0957031 15.726H13.9049V6.80667H0.0957031V15.726Z"
        fill={color}
      />
    </svg>
  );
}
