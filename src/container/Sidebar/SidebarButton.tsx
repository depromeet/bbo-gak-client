import { If } from '@/components/If';
import { Icon, Text } from '@/system/components';
import { motion } from 'framer-motion';
import type { IconProps } from '@/system/components';
import type { ReactNode } from 'react';

interface SidebarButtonProps {
  right?: ReactNode;
  iconName: IconProps['name'];
  selected: boolean;
  expanded?: boolean;
  expandedText?: string;
  withTouchEffect?: boolean;
  withHoverEffect?: boolean;
}

const DEFAULT_COLOR = '#F9F9FA';
const SELECTED_COLOR = '#08F29B';

export function SidebarButton({
  right,
  iconName,
  selected,
  expanded,
  expandedText,
  withTouchEffect = true,
  withHoverEffect = true,
}: SidebarButtonProps) {
  const showTooltip = !expanded;

  return (
    <motion.button
      className="relative p-[6px] w-full flex justify-between items-center"
      variants={{ touch: { scale: 0.96 } }}
      whileTap={withTouchEffect ? 'touch' : undefined}
      whileHover={withHoverEffect ? 'hover' : undefined}>
      <If condition={withHoverEffect}>
        <motion.div
          variants={{ hover: { backgroundColor: '#27282C' } }}
          className="absolute w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px]"
        />
      </If>

      <div className="relative flex justify-start gap-[12px]">
        <Icon
          name={iconName}
          color={selected ? SELECTED_COLOR : DEFAULT_COLOR}
        />
        <If condition={expanded}>
          <Text
            typography="Body1"
            color={selected ? SELECTED_COLOR : DEFAULT_COLOR}>
            {expandedText}
          </Text>
        </If>
      </div>
      <If condition={expanded}>{right}</If>

      <If condition={showTooltip}>
        <motion.div
          className="absolute top-[50%] left-[72px] translate-y-[-50%] w-max px-[10px] py-[4px] rounded-[6px] bg-[#70737C] pointer-events-none"
          initial={{ opacity: 0 }}
          variants={{ hover: { opacity: 1 } }}>
          <Text typography="Body1" color="white">
            {expandedText}
          </Text>
        </motion.div>
      </If>
    </motion.button>
  );
}
