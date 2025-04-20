import { TableColumn } from './type';

export const columns: TableColumn[] = [
  { key: 'code', label: 'Mã học sinh' },
  { key: 'fullName', label: 'Tên học sinh' },
  { key: 'dateOfBirth', label: 'Ngày sinh', isDate: true },
  { key: 'gender', label: 'Giới tính' },
  { key: 'transferToSchool', label: 'Chuyển từ' },
  { key: 'transferSemester', label: 'Học kỳ chuyển' },
  { key: 'gradeLevel', label: 'Khối' },
  { key: 'transferDate', label: 'Ngày chuyển', isDate: true },
];
