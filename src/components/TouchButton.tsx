'use client';

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof motion.button>;

export function TouchButton({ children, variants, disabled, ...restProps }: Props) {
  return (
    <motion.button
      initial="idle"
      whileTap={disabled ? 'idle' : 'touch'}
      variants={{ idle: { scale: 1 }, touch: { scale: 0.96 }, ...variants }}
      transition={{ duration: 0.1 }}
      disabled={disabled}
      {...restProps}>
      {children}
    </motion.button>
  );
}
