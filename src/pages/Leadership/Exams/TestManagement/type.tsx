export interface ITestManagement {
    id: number;
    date: string;
    grade: number;
    class: string;
    subject: string;
    teacher: string;
    examContent: string;
    duration: string;
    status: string;
    approval: string;
    files?: File | null;
}
