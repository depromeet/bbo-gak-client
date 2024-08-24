import { useResizeObserver } from '@/hooks/useResizeObserver';
import { animate, motion, useMotionValue } from 'framer-motion';
import { ReactNode, forwardRef, useState } from 'react';

interface AnimateHeightProps {
  children?: ReactNode;
}

/**
 * @description 동적으로 변하는 높이에 대응합니다.
 */
export const AnimateHeight = forwardRef<HTMLDivElement, AnimateHeightProps>(function AnimateHeight({ children }, ref) {
  const [updated, setUpdated] = useState(false);
  const heightMotionValue = useMotionValue(-1);

  const resizeRef = useResizeObserver(({ contentRect }) => {
    if (updated === false) {
      setUpdated(true);
      // heightMotionValue.set(contentRect.height);
      return;
    }
    heightMotionValue.set(contentRect.height);
    // animate(heightMotionValue, contentRect.height, { duration: 0.7 });
  });

  return (
    <motion.div
      ref={ref}
      style={{ maxHeight: updated ? heightMotionValue : 'auto', overflow: 'hidden' }}
      transition={{ duration: 1 }}>
      <div ref={resizeRef}>{children}</div>
    </motion.div>
  );
});
