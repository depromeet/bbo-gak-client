'use client';

import { useDropdownContext } from '../context';

export function Separator() {
  const { styles } = useDropdownContext();

  return <div {...styles.separator} />;
}
