export interface ExamSchedule {
  schoolYear: string;
  grade: string;
  classType: string;
  selectedClasses: string[];
  subject: string;
  semester: string;
  duration: number;
  examDate: string;
  gradingAssignment: {
    applyAll: boolean;
    selectedTeachers: string[];
    classTeachers: Record<string, string[]>; // Danh sách giáo viên
  };
}

export interface ClassItem {
  id: number | string;
  name: string;
}
