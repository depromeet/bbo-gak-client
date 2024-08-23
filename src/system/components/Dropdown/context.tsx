import { generateContext } from '@/lib';
import { DropdownStyles } from './styles/useDropdownStyles';
import { DropdownLogics } from './logics/useDropdownLogics';

interface DropdownContext {
  open: boolean;
  styles: DropdownStyles;
  logics: DropdownLogics;
  onOpenChange: (open: boolean) => void;
}

export const [DropdownProvider, useDropdownContext] = generateContext<DropdownContext>({
  name: 'Dropdown',
});
