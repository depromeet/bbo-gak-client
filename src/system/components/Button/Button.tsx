import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
