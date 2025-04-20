import dayjs from "dayjs";

// data.tsx
export interface IExamSession {
    id: number;
    avatar: string;
    teacher: string;
    class: string;
    subject: string;
    startDate: string;
    endDate: string;
    describe: string;
    sessions: Session[];
    totalSessions: number;
    examCode: string;
    link: string;
    options: string[];
    password: string;
}

export interface Session {
    id: number;
    sessions: number;
    date: string | dayjs.Dayjs | null;
    time: string;
    studentCount: number;
    isEditing: boolean;
    isNew?: boolean
}

