// app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import React, { ReactNode, useEffect, useState } from 'react';
import '@/style/global.css';
import { checkAuth } from '@/utils/auth';
import Loading from '@/components/Loading';
import { usePathname, useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const route = useRouter();
  const pathname = usePathname();

  const noClosedRouters = ['/login', '/callback', '/logout', '/error'];

  useEffect(() => {
    const verifyUser = async () => {
      const isLoggedIn = await checkAuth();

      setIsLoggedIn(isLoggedIn);

      if (pathname === '/error') {
        return;
      }

      if (!isLoggedIn && pathname !== '/login') {
        route.push('/login');
      }
    };

    verifyUser();
  }, [route, pathname]);

  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="./img/product.png" />
      </head>
      <body className={inter.className}>
        {noClosedRouters.includes(pathname) || isLoggedIn ? (
          children
        ) : (
          <Loading />
        )}
      </body>
    </html>
  );
}
