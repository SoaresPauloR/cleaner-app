'use client';

import Loading from '@/components/Loading';
import React, { useEffect } from 'react';

const CallbackPage = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        localStorage.setItem('token', token);
        location.href = '/';
      } else {
        console.error('No token found in the URL.');
        location.href = '/login';
      }
    };

    handleCallback();
  }, []);

  return <Loading />;
};

export default CallbackPage;
