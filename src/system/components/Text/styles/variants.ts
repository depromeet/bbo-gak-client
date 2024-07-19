import { typographyVariant } from '@/system/token/typography';
import { tv } from 'tailwind-variants';
import type { Typography } from '@/system/token/typography';

export const textVariants = tv({
  base: 'm-0',
  slots: {
    paragraph: [],
  },
  variants: {
    typography: typographyVariant.reduce(
      (acc, typography) => {
        // TODO: fontsize, fontweight, lineheight등 tailwind정보 추가
        acc[typography] = [];
        return acc;
      },
      {} as Record<Typography, []>,
    ),
  },
});
