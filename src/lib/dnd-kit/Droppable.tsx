import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string | number;
  children?: ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
}
