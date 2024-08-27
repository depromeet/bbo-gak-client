import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  size: number;
  direction?: 'column' | 'row';
}

export function Spacing({ size, direction = 'column', ...restProps }: Props) {
  return <div style={direction === 'column' ? { height: size } : { width: size }} {...restProps} />;
}
