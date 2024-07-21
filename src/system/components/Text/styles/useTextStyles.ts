import { clsx } from 'clsx';
import { paragraphVariants } from './variants';
import type { Typography } from '@/system/token/typography';
import type { TextAnatomy } from '../anatomy';
import { FontWeight } from '@/system/token/fontWeight';

interface Props {
  className?: string;
  fontWeight?: FontWeight;
  typography: Typography;
}

export function useTextStyles({
  className,
  typography,
  fontWeight,
}: Props): Record<TextAnatomy, { className: string }> {
  const paragraphStyle = paragraphVariants({ typography, fontWeight });

  return {
    paragraph: {
      className: clsx(className, paragraphStyle),
    },
  };
}
