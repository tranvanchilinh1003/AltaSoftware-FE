import dayjs from "dayjs";

export interface TestFormData {
    id: number;
    name: string;
    type: number;
    durationTime: number;
    startTime: dayjs.Dayjs | null;
    endTime: dayjs.Dayjs | null;
    file: File | string;
    description: string;
    classIds: string;
    fileSubmit: boolean;
    gradeLevelsId: number;
    subjectId: number;
    teacherId: number;
    classify: number
}
export interface ClassItem {
    id: number;
    name: string;
    subjectQuantity: number
    gradeLevel: { id: number; code: string; hoursSemester1: number; hoursSemester2: number; name: string }[]; // hoặc để any[] nếu chưa chắc
    [key: string]: any; // cho phép các field khác nếu có
}
