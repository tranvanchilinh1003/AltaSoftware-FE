import dayjs from 'dayjs';

export interface ILeaveUpdate {
    leaveDate: dayjs.Dayjs | null;
    note: string;
    decision: File | null;
}