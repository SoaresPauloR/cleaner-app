import React from 'react';

function Loading() {
  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center text-2xl text-white font-bold">
      Carregando...
    </div>
  );
}

export default Loading;
