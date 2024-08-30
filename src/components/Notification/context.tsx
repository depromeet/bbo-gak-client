'use client';

import { generateContext } from '@/lib';
import { useState } from 'react';

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

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <NotificationWrapper isOpen={isOpen} open={open} close={close} toggle={toggle}>
      {children}
    </NotificationWrapper>
  );
}

export { NotificatinProvider, useNotificationContext };
