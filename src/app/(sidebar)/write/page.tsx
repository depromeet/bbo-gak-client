'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor/Editor').then(({ Editor }) => Editor), { ssr: false });

export default function Page() {
  return (
    <div className="border-1 w-full h-full">
      <Editor />
    </div>
  );
}
