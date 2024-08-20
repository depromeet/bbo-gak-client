'use client';

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentProps } from 'react';

export type TriggerProps = ComponentProps<typeof RadixDropdownMenu.Trigger>;

export function Trigger({ children }: TriggerProps) {
  return <RadixDropdownMenu.Trigger>{children}</RadixDropdownMenu.Trigger>;
}
