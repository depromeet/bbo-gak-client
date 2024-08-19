import { Button, ButtonProps } from '@/system/components';
import type { StrictPropsWithChildren } from '@/types';
import { UseTagSelectorProps, UseTagSelectorReturn, useTagSelector } from './useTagSelector';
import { generateContext } from '@/lib';
import { cn } from '@/utils';
import { Remove } from '@/system/components/Icon/SVG/Remove';
import { SVGProps } from 'react';
import { If } from '@/system/utils/If';

const [TagSelectorProvider, useTagSelectorContext] = generateContext<
  Omit<UseTagSelectorReturn, 'Component' | 'getBaseProps'>
>({ name: 'tag-selector' });

function Title({ className, ...props }: StrictPropsWithChildren<{ className?: string }>) {
  return <h1 {...props} className={cn('flex items-center w-28 h-40 text-14 font-semibold', className)} />;
}

function Tag({ ...props }: StrictPropsWithChildren<ButtonProps>) {
  const { disabled } = useTagSelectorContext();

  return (
    <Button
      {...props}
      disabled={disabled}
      className={cn(
        'py-4 px-8 text-[14px] rounded-4 font-medium leading-20',
        disabled && 'cursor-not-allowed',
        props.className,
      )}
    />
  );
}

function RemovalbleTag({ children, className, color, onClick, ...props }: StrictPropsWithChildren<ButtonProps>) {
  const { isOpen } = useTagSelectorContext();

  return (
    <Button
      className={cn('flex items-center gap-2 py-4 px-8 text-[14px] rounded-4 font-medium leading-20 group', className)}
      {...props}>
      {children}

      <Remove
        color={color}
        size={16}
        className={cn(!isOpen && 'hidden group-hover:inline-block', isOpen && 'inline-block')}
        onClick={onClick as SVGProps<SVGSVGElement>['onClick']}
      />
    </Button>
  );
}

function Trigger({ children }: StrictPropsWithChildren) {
  const { getTriggerProps } = useTagSelectorContext();

  return (
    <Button type="button" {...getTriggerProps()}>
      {children}
    </Button>
  );
}

function Content({ children }: StrictPropsWithChildren) {
  const { isOpen, getContentProps } = useTagSelectorContext();

  return (
    <If condition={isOpen}>
      <article {...getContentProps()}>{children}</article>
    </If>
  );
}

function Notice({ children }: StrictPropsWithChildren) {
  const { disabled } = useTagSelectorContext();

  return <p className={cn('text-[12px] font-medium text-neutral-40 pb-16', disabled && 'opacity-45')}>{children}</p>;
}

function TagList({ title, children }: StrictPropsWithChildren<{ title: string }>) {
  const { disabled } = useTagSelectorContext();

  return (
    <div className={cn('flex flex-col gap-8', disabled && 'opacity-45')}>
      <p className="text-12 font-medium text-neutral-75">{title}</p>
      <ul className="w-full flex flex-wrap gap-6">{children}</ul>
    </div>
  );
}

function TagSelector({ children, ...props }: StrictPropsWithChildren<UseTagSelectorProps>) {
  const { Component, getBaseProps, ...restProps } = useTagSelector(props);

  return (
    <TagSelectorProvider {...restProps}>
      <Component {...getBaseProps()}>{children}</Component>
    </TagSelectorProvider>
  );
}

TagSelector.Title = Title;
TagSelector.Trigger = Trigger;
TagSelector.Content = Content;
TagSelector.TagList = TagList;
TagSelector.Tag = Tag;
TagSelector.RemovalbleTag = RemovalbleTag;
TagSelector.Notice = Notice;

export { TagSelector };
