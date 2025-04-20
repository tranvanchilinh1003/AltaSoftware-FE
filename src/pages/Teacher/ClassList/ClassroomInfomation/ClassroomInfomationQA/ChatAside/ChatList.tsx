import React from 'react';
import { ChatConversation } from '../../types/chatConversation';
import ChatCart from './ChatCart';

interface ChatListProps {
  chats: ChatConversation[];
  selectedChat: ChatConversation | null;
  onSelectChat: (conversation: ChatConversation) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div>
      {chats.map((conversation) => (
        <ChatCart
          key={conversation.id}
          conversation={conversation}
          isActive={selectedChat?.id === conversation.id}
          onClick={() => onSelectChat(conversation)}
        />
      ))}
    </div>
  );
};

export default ChatList;
