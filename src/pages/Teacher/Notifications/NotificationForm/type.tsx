
export interface NotificationData {
  recipient: string; // Đối tượng nhận
  subject: string;   // Chủ đề
  content: string;   // Nội dung soạn thảo
}

export interface NotificationFormProps {
  visible: boolean;                    // Có hiển thị Modal hay không
  onClose: () => void;                // Đóng Modal
  onSubmit: (data: NotificationData) => void;  // Xử lý khi nhấn nút "Gửi"
  initialData?: NotificationData;      // Dữ liệu khởi tạo (nếu có)
}
