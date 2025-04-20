export interface ChatReply {
    id: number;
    author: string;
    role: string;
    avatar: string;
    date: string;
    time: string;
    text: string;
}

export interface ChatMessage {
    id: string;
    conversationId: number;
    senderId: string;
    receiverId: string;
    senderName: string;
    receiverName: string;
    senderRole?: string;
    avatar: string;
    message: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'seen';
    replies: ChatReply[];
    author?: string;
    date?: string;
    time?: string;
    question?: string;
}
