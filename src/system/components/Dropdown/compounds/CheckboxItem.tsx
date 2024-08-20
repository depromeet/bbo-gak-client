'use client';

import { If } from '@/system/utils/If';
import { Icon } from '../..';
import { ComponentProps, forwardRef } from 'react';
import { mergeProps } from '@/utils/mergeProps';
import { color } from '@/system/token/color';
import { useDropdownContext } from '../context';

interface Props extends ComponentProps<'button'> {
  checked?: boolean;
}

export const CheckboxItem = forwardRef<HTMLButtonElement, Props>(function CheckboxItem(
  { checked, disabled, children, ...restProps },
  ref,
) {
  const { styles, logics } = useDropdownContext();

  return (
    <button ref={ref} disabled={disabled} {...mergeProps(styles['checkbox-item'], logics['checkbox-item'], restProps)}>
      {children}
      <If condition={checked}>
        <Icon name="check" color={color.neutral30} size={20} />
      </If>
    </button>
  );
});
