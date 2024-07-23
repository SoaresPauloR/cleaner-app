import React from 'react';

type Props = {
  header: React.JSX.Element;
  children: React.JSX.Element;
  footer: React.JSX.Element;
};

const Modal = ({ header, children, footer }: Props) => {
  return (
    <div className="z-20 absolute bg-black bg-opacity-40 w-full h-full left-0 top-0 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl flex flex-col gap-4">
        <div className="flex justify-between items-center">{header}</div>
        <div>{children}</div>
        <div className="flex gap-2">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
