// components/Header.tsx

'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="w-full h-24 flex items-center ps-10 pe-10">
      <div>
        <h3 className="text-lg">Hi, Mr Paulo. It&lsquo;s a good day </h3>
        <h4 className="text-sm text-gray-700">Today is Wednesday June 15</h4>
      </div>
    </header>
  );
};

export default Header;
