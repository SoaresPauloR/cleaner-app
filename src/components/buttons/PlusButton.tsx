import { ButtonProps } from '@/types/ButtonProps';
import React from 'react';

function PlusButton({ action, title, className }: ButtonProps) {
  return (
    <>
      <button
        onClick={action}
        className={`w-12 bg-transparent border-2 transition-3 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-600 rounded-lg ${className}`}
      >
        {title ? title : '+'}
      </button>
    </>
  );
}

export default PlusButton;
