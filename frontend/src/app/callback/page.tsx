'use client';

import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const CallbackPage = () => {
  const route = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        localStorage.setItem('token', token);
        route.push('/');
      } else {
        console.error('No token found in the URL.');
        route.push('/login');
      }
    };

    handleCallback();
  }, [route]);

  return <Loading />;
};

export default CallbackPage;
