import { Spacing } from '@/system/utils/Spacing';
import { TouchButton } from '@/components/TouchButton';
import { Icon } from '@/system/components';
import { color } from '@/system/token/color';
import { motion } from 'framer-motion';
import { CardList } from './CardList';
import { useState } from 'react';
import { INFO_CATEGORIES } from '@/app/(sidebar)/my-recruit/constant';
import { AsyncBoundaryWithQuery } from '@/lib';
import { cn } from '@/utils';
import { Dropdown } from '@/system/components/index';

interface Props {
  onCloseButtonClick: () => void;
}

export function RightSidebar({ onCloseButtonClick }: Props) {
  const [type, setType] = useState<(typeof INFO_CATEGORIES)[number]>(INFO_CATEGORIES[0]);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 400 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.4 }}
      className="w-400 relative">
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col fixed top-[16px] bottom-[16px] right-[16px] p-20 bg-neutral-3 w-370 rounded-[20px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)]">
        <TouchButton className="self-end" onClick={onCloseButtonClick}>
          <Icon name="close" size={24} color={color.neutral40} />
        </TouchButton>
        <Spacing size={25} />
        <div className="flex justify-between items-center">
          <span className="text-neutral-95 text-heading2 font-semibold">내 정보 가져오기</span>
          <Dropdown>
            <Dropdown.Trigger>
              <div className="flex gap-[4px] items-center">
                <span className="text-label2 font-semibold text-neutral-80">{type.replace('_', ' ')}</span>
                <Dropdown.TriggerArrow />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {INFO_CATEGORIES.map((category) => (
                <Dropdown.CheckedItem
                  key={category}
                  checked={type === category}
                  disabled={type === category}
                  onClick={() => setType(category)}>
                  <span className={cn('text-label1 font-medium')}>{category.replace('_', ' ')}</span>
                </Dropdown.CheckedItem>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <Spacing size={4} />
        <span className="text-label2 text-neutral-40">카드를 공고 폴더로 드래그해보세요</span>
        <Spacing size={24} />
        <AsyncBoundaryWithQuery>
          <CardList type={type} />
        </AsyncBoundaryWithQuery>
      </motion.div>
    </motion.div>
  );
}
