import React from 'react';

function Loading() {
  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
      <p>Processing...</p>
    </div>
  );
}

export default Loading;
