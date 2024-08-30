import React, { ReactNode, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useDndAdditionalContext } from './context';
import { motion, useAnimationControls } from 'framer-motion';

interface DroppableProps {
  id: string | number;
  children?: ReactNode;
  dataForOverlay?: any;
}

export function Droppable({ id, children, dataForOverlay }: DroppableProps) {
  const animationControl = useAnimationControls();
  const { setNodeRef } = useDroppable({ id, data: dataForOverlay });
  const { selectedId } = useDndAdditionalContext();

  useEffect(() => {
    if (selectedId === id) {
      animationControl.start('highlight');
    }
  }, [id, selectedId]);

  return (
    <motion.div
      variants={{ highlight: { scale: [null, 1.02, 1], transition: { duration: 0.5 } } }}
      animate={animationControl}
      ref={setNodeRef}>
      {children}
    </motion.div>
  );
}
