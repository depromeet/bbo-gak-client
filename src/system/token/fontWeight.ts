export const fontWeightVariant = ['bold', 'semibold', 'medium', 'regular'] as const;

export type FontWeight = (typeof fontWeightVariant)[number];
export const fontWeight: Record<FontWeight, number> = {
  bold: 700,
  semibold: 600,
  medium: 500,
  regular: 400,
} as const;
