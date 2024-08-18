export const typographyVariant = [
  'title1',
  'title2',
  'title3',
  'heading1',
  'heading2',
  'body1',
  'body2',
  'label1',
  'label2',
  'caption1',
  'caption2',
] as const;

export type Typography = (typeof typographyVariant)[number];

export const fontSize: Record<Typography, `${number}px`> = {
  title1: '36px',
  title2: '28px',
  title3: '24px',
  heading1: '20px',
  heading2: '18px',
  body1: '16px',
  body2: '15px',
  label1: '14px',
  label2: '13px',
  caption1: '12px',
  caption2: '11px',
} as const;

export const lineHeight: Record<Typography, `${number}px`> = {
  title1: '48px',
  title2: '38px',
  title3: '32px',
  heading1: '28px',
  heading2: '26px',
  body1: '24px',
  body2: '22px',
  label1: '20px',
  label2: '18px',
  caption1: '16px',
  caption2: '14px',
} as const;

export const letterSpacing: Record<Typography, `${number}rem`> = {
  title1: '-0.027rem',
  title2: '-0.0236rem',
  title3: '-0.023rem',
  heading1: '-0.012rem',
  heading2: '-0.002rem',
  body1: '0.0057rem',
  body2: '0.0096rem',
  label1: '0.0145rem',
  label2: '0.0194rem',
  caption1: '0.0252rem',
  caption2: '0.0311rem',
} as const;
