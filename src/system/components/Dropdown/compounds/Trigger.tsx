'use client';

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentProps } from 'react';
import { useDropdownContext } from '../context';
import { mergeProps } from '@/utils/mergeProps';

export type TriggerProps = ComponentProps<typeof RadixDropdownMenu.Trigger>;

export function Trigger({ children, ...restProps }: TriggerProps) {
  const { styles } = useDropdownContext();

  return (
    <RadixDropdownMenu.Trigger {...mergeProps(styles.trigger, restProps)}>
      <div>
        <div {...styles['trigger-background']} />
        {children}
      </div>
    </RadixDropdownMenu.Trigger>
  );
}
