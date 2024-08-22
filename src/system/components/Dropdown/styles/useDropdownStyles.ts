import { DropdownAnatomy } from '../anatomy';

interface DropdownStyle {
  className?: string;
}

export type DropdownStyles = Record<DropdownAnatomy, DropdownStyle>;

export function useDropdownStyles(): Record<DropdownAnatomy, DropdownStyle> {
  return {
    content: {
      className:
        'flex flex-col py-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12),0px_0px_1px_0px_rgba(0,0,0,0.08)] min-w-[170px] bg-white rounded-[12px] border-[1px] hover:border-neutral-20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    },
    separator: {
      className: 'h-[1px] bg-neutral-3 w-full',
    },
    'trigger-arrow': {},
    'checkbox-item': {
      className:
        'flex justify-between items-center mx-[8px] my-[4px] px-[8px] py-[4px] text-label1 font-medium text-neutral-80 rounded-[6px] hover:bg-neutral-3 disabled:text-neutral-30 disabled:bg-white',
    },
  };
}
