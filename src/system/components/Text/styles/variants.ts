import { typographyVariant } from '@/system/token/typography';
import { cva } from 'class-variance-authority';
import type { Typography } from '@/system/token/typography';
import { fontSize, lineHeight, letterSpacing } from '@/system/components/Text/styles/typography';

export const paragraphVariants = cva(['m-0'], {
  variants: {
    typography: typographyVariant.reduce(
      (acc, typography) => {
        acc[typography] = [fontSize[typography], lineHeight[typography], letterSpacing[typography]];
        return acc;
      },
      {} as Record<Typography, string[]>,
    ),
  },
});
