import { signOut } from 'next-auth/react';
import React from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

function LogoutButton({ click }: { click: () => void }) {
  return (
    <button
      className="p-2 w-full flex gap-3 justify-center items-center rounded-xl bg-black text-white hover:bg-gray-900"
      onClick={() => {
        signOut();
        click;
      }}
    >
      <FaArrowRightFromBracket size={20} /> Logout
    </button>
  );
}

export default LogoutButton;
