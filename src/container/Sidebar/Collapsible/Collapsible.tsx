import type { PropsWithChildren } from 'react';
import { CollapsibleProvider } from './context';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleArrowButton } from './CollapsibleArrowButton';

interface CollapsibleRootProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

function CollapsibleRoot({ children, collapsed, onCollapsedChange }: PropsWithChildren<CollapsibleRootProps>) {
  return (
    <CollapsibleProvider collapsed={collapsed} onCollapsedChange={onCollapsedChange}>
      <div className="w-full">{children}</div>
    </CollapsibleProvider>
  );
}

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
  ArrowButton: CollapsibleArrowButton,
});
