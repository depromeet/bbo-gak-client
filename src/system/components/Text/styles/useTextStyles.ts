import { clsx } from 'clsx';
import { textVariants } from './variants';
import type { Typography } from '@/system/token/typography';
import type { TextAnatomy } from '../anatomy';

interface Props {
  className?: string;
  typography: Typography;
}

export function useTextStyles({ className, typography }: Props): Record<TextAnatomy, { className: string }> {
  const styleVariants = textVariants({ typography });

  return {
    paragraph: {
      className: clsx(className, styleVariants),
    },
  };
}
