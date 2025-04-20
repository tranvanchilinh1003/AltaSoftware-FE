export interface WorkHistory {
  id: number;
  organization: string; // Cơ quan/ Đơn vị
  position: string; // Chức vụ
  startDate: string; // Ngày bắt đầu (ISO 8601)
  endDate: string; // Ngày kết thúc (ISO 8601)
  isCurrent: boolean; // Công việc hiện tại (true nếu vẫn đang làm)
  subjectGroupsId: number; // ID của tổ/ bộ môn
  teacherId: number; // ID của giáo viên
  guardianName: string;
  program: number[];
}
export interface Lecturer {
  teacherId: number;
  guardianName: string;
  fullName: string;
}
export interface Schoolslist {
  id: number;
  name: string;
}
