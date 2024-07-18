import React from 'react';
import { MainProps } from '@/types/ MainProps';

function Aside({ className }: MainProps) {
  // const { data: session } = useSession();

  return (
    <aside className={`h-[100vh] fixed bg-red-300 ${className}`}>
      <nav>Aside</nav>
    </aside>
  );
}

export default Aside;
