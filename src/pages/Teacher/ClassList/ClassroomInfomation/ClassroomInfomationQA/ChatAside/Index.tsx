import React, { useState, useCallback, useEffect } from 'react';
import { ChatConversation } from '../../types/chatConversation';
import ChatList from './ChatList';
import QAFilters from '../ChatFilter';
import QAFromSearch from '../ChatFromSearch';
import { chatConversations } from '../../data/chatConversations';
import { FilterState } from '../../types/questionFilter';

interface TeacherQAProps {
    onSelectChat: (conversation: ChatConversation) => void;
}

const ChatAside: React.FC<TeacherQAProps> = ({ onSelectChat }) => {
    const [filters, setFilters] = useState<FilterState>({});
    const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null);

    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    }, []);

    const filteredChats = filters.questionCategory
        ? filters.questionCategory.id === 1
            ? chatConversations
            : chatConversations.filter((chat) => chat.category.id === filters.questionCategory!.id)
        : chatConversations;

    useEffect(() => {
        if (filteredChats.length > 0) {
            setSelectedChat(filteredChats[0]);
            onSelectChat(filteredChats[0]);
        } else {
            setSelectedChat(null);
            onSelectChat(null as any);
        }
    }, [filteredChats, onSelectChat]);

    return (
        <>
            <div className="mt-7 mb-5">
                <QAFilters filters={filters} onChange={handleFilterChange} />
            </div>
            <div className="lg:col-span-1 ">
                <div className="hidden lg:block rounded-lg bg-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] p-4 max-h-[600px] overflow-y-auto space-y-2
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-track]:rounded-r-full
                    [&::-webkit-scrollbar-thumb]:rounded-r-full
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <div className="space-y-2">
                        <QAFromSearch
                            placeholder="Tìm kiếm"
                            inputStyle={{
                                fontFamily: 'var(--font-Mulish)',
                                fontStyle: 'italic',
                                color: 'var(--black-text)',
                            }}
                        />
                        <ChatList
                            chats={filteredChats}
                            selectedChat={selectedChat}
                            onSelectChat={(chat) => {
                                setSelectedChat(chat);
                                onSelectChat(chat);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatAside;
