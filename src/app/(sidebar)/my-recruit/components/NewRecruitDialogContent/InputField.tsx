import { If } from '@/system/utils/If';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'input'> {
  required?: boolean;
  right?: ReactNode;
  value: string;
}

export function InputField({ required = false, right, value, ...inputProps }: Props) {
  return (
    <div className="w-full flex justify-between items-center px-16 py-12 bg-neutral-1 border-neutral-20 rounded-[8px] border-[1px] whitespace-pre">
      <If condition={required}>
        <div className="text-mint-40 text-label1">* </div>
      </If>
      <input value={value} className="flex-1 outline-none bg-transparent" {...inputProps} />
      <If condition={right != null}>
        <div className="ml-[12px]">{right}</div>
      </If>
    </div>
  );
}
