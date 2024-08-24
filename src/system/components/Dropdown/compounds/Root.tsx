'use client';

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { PropsWithChildren, useState } from 'react';
import { DropdownProvider } from '../context';
import { useDropdownStyles } from '../styles/useDropdownStyles';
import { useDropdownLogics } from '../logics/useDropdownLogics';
import { DropdownStyleProps } from '@/system/components/Dropdown/styles/useDropdownStyles';

interface RootProps extends Partial<DropdownStyleProps> {
  defaultOpen?: boolean;
}

// 추후 Controlled방식도 지원
export function Root({ defaultOpen = false, colorVariant = 'grey', children }: PropsWithChildren<RootProps>) {
  const [open, setOpen] = useState(defaultOpen);
  const dropdownStyles = useDropdownStyles({ colorVariant });
  const dropdownLogics = useDropdownLogics({ onOpenChange: setOpen });

  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownProvider open={open} styles={dropdownStyles} logics={dropdownLogics} onOpenChange={setOpen}>
        {children}
      </DropdownProvider>
    </RadixDropdownMenu.Root>
  );
}
