interface Props {
  size: number;
  direction?: 'column' | 'row';
}

export function Spacing({ size, direction = 'column' }: Props) {
  return <div style={direction === 'column' ? { height: size } : { width: size }} />;
}
