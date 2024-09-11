'use client';

import { generateContext } from '@/lib';
import { useState } from 'react';
import { usePutNotificationRead } from './apis/usePutNotificationRead';

interface NotificationContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const [NotificationWrapper, useNotificationContext] = generateContext<NotificationContext>({
  name: 'Notification',
});

function NotificatinProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: readNotification } = usePutNotificationRead();

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    readNotification();
  };

  const toggle = () => (isOpen ? close() : open());

  return (
    <NotificationWrapper isOpen={isOpen} open={open} close={close} toggle={toggle}>
      {children}
    </NotificationWrapper>
  );
}

export { NotificatinProvider, useNotificationContext };
