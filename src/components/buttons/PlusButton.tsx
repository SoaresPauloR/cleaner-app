import { ButtonProps } from '@/types/ButtonProps';
import React from 'react';

function PlusButton({ action, title }: ButtonProps) {
  return (
    <>
      <button
        onClick={action}
        className="w-10 text-white bg-blue-600 rounded-lg"
      >
        {title ? title : '+'}
      </button>
    </>
  );
}

export default PlusButton;
