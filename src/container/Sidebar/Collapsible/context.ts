import { generateContext } from '@/lib';

interface CollapsibleContext {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export const [CollapsibleProvider, useCollapsibleContext] = generateContext<CollapsibleContext>({
  name: 'Collapsible',
});
