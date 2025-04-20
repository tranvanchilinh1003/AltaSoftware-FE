export interface Teacher {
    id: number;
    code: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
}

export interface SubjectGroup {
    id: number;
    name: string;
    teacherId: number;
    teacher: Teacher;
}

export interface SubjectResponse {
    code: number;
    message: string;
    data: SubjectGroup[];
    totalItems: number;
}
