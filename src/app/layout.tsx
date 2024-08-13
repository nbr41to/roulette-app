import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import './globals.css';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roulette App',
  description: '人生をルーレットで決めよう',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
