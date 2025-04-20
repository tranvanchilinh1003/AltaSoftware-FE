export type ExamData = {
    id: number;
    name: string;
    examDay: string;
    duration_in_minutes: number;
    type: string;
    form: boolean;
    status: string;
    academicYearId: number;
    subject: number;
    semesterId: number;
    gradeLevelsId: number;
    academicYear: string;
    subjectName: string;
    classNames: string[];
    semesterNames: string;
    gradeLevel: string;
    teacherNames: string[];
  };