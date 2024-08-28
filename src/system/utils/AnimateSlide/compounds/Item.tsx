import { AnimatePresence, motion } from 'framer-motion';
import { useAnimateSlideContext, useAnimateSlideItemContext } from '../context';
import { Children, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function Item({ children }: Props) {
  const { currentIndex, skipIntroMotion } = useAnimateSlideContext();
  const { index: itemIndex } = useAnimateSlideItemContext();

  return (
    <AnimatePresence>
      {currentIndex === itemIndex && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full text-center">
          {Children.toArray(children).map((child, childIndex) => (
            <motion.div
              key={childIndex}
              initial={skipIntroMotion && itemIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: childIndex * 0.1, duration: 0.2 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}>
              {child}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
