import { Sidebar } from '@/container/Sidebar/Sidebar';
import { PropsWithChildren } from 'react';
import { CardWindowLayout } from '@/components/CardWindow/context';
import AuthRedirect from '../AuthRedirect';
import { NotificationWindow } from '@/components/Notification/NotificationWindow';
import { NotificatinProvider } from '@/components/Notification/context';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <AuthRedirect>
        <NotificatinProvider>
          <Sidebar />
          <div className="flex-grow relative">
            <CardWindowLayout>{children}</CardWindowLayout>
            <NotificationWindow />
          </div>
        </NotificatinProvider>
      </AuthRedirect>
    </div>
  );
}
