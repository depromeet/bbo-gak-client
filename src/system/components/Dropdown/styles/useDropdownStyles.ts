import { cn } from '@/utils';
import { DropdownAnatomy } from '../anatomy';
import { match } from 'ts-pattern';

interface DropdownStyle {
  className?: string;
}

export interface DropdownStyleProps {
  colorVariant: 'black' | 'grey';
}

export type DropdownStyles = Record<DropdownAnatomy, DropdownStyle>;

export function useDropdownStyles({ colorVariant }: DropdownStyleProps): Record<DropdownAnatomy, DropdownStyle> {
  const backgroundClassAsColorVariant = match(colorVariant)
    .with('black', () => 'hover:bg-neutral-3 active:bg-neutral-5')
    .with('grey', () => 'hover:bg-neutral-5 active:bg-neutral-10')
    .exhaustive();

  const triggerClassAsColorVariant = match(colorVariant)
    .with('black', () => 'text-neutral-80')
    .with('grey', () => 'text-neutral-40')
    .exhaustive();

  return {
    content: {
      className:
        'z-[50] flex flex-col py-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12),0px_0px_1px_0px_rgba(0,0,0,0.08)] min-w-[170px] bg-white rounded-[12px] border-[1px] hover:border-neutral-20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 mt-[8px]',
    },
    separator: {
      className: 'h-[1px] bg-neutral-3 w-full',
    },
    trigger: {
      className: cn(triggerClassAsColorVariant, 'relative'),
    },
    'trigger-background': {
      className: cn(
        backgroundClassAsColorVariant,
        'z-[-1] w-[calc(100%+6px)] h-[calc(100%+8px)] absolute right-0 top-[50%] translate-y-[-50%] rounded-[6px]',
      ),
    },
    'trigger-arrow': {},
    'checkbox-item': {
      className:
        'flex justify-between items-center mx-[8px] my-[4px] px-[8px] py-[4px] text-label1 font-medium rounded-[6px] hover:bg-neutral-3 disabled:text-neutral-30 disabled:bg-white',
    },
  };
}
