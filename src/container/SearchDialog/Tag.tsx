import clsx from 'clsx';
import { ComponentProps } from 'react';
import { match } from 'ts-pattern';

interface Props extends ComponentProps<'div'> {
  variant: '역량' | '인성';
  highlighted?: boolean;
}

export function Tag({ variant, highlighted = false, children, ...restProps }: Props) {
  const variantClassName = match({ variant, highlighted })
    .with({ variant: '인성', highlighted: false }, () => 'text-blue-text-1 border-blue-bg-1')
    .with({ variant: '역량', highlighted: false }, () => 'text-purple-text-1 border-purple-bg-1')
    .with({ variant: '인성', highlighted: true }, () => 'text-blue-text-1 bg-blue-bg-1')
    .with({ variant: '역량', highlighted: true }, () => 'text-purple-text-1 bg-purple-bg-1')
    .exhaustive();

  return (
    <div className={clsx(variantClassName, 'px-[8px] border-[1px] py-[4px] rounded-[4px] text-label1')} {...restProps}>
      {children}
    </div>
  );
}
