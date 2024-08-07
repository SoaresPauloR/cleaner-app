import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

function LogoutButton({ isLoading }: { isLoading: () => void }) {
  const route = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    route.push('/login');
    isLoading();
  };

  return (
    <button
      className="p-2 w-full flex gap-3 justify-center items-center rounded-xl bg-black text-white hover:bg-gray-900"
      onClick={handleLogout}
    >
      <FaArrowRightFromBracket size={20} /> Logout
    </button>
  );
}

export default LogoutButton;
