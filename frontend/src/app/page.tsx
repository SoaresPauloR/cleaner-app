'use client';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { checkAuth } from '@/utils/auth';

import React, { useEffect, useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const isLoggedIn = await checkAuth();

      setIsLoggedIn(isLoggedIn);

      if (location.pathname === '/error') {
        return;
      }

      if (!isLoggedIn && location.pathname !== '/login') {
        location.href = '/login';
      }
    };

    verifyUser();
  }, []);

  return isLoggedIn ? (
    <Layout activePage="home">
      <></>
    </Layout>
  ) : (
    <Loading />
  );
};

export default App;
