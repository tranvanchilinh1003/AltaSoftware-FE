export interface User {
    id: number;
    code: string;
    fullName: string;
}

export interface Class {
    id: number;
    code: string;
    name: string;
}

export interface Subject {
    id: number;
    name: string;
}

export interface SubjectGroup {
    id: number;
    name: string;
    teacherId: number;
    teacher: User | null;  // Thêm `teacher` có thể là `null`
}

export interface Topics {
    id: number;
    name: string;
}

export interface Session {
    id: number;
    name: string;
}

export interface AcademicYear {
    id: number;
    name: string | null;  // Có thể là `null`
    startTime: string;
    endTime: string;
    semesters: any | null;  // Có thể là `null`
}

export interface Semester {
    id: number;
    name: string;
    academicYear: AcademicYear | null;  // Có thể là `null`
}

export interface TeachingAssignment {
    id: number;
    startDate: string;
    endDate: string;
    description: string;
    active: boolean;
    user: User;
    class: Class;
    subject: Subject;
    subjectGroup: SubjectGroup;
    topics: Topics;
    sessions: Session[];
    semester: Semester;
}

export interface TeachingAssignmentsResponse {
    code: number;
    message: string;
    data: TeachingAssignment[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface FilterState {
    page?: number;
    pageSize?: number;
    academicYear?: AcademicYear | null;
    subjectGroup?: SubjectGroup | null;
    [key: string]: string | number | AcademicYear | SubjectGroup | AcademicYear[] | SubjectGroup[] | string[] | undefined | null;
}
export interface TeachingAssignmentDetail {
    id: number;
    startDate: string;
    endDate: string;
    description: string;
    active: boolean;
    user: User;
    class: Class;
    subject: Subject;
    subjectGroup: SubjectGroup;
    topics: Topics;
    sessions: Session[];
    semester: Semester;
}
export interface TeachingAssignmentUpdate {
    startDate: string;
    endDate: string;
    description: string;
    userId: number;
    classId: number;
    subjectId: number;
    topicsId: number;
    semesterId: number;
}
export interface TeachingAssignmentAddRequest {
    startDate: string;
    endDate: string;
    description: string;
    active: boolean;
    userId: number;
    classId: number;
    subjectId: number;
    topicsId: number;
    semesterId: number;
}
export interface TeachingAssignmentAddResponse {
    code: number;
    message: string;
    data: TeachingAssignment;
}