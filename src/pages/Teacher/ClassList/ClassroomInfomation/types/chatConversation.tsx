import { ChatMessage } from "./chatMessages";
import { ChatCategory } from "./questionCategory";


export interface ChatConversation {
    id: number;
    avatar: string;       // URL của hình đại diện
    displayName: string;  // Tên hiển thị của người gửi hoặc nhóm chat
    status: string;       // Trạng thái (ví dụ: "online", "offline", "new message")
    preview: string;      // Trích đoạn tin nhắn cuối cùng
    timestamp: string;    // Thời gian (định dạng ISO string hoặc theo định dạng mong muốn)
    category: ChatCategory; // Danh mục của cuộc trò chuyện
    seen?: number;          // Số lượt xem hoặc trạng thái đã xem (nếu cần)
    messages?: ChatMessage[];

}
