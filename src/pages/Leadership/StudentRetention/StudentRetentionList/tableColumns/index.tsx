import { TableColumn } from './type';

export const columns: TableColumn[] = [
  { key: 'code', label: 'Mã học viên' },
  { key: 'fullName', label: 'Tên học viên' },
  { key: 'dob', label: 'Ngày sinh', isDate: true }, //chưa có
  { key: 'gender', label: 'Giới tính' }, //chưa có
  { key: 'className', label: 'Lớp bảo lưu' }, //chưa có
  { key: 'reserveDate', label: 'Ngày bảo lưu', isDate: true },
  { key: 'retentionPeriod', label: 'Thời gian bảo lưu' },
  { key: 'reason', label: 'Lý do' },
];
