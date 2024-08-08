import { forwardRef } from 'react';
import { useInput, UseInputProps } from './useInput';

export const Input = forwardRef<HTMLInputElement, UseInputProps>((props, ref) => {
  const { getBaseProps, getInputProps } = useInput({
    ...props,
    ref,
  });

  return (
    <div {...getBaseProps()}>
      <input {...getInputProps()} />
    </div>
  );
});

Input.displayName = 'Input';
