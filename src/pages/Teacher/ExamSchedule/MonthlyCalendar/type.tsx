export interface Exam {
    id: number;
    subject: string;
    duration: string;
    type: string;
    date: string;
    examTaker: string;  // Giáo viên
    method: string;  // Hình thức
    content: string; // Nội dung
    grade: string;  // Thêm nếu có
    startTime: string;  // Thời gian bắt đàu
    endTime: string;  // Thời gian kết thúc
    category?: string;  // Thêm nếu có
    color?: string;  // Thêm nếu có
}
