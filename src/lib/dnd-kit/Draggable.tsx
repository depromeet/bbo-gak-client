import React, { PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

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
    <motion.div animate={{ opacity: isDragging ? 0.5 : 1 }} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </motion.div>
  );
}
