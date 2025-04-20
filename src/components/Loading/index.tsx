import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React from 'react';

function Loading({ isLoading }: { isLoading: boolean }) {
  if (isLoading === false) return null;

  return (
    <div className="fixed h-[100vh] w-[100vw] bg-gray-500 bg-opacity-25 flex justify-center items-center z-[100000]">
      <ArrowPathIcon className='motion-safe:animate-spin w-[30px] h-[30px] text-orange-500 opacity-100'/>
    </div>
  );
}

export default Loading;
