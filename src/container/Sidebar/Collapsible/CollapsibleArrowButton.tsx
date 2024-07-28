import { Icon } from '@/system/components';
import { motion } from 'framer-motion';
import { useCollapsibleContext } from './context';

export function CollapsibleArrowButton() {
  const { collapsed } = useCollapsibleContext();

  return (
    <motion.div className="relative" whileTap="touch" whileHover="hover" variants={{ touch: { scale: 0.96 } }}>
      <motion.div
        variants={{ hover: { backgroundColor: '#27282C' } }}
        className="absolute w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px]"
      />
      <motion.div
        variants={{
          collapsed: { rotate: '0deg' },
          expanded: { rotate: '-180deg' },
        }}
        animate={collapsed ? 'collapsed' : 'expanded'}>
        <Icon name="rightChevron" color="#878A93" />
      </motion.div>
    </motion.div>
  );
}
