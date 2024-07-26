// app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import '@/style/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="./img/produtos.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
