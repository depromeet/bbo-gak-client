import { ButtonHTMLAttributes, HTMLProps, forwardRef } from 'react';
import { Surface } from '../Surface/Surface';
import { EditorButton, ButtonProps } from '../EditorButton/EditorButton';
import { cn } from '@/utils';
import { Tooltip } from '../Tooltip/Tooltip';

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
    const toolbarClassName = cn(
      'text-black inline-flex h-full leading-none gap-2',
      isVertical ? 'flex-col p-8' : 'flex-row p-4 items-center',
      className,
    );

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    );
  },
);

ToolbarWrapper.displayName = 'Toolbar';

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    'bg-neutral-200 dark:bg-neutral-800',
    horizontal
      ? 'w-full min-w-[1.5rem] h-[1px] my-4 first:mt-0 last:mt-0'
      : 'h-full min-h-[1.5rem] w-[1px] mx-4 first:ml-0 last:mr-0',
    className,
  );

  return <div className={dividerClassName} ref={ref} {...rest} />;
});

ToolbarDivider.displayName = 'Toolbar.Divider';

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  tooltipShortcut?: string[];
  buttonSize?: ButtonProps['buttonSize'];
  variant?: ButtonProps['variant'];
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { children, buttonSize = 'icon', variant = 'ghost', className, tooltip, tooltipShortcut, activeClassname, ...rest },
    ref,
  ) => {
    const buttonClass = cn('gap-1 min-w-[2rem] px-8 w-auto', className);

    const content = (
      <EditorButton
        activeClassname={activeClassname}
        className={buttonClass}
        variant={variant}
        buttonSize={buttonSize}
        ref={ref}
        {...rest}>
        {children}
      </EditorButton>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {content}
        </Tooltip>
      );
    }

    return content;
  },
);

ToolbarButton.displayName = 'ToolbarButton';

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
