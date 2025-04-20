import dayjs from 'dayjs';

export interface IRetirement {
  retirementDate: dayjs.Dayjs | null; // Ngày nghỉ hưu, dùng Dayjs thay vì string
  note: string; // Ghi chú về quyết định nghỉ hưu
  decision: File | null; // File quyết định nghỉ hưu (có thể null)
}
