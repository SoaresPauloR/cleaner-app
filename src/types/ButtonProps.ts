import React from 'react';

export type ButtonProps = {
  action:
    | (() => Promise<void>)
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  title?: string;
  className?: string;
};
