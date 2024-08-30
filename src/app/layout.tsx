import type { Metadata } from 'next';
import { QueryProvider } from '@/lib';
import '@/styles/globals.css';
import '@/styles/memo.css';
import { cn } from '@/utils';
import { Suspense } from 'react';
import { GoogleProvider } from '@/lib/GoogleProvider';
import localFont from 'next/font/local';

const Pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '뽀각',
  description: '취업 자료 아카이빙 서비스 뽀각입니다.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(Pretendard.className, 'bg-neutral-1')}>
        <QueryProvider>
          <GoogleProvider>
            <Suspense>{children}</Suspense>
          </GoogleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
