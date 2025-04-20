export interface GradeLevel {
    id: number;
    code: string;
    name: string;
    teacherId: string;
}

export interface AcademicYear {
    id: number;
    name: string;
    startTime: string; // ISO string format
    endTime: string;   // ISO string format
    semesters: any[];  // Nếu có cấu trúc cụ thể, hãy thay `any[]` bằng interface phù hợp
}

export interface User {
    id: number;
    code: string;
    fullName: string;
    year: number | null;
    enrollmentDate: string; // Có thể parse sang Date nếu cần
    userStatus: string | null;
}

export interface ClassType {
    id: number;
    name: string;
    status: boolean;
    description: string;
}

export interface Subject {
    id: number;
    code: string;
    name: string;
    hoursSemester1: number;
    hoursSemester2: number;
}

export interface ClassData {
    id: number;
    code: string;
    name: string;
    studentQuantity: number;
    subjectQuantity: number;
    description: string;
    active: boolean;
    gradeLevel: GradeLevel;
    academicYear: AcademicYear;
    user: User;
    classType: ClassType;
    subjects: Subject[];
    student: any[]; 
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export type ClassResponse = ApiResponse<ClassData>;
