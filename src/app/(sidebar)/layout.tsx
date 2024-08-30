import { Sidebar } from '@/container/Sidebar/Sidebar';
import { PropsWithChildren } from 'react';
import { CardWindowLayout } from '@/components/CardWindow/context';
import AuthRedirect from '../AuthRedirect';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow relative">
        <AuthRedirect>
          <CardWindowLayout>{children}</CardWindowLayout>
        </AuthRedirect>
      </div>
    </div>
  );
}
