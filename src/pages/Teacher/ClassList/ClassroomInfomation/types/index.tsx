export interface ChatMessage {
    id: string; // ID tin nhắn
    chatId: string; // ID cuộc trò chuyện
    senderId: string; // ID người gửi
    receiverId: string; // ID người nhận
    senderName: string; // Tên người gửi
    receiverName: string; // Tên người nhận
    avatar: string; // Ảnh đại diện của người gửi
    message: string; // Nội dung tin nhắn
    timestamp: string; // Thời gian gửi tin nhắn (ISO format)
    status: "sent" | "delivered" | "seen"; // Trạng thái tin nhắn
}
