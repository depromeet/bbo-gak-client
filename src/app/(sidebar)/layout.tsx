import { Sidebar } from '@/container/Sidebar/Sidebar';
import { PropsWithChildren } from 'react';
import { CardWindowLayout } from '@/components/CardWindow/context';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow relative">
        <CardWindowLayout>{children}</CardWindowLayout>
      </div>
    </div>
  );
}
