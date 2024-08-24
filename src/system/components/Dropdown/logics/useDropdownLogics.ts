import { DropdownAnatomy } from '../anatomy';

export type DropdownLogics = Record<DropdownAnatomy, any>;

interface Props {
  onOpenChange: (open: boolean) => void;
}

export function useDropdownLogics({ onOpenChange }: Props): DropdownLogics {
  return {
    content: {},
    separator: {},
    trigger: {},
    'trigger-background': {},
    'trigger-arrow': {},
    'checkbox-item': {
      onClick: () => onOpenChange(false),
    },
  };
}
