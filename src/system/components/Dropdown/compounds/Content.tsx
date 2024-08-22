'use client';

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentProps } from 'react';
import { mergeProps } from '@/utils/mergeProps';
import { useDropdownContext } from '../context';

type ContentProps = ComponentProps<typeof RadixDropdownMenu.Content>;

export function Content(props: ContentProps) {
  const { styles } = useDropdownContext();

  return <RadixDropdownMenu.Content {...mergeProps(props, styles.content)} />;
}
