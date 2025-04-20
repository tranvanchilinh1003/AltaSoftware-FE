// Interface cho lớp tham gia
export interface IParticipatingClass {
  classId: number;
  classCode: string;
  className: string;
  supervisoryTeacherName: string;
  studentQuantity: number;
  joinedExamStudentQuantity: number;
  examGraders: string[];
}

// Interface chi tiết bài kiểm tra từ API
export interface IExamScheduleDetails {
  id: number;
  name: string;
  examDay: string;
  durationInMinutes: number;
  type: string;
  form: boolean;
  status: number;
  statusName: string;
  academicYearId: number;
  subject: number;
  semesterId: number;
  gradeLevelsId: number;
  academicYear: string;
  semesterName: string;
  gradeLevelName: string;
  subjectName: string;
  teacherNames: string[];
  participatingClasses: IParticipatingClass[];
}

// Interface cho kết cấu trả về của API
export interface IExamScheduleResponse {
  code: number;
  message: string;
  data: IExamScheduleDetails;
}