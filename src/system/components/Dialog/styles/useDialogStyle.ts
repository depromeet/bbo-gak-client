import { cn } from '@/utils/tailwind-util';
import { DialogAnatomy } from '../anatomy';

interface Props {
  className?: string;
}

export function useDimStyle({}: Props): Record<DialogAnatomy, { className: string }> {
  return {
    close: { className: '' },
    content: { className: '' },
    dim: { className: '' },
  };
}
