import { ButtonProps } from '@/types/ButtonProps';
import React from 'react';

function SubmitButton({ action, title, className }: ButtonProps) {
  return (
    <button
      className={`w-full rounded-lg bg-green-500 text-white font-bold p-2 hover:bg-green-600 transition-3 ${className}`}
      onClick={action}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
