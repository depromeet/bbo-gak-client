'use client';

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof motion.button>;

export function TouchButton({ children, ...restProps }: Props) {
  return (
    <motion.button
      initial="idle"
      whileTap="touch"
      variants={{ idle: { scale: 1 }, touch: { scale: 0.96 } }}
      transition={{ duration: 0.1 }}
      {...restProps}>
      {children}
    </motion.button>
  );
}
