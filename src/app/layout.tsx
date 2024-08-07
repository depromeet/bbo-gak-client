import type { Metadata } from 'next';
import { QueryProvider } from '@/lib';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/tailwind-util';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '뽀각',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-white')}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
