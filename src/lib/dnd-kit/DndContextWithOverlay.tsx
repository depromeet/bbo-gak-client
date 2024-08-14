import { ComponentProps, ReactNode, useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { If } from '@/system/utils/If';

interface Props extends ComponentProps<typeof DndContext> {
  OverlayElement: (props: any) => ReactNode;
}

export function DndContextWithOverlay({ OverlayElement, children, ...restProps }: Props) {
  const [overlayElementData, setOverlayElementData] = useState<any | null>(null);

  return (
    // FIXME: 통합
    <DndContext
      {...restProps}
      onDragStart={({ active }) => setOverlayElementData(active.data.current)}
      onDragEnd={() => setOverlayElementData(null)}>
      <DragOverlay dropAnimation={null}>
        <If condition={overlayElementData != null}>
          <OverlayElement {...overlayElementData} />
        </If>
      </DragOverlay>
      {children}
    </DndContext>
  );
}
