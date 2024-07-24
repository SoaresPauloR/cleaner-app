'use client';

import React, { useState } from 'react';
import { MainProps } from '@/types/MainProps';
import Link from 'next/link';

import { FaHome } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaCalendarDay } from 'react-icons/fa';
import LogoutButton from './login/LogoutButton';
import Loading from './Loading';

type AsideProps = {
  activePage: 'home' | 'calendar' | 'profile';
};

function Aside({ className, activePage }: MainProps & AsideProps) {
  // const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const changeLoading = () => setLoading(!loading);

  return (
    <>
      <aside
        className={`h-[100vh] bg-white fixed ${className} flex flex-col p-12 justify-between items-center rounded-r-3xl`}
      >
        <div className="text-4xl logo font-extrabold">
          <Link href="/">CleanerApp</Link>
        </div>
        <nav className="mb-48 w-full flex gap-3 flex-col">
          <Link
            onClick={changeLoading}
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            href="/"
          >
            <FaHome size={24} /> Home
          </Link>
          <Link
            onClick={changeLoading}
            className={`nav-link ${activePage === 'calendar' ? 'active' : ''}`}
            href="/calendar"
          >
            <FaCalendarDay size={24} /> Calendar
          </Link>
          <Link
            onClick={changeLoading}
            className={`nav-link ${activePage === 'profile' ? 'active' : ''}`}
            href="/profile"
          >
            <FaUserCircle size={24} />
            Profile
          </Link>
        </nav>
        <div className="w-full">
          <LogoutButton click={changeLoading} />
        </div>
      </aside>
      {loading && <Loading />}
    </>
  );
}

export default Aside;
