'use client';

import { Icon } from '@/system/components';
import { TouchButton } from '../TouchButton';
import { color } from '@/system/token/color';
import { useNotificationContext } from './context';
import { AnimatePresence, motion } from 'framer-motion';
import { NotificationList } from './NotificationList';
import { AsyncBoundaryWithQuery } from '@/lib';

export function NotificationWindow() {
  const { isOpen, close } = useNotificationContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="z-[10000] absolute top-16 left-16 bottom-16 w-368 bg-neutral-90 rounded-20 p-20 flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-neutral-1 text-heading2 font-semibold">알림</h1>
            <TouchButton onClick={close}>
              <Icon name="x" color={color.neutral40} />
            </TouchButton>
          </div>
          <div className="flex-1 overflow-auto">
            <AsyncBoundaryWithQuery>
              <NotificationList />
            </AsyncBoundaryWithQuery>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
