import React from 'react';
import { ChatMessage } from '../../types';

const ChatMessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div className={`flex ${message.senderId === '0' ? 'justify-end' : 'justify-start'} my-2`}>
      <div className="flex items-center gap-2">
        {message.senderId !== '0' && <img src={message.avatar} alt={message.senderName} className="w-8 h-8 rounded-full" />}
        <div className={`px-4 py-2 rounded-lg max-w-[70%] ${message.senderId === '0' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          {message.message}
          <span className="block text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
