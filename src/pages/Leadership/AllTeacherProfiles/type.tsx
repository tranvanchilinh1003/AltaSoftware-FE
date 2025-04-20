export interface ILecturerProfile {
    id: number;
    teacherCode: string;
    fullName: string;
    birthDate: string;
    gender: string;
    subjectId: number;
    position: string;
    status: number;
    userId: number;
}
export interface ISubject {
    id: number;
    code: string;
    name: string;
    hoursSemester1: number;
    hoursSemester2: number;
    subjectTypeId: number;
}