import React from 'react';
import ChatBox from '../../../components/ChatBox';

function TestComponent() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center'>
      <div className='w-[700px] h-[500px] border-2 border-gray-500 relative'>
        <ChatBox classname={'absolute bottom-2 right-1 max-w-[350px]'}/>
      </div>
    </div>
  );
}

export default TestComponent;
