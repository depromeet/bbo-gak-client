import { Sidebar } from '@/container/Sidebar/Sidebar';
import { PropsWithChildren } from 'react';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
