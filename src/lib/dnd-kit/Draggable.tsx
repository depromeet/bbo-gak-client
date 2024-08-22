import React, { PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: string | number;
  dataForOverlay: any;
}

export function Draggable({ id, children, dataForOverlay }: PropsWithChildren<DraggableProps>) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: dataForOverlay,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
}
