import type { ReactNode } from 'react';
import { useCollapsibleContext } from './context';
import { AnimatePresence, motion } from 'framer-motion';

interface CollapsibleContentProps {
  children: ReactNode;
}

export function CollapsibleContent({ children }: CollapsibleContentProps) {
  const { collapsed } = useCollapsibleContext();

  return (
    <AnimatePresence>
      {!collapsed ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}>
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
