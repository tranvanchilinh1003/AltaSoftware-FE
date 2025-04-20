// exam.types.ts

export enum ExamStatus {
    PendingApproval,
    NotStarted,
    InProgress,
    InExecution,
    Completed,
  }
  
  export interface Exam {
    subject: string;
    grade: number;
    examName: string;
    semester: number;
    examDate: string;
    status: ExamStatus;
  }
  
  export const getStatusName = (status: ExamStatus): string => { 
    switch (status) {
      case ExamStatus.PendingApproval:
        return "Chờ phê duyệt";
      case ExamStatus.NotStarted:
        return "Chưa bắt đầu";
      case ExamStatus.InProgress:
        return "Đang diễn ra";
      case ExamStatus.InExecution:
        return "Đã tiến hành";
      case ExamStatus.Completed:
        return "Đã hoàn thành";
      default:
        return "Trạng thái không xác định";
    }
  };
  
  export const statusOptions = [
    { value: ExamStatus.PendingApproval.toString(), label: getStatusName(ExamStatus.PendingApproval) },
    { value: ExamStatus.NotStarted.toString(), label: getStatusName(ExamStatus.NotStarted) },
    { value: ExamStatus.InProgress.toString(), label: getStatusName(ExamStatus.InProgress) },
    { value: ExamStatus.InExecution.toString(), label: getStatusName(ExamStatus.InExecution) },
    { value: ExamStatus.Completed.toString(), label: getStatusName(ExamStatus.Completed) },
  ];
  