import { forwardRef } from 'react';
import { useTextStyles } from './styles/useTextStyles';
import type { ComponentProps, ElementType } from 'react';
import type { Typography } from '@/system/token/typography';
import { FontWeight } from '@/system/token/fontWeight';

// TODO: Polymorphic하게 변경
export type TextProps = ComponentProps<'p'> & {
  as?: ElementType;
  typography: Typography;
  fontWeight: FontWeight;
  color?: string;
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as: Component = 'p', className, fontWeight, typography, color, style, ...restProps },
  ref,
) {
  const textStyle = useTextStyles({ typography, fontWeight, className });

  return <Component ref={ref} style={{ color, ...style }} {...textStyle.paragraph} {...restProps} />;
});

Text.displayName = 'Text';
