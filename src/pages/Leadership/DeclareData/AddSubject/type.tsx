export interface SubjectGroupList {
    id: number;
    name: string;
}
export interface subjectType {
    id: number;
    name: string;
    status: boolean;
}
export interface Subject {
    id: number;
    code: string;
    name: string;
    hoursSemester1: number;
    hoursSemester2: number;
    subjectGroup: SubjectGroupList;
    subjectType: subjectType;
}