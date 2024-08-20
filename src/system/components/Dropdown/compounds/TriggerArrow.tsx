'use client';

import { motion } from 'framer-motion';
import { Icon } from '../..';
import { useDropdownContext } from '../context';
import { color } from '@/system/token/color';

export function TriggerArrow() {
  const { open } = useDropdownContext();

  return (
    <motion.div
      variants={{
        closed: { rotate: '0deg' },
        opened: { rotate: '-180deg' },
      }}
      transition={{ duration: 0.1 }}
      animate={open ? 'opened' : 'closed'}>
      <Icon name="downChevron" color={color.neutral30} />
    </motion.div>
  );
}
