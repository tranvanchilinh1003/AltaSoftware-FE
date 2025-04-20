import dayjs from "dayjs";
export interface TestItem {
    id: number;
    title: string;
    date: string | dayjs.Dayjs | null;
    time: string;
    isEditing: boolean;
}

export interface TestInfo {
    subject: string;
    class: string;
    totalTests: number;
    startDate: string;
    duration: string;
    description: string;
    file: string;
    requireAttachment: boolean;
    tests: TestItem[];
}
