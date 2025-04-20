import dayjs from 'dayjs';

export interface ResignationFormProps {
    retirementDate: dayjs.Dayjs | null; // Ngày nghỉ việc, dùng Dayjs thay vì string
    note: string; // Ghi chú về quyết định nghỉ việc
    decision: File | null;
}
