import { Sidebar } from '@/container/Sidebar/Sidebar';
import { PropsWithChildren } from 'react';
import { CardWindow } from './(my-info)/components/CardWindow';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow relative">
        {children}
        <CardWindow cardId={1} />
      </div>
    </div>
  );
}
