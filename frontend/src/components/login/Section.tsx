import { MainProps } from '@/types/MainProps';
import React from 'react';

function Section({ children }: MainProps) {
  return <section className="w-full min-height">{children}</section>;
}

export default Section;
