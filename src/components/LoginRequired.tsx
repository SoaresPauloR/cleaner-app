import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginRequired = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading')
    return (
      <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center text-2xl text-white font-bold">
        Carregando...
      </div>
    );

  return <></>;
};

export default LoginRequired;
