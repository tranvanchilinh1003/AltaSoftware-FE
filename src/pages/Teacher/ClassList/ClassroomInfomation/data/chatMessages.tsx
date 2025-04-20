import { ChatMessage } from "../types/chatMessages";

const getFormattedDateTime = (timestamp: string) => {
  const dateObj = new Date(timestamp);
  return {
    date: dateObj.toLocaleDateString("vi-VN"), // ví dụ: "09/03/2025"
    time: dateObj.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }), // ví dụ: "10:30"
  };
};

export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    conversationId: 1,
    senderId: "1", // Giả sử id của Nguyễn Văn A là "1"
    receiverId: "2", // Giả sử id của Trần Thanh Tâm là "2"
    senderName: "Nguyễn Văn A",
    receiverName: "Trần Thanh Tâm",
    avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
    message: "Chào thầy, em có vài câu hỏi về dự án sắp tới, thầy có thể giúp em không?",
    timestamp: "2025-03-09T10:30:00Z",
    status: "sent",
    replies: [
      {
        id: 1,
        author: "Trần Thanh Tâm",
        role: "Giáo viên",
        avatar:
          "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
        date: "09/03/2025",
        time: "10:31",
        text: "Chào em, thầy rất sẵn lòng hỗ trợ. Em cần biết thêm thông tin gì về dự án?",
      },
      {
        id: 2,
        author: "Trần Thanh Tâm",
        role: "Giáo viên",
        avatar:
          "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
        date: "09/03/2025",
        time: "10:35",
        text: "Dự án đang tiến triển ổn định. Em có thể tham khảo báo cáo tuần này để biết chi tiết về tiến độ.",
      },
      {
        id: 3,
        author: "Nguyễn Văn A",
        role: "Học sinh",
        avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
        date: "09/03/2025",
        time: "10:40",
        text: "Cảm ơn thầy! Em sẽ kiểm tra lại báo cáo. Nếu có thêm câu hỏi, em sẽ hỏi sau ạ.",
      },
      {
        id: 4,
        author: "Trần Thanh Tâm",
        role: "Giáo viên",
        avatar:
          "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
        date: "09/03/2025",
        time: "10:45",
        text: "Không có gì. Nếu cần, em cứ thoải mái liên hệ thầy nhé. Chúc em làm việc hiệu quả!",
      },
    ],

    ...getFormattedDateTime("2025-03-09T10:30:00Z"),
    author: "Nguyễn Văn A",
    question: "Chào thầy, em có vài câu hỏi về dự án sắp tới, thầy có thể giúp em không?",

    },
    {
        id: "2",
        conversationId: 2,
        senderId: "1", // Giả sử id của Trần Thị B là "1"
        receiverId: "2", // Giả sử id của Trần Thanh Tâm là "2"
        senderName: "Trần Thị B",
        receiverName: "Trần Thanh Tâm",
        avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
        message: "Chào thầy, em có vài câu hỏi về dự án sắp tới, thầy có thể giúp em không?",
        timestamp: "2025-03-09T10:30:00Z",
        status: "sent",
        replies: [
          {
            id: 1,
            author: "Trần Thanh Tâm",
            role: "Giáo viên",
            avatar:
              "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
            date: "09/03/2025",
            time: "10:31",
            text: "Chào em, thầy rất sẵn lòng hỗ trợ. Em cần biết thêm thông tin gì về dự án?",
          },
          {
            id: 2,
            author: "Trần Thanh Tâm",
            role: "Giáo viên",
            avatar:
              "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
            date: "09/03/2025",
            time: "10:35",
            text: "Dự án đang tiến triển ổn định. Em có thể tham khảo báo cáo tuần này để biết chi tiết về tiến độ.",
          },
          {
            id: 3,
            author: "Trần Thị B",
            role: "Học sinh",
            avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
            date: "09/03/2025",
            time: "10:40",
            text: "Cảm ơn thầy! Em sẽ kiểm tra lại báo cáo. Nếu có thêm câu hỏi, em sẽ hỏi sau ạ.",
          },
          {
            id: 4,
            author: "Trần Thanh Tâm",
            role: "Giáo viên",
            avatar:
              "https://cdn-icons-png.flaticon.com/128/16584/16584868.png",
            date: "09/03/2025",
            time: "10:45",
            text: "Không có gì. Nếu cần, em cứ thoải mái liên hệ thầy nhé. Chúc em làm việc hiệu quả!",
          },
        ],

        ...getFormattedDateTime("2025-03-09T10:30:00Z"),
        author: "Trần Thị B",
        question: "Chào thầy, em có vài câu hỏi về dự án sắp tới, thầy có thể giúp em không?",
      },
];
