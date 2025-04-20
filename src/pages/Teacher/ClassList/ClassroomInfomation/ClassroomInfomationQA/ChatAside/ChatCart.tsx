import React from 'react';

import { IconnEye16 } from '../../../../../../components/Icons';
import { ChatConversation } from '../../types/chatConversation';

interface ChatCartProps {
    conversation: ChatConversation;
    isActive?: boolean;
    onClick?: (conversation: ChatConversation) => void;
}

const ChatCart: React.FC<ChatCartProps> = ({ conversation, isActive, onClick }) => {
    return (
        <div
            onClick={() => onClick && onClick(conversation)}
            className={`flex items-center ${isActive ? 'bg-[#eef3f7]' : ''} p-3 rounded-xl cursor-pointer transition ${isActive ? '' : 'hover:bg-gray-100'
                }`}
        >
            {/* Avatar */}
            <div className="relative">
                <img src={conversation.avatar} alt={conversation.displayName} className="w-12 h-12 rounded-full object-cover" />
                {conversation.status === 'online' && <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full"></span>}
            </div>

            {/* Nội dung chat */}
            <div className="flex-1 ml-3">
                <div className="font-bold text-gray-900">{conversation.displayName}</div>
                <div className="text-gray-500 text-sm truncate">{conversation.preview}</div>
            </div>

            {/* Thông tin thời gian và số lượt xem */}
            <div className="text-gray-400 text-sm flex flex-col items-end">
                <span className="flex items-center gap-1">
                    <IconnEye16 />
                    {conversation.seen}
                </span>
                <span>{conversation.timestamp}</span>
            </div>
        </div>
    );
};

export default ChatCart;
