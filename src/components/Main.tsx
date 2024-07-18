import { MainProps } from '@/types/ MainProps';
import React from 'react';

function Main({ children, className }: MainProps): JSX.Element {
  return <main className={`w-full h-full ${className}`}>{children}</main>;
}

export default Main;
