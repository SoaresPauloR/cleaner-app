// app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import '@/style/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
