import { Typography } from '@/system/token/typography/index';

// NOTE: px정보를 typography token에서 직접 가져올 경우 tailwind에서 인식하지 못하는 문제가 있어 임시적으로 값을 넣어놓습니다.
// FIXME: 추후 수정해야합니다.
export const fontSize: Record<Typography, `text-[${number}px]`> = {
  title1: 'text-[36px]',
  title2: 'text-[28px]',
  title3: 'text-[24px]',
  heading1: 'text-[20px]',
  heading2: 'text-[18px]',
  body1: 'text-[16px]',
  body2: 'text-[15px]',
  label1: 'text-[14px]',
  label2: 'text-[13px]',
  caption1: 'text-[12px]',
  caption2: 'text-[11px]',
} as const;

export const lineHeight: Record<Typography, `leading-[${number}px]`> = {
  title1: 'leading-[48px]',
  title2: 'leading-[38px]',
  title3: 'leading-[32px]',
  heading1: 'leading-[28px]',
  heading2: 'leading-[26px]',
  body1: 'leading-[24px]',
  body2: 'leading-[22px]',
  label1: 'leading-[20px]',
  label2: 'leading-[18px]',
  caption1: 'leading-[16px]',
  caption2: 'leading-[14px]',
} as const;

export const letterSpacing: Record<Typography, `tracking-[${number}em]`> = {
  title1: 'tracking-[-0.027em]',
  title2: 'tracking-[-0.0236em]',
  title3: 'tracking-[-0.023em]',
  heading1: 'tracking-[-0.012em]',
  heading2: 'tracking-[-0.002em]',
  body1: 'tracking-[0.0057em]',
  body2: 'tracking-[0.0096em]',
  label1: 'tracking-[0.0145em]',
  label2: 'tracking-[0.0194em]',
  caption1: 'tracking-[0.0252em]',
  caption2: 'tracking-[0.0311em]',
} as const;
