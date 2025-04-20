// Interface định nghĩa dữ liệu của 1 lịch thi
export interface IExamScheduleItem {
  id: number;
  name: string;
  examDay: string;
  duration_in_minutes: number;
  type: string;
  form: boolean;
  status: number;
  statusName: string;
  academicYearId: number;
  subject: number;
  semesterIds: number[]; // Cập nhật: là mảng số
  gradeLevelsId: number;
  academicYear: string;
  subjectName: string;
  semesterNames: string[]; // Cập nhật: là mảng chuỗi
  gradeLevel: string;
  teacherNames: string[];
}

// Interface định nghĩa cấu trúc API response
export interface IExamApiResponse {
  code: number;
  message: string;
  data: {
    items: IExamScheduleItem[];
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
}

// Enum cho trạng thái kỳ thi
export enum ExamStatus {
  PendingApproval = 0, // Chờ phê duyệt
  NotStarted = 1,      // Chưa bắt đầu
  InProgress = 2,      // Đang diễn ra
  InExecution = 3,     // Đã tiến hành
  Completed = 4        // Đã hoàn thành
}
