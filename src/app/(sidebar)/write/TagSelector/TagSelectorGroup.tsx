import { StrictPropsWithChildren } from '@/types';
import { TagSelectorContext, UseTagSelectorGroupProps, useTagSelectorGroup } from './useTagSelectorGroup';
import { generateContext } from '@/lib';

const [TagSelectorGroupProvider, useTagSelectorContext] = generateContext<TagSelectorContext>({
  name: 'tag-selector-group',
});

export function TagSelectorGroup({ children, ...props }: StrictPropsWithChildren<UseTagSelectorGroupProps>) {
  const { groupContext } = useTagSelectorGroup(props);

  return <TagSelectorGroupProvider {...groupContext}>{children}</TagSelectorGroupProvider>;
}

export { useTagSelectorContext };
