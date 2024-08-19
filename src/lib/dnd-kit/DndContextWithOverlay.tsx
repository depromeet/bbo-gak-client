import { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { If } from '@/system/utils/If';
import { mergeProps } from '@/utils/mergeProps';
import { DndAdditionalProvider } from './context';

interface Props extends ComponentProps<typeof DndContext> {
  OverlayElement: (props: any) => ReactNode;
}

export function DndContextWithOverlay({ OverlayElement, children, ...restProps }: Props) {
  const [overlayElementData, setOverlayElementData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<number | string>();

  const onDragStart = ({ active }: DragStartEvent) => {
    setOverlayElementData(active.data.current);
  };

  const onDragEnd = ({ over }: DragEndEvent) => {
    setOverlayElementData(null);
    setSelectedId(over?.id);
  };

  useEffect(() => {
    if (selectedId != null) {
      setSelectedId(undefined);
    }
  }, [selectedId]);

  return (
    <DndAdditionalProvider selectedId={selectedId}>
      <DndContext {...mergeProps({ onDragStart, onDragEnd }, restProps)}>
        <DragOverlay dropAnimation={null}>
          <If condition={overlayElementData != null}>
            <OverlayElement {...overlayElementData} />
          </If>
        </DragOverlay>
        {children}
      </DndContext>
    </DndAdditionalProvider>
  );
}
