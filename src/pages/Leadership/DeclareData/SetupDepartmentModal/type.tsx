export interface Settings {
    departments: string[];
    headOfDepartments: string[];
    subjects: string[];
    code: string;
    type: string;
    subjectTypes: string[];
    semester1: number;
    semester2: number;
}
export interface SubjectGroup {
    id: number;
    name: string;
    teacherId: number;
    teacher: any | null;
}

export interface TeacherData {
    user: Teacher[];
}

// export interface Subject {
//     id: number;
//     name: string;
//     teacherId: number;
//     teacher: any | null;
// }

export interface Teacher {
    id: number;
    fullName: string;
    gender: boolean;
    birthDate: string;
    position: string;
    status: number;
    subjectGroupName: string;
    teacherCode: string;
    userId: number;
}
