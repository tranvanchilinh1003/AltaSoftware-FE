// export interface Exam {
//     id: number;
//     subject: string;
//     duration: string;
//     type: string;
//     date: string;
//     teacher: string;  // Giáo viên
//     method: string;  // Hình thức
//     grade?: string;  // Thêm nếu có
//     category?: string;  // Thêm nếu có
//     color?: string;  // Thêm nếu có
// }
export interface IExam {
    id: number;
    subject: string;
    duration: string;
    type: string;
    date: string; // định dạng yyyy-mm-dd
    teacher: string;
    method: string;
  }