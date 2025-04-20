import React, { useState } from 'react';

import ChatView from './ChatView';
import ChatAside from './ChatAside/Index';
import { ChatConversation } from '../types/chatConversation';
import { chatConversations } from '../data/chatConversations';


const ClassroomInfomationQA = () => {
    const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(
        chatConversations.length > 0 ? chatConversations[0] : null
    );

    return (
        <div className="grid grid-cols-[1fr_2fr] pr-4 xl:grid-cols-[1fr_2fr] xl:gap-4">
            <div className="col-span-full xl:col-auto mt-1 bg-none">
                <ChatAside onSelectChat={setSelectedChat} />
            </div>
            <div className="col-span-full xl:col-auto mt-24">
                <ChatView conversation={selectedChat} />
            </div>
        </div>
    );
};

export default ClassroomInfomationQA;
