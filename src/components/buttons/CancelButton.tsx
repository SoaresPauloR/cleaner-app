import { ButtonProps } from '@/types/ButtonProps';
import React from 'react';

function CancelButton({ action, title, className }: ButtonProps) {
  return (
    <button
      className={`w-full rounded-lg text-red-700 border border-red-700 p-2 hover:bg-red-700 hover:text-white transition-3 ${className}`}
      onClick={action}
    >
      {title}
    </button>
  );
}

export default CancelButton;
