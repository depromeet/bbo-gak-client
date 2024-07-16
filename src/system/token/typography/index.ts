export const typographyVariant = [
  'Display1',
  'Display2',
  'Title1',
  'Title2',
  'Title3',
  'Heading1',
  'Heading2',
  'Headline1',
  'Headline2',
  'Body1',
  'Body2',
  'Label1',
  'Label2',
  'Caption1',
  'Caption2',
] as const;

export type Typography = (typeof typographyVariant)[number];

// TODO: 자간 / 행간 높이 설정
export const fontSize: Record<Typography, number> = {
  Display1: 56,
  Display2: 40,
  Title1: 36,
  Title2: 28,
  Title3: 24,
  Heading1: 22,
  Heading2: 20,
  Headline1: 18,
  Headline2: 17,
  Body1: 16,
  Body2: 15,
  Label1: 14,
  Label2: 13,
  Caption1: 12,
  Caption2: 11,
} as const;
