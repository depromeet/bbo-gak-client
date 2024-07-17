'use client';

import { forwardRef } from 'react';
import { useButton, type UseButtonProp } from './useButton';

const Button = forwardRef<HTMLButtonElement, UseButtonProp>(
  ({ leftIcon, rightIcon, ...props }, ref) => {
    const { children, getButtonProps } = useButton({ ...props, ref });

    return (
      <button {...getButtonProps()}>
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = 'bbo-gak-Button';

export default Button;
