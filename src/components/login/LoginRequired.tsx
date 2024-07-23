'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../Loading';

const LoginRequired = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return <Loading />;

  return <></>;
};

export default LoginRequired;
