import { Typography } from '@/system/token/typography';
import { ComponentProps, ElementType, forwardRef } from 'react';
import { useTextStyles } from './styles/useTextStyles';

// TODO: Polymorphic하게 변경
export type TextProps = ComponentProps<'p'> & {
  as?: ElementType;
  typography: Typography;
  color?: string;
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as: Component = 'p', className, typography, color, style, ...restProps },
  ref,
) {
  const textStyle = useTextStyles({ typography, className });

  return (
    <Component
      ref={ref}
      style={{ color, ...style }}
      {...textStyle.paragraph}
      {...restProps}
    />
  );
});

Text.displayName = 'Text';
