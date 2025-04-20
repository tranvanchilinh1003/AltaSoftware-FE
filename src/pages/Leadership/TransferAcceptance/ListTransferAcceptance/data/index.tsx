export interface SchoolTransferListItem {
  id: number;
  studentCode: string;
  studentName: string;
  dateOfBirth: Date;
  gender: string;
  transferFrom: string;
  transferSemester: string;
  grade: string;
  transferDate: Date;
}

const TransferListData: SchoolTransferListItem[] = [
  {
    id: 1,
    studentCode: 'U022',
    studentName: 'Nguyễn Văn A',
    dateOfBirth: new Date('2013-10-10'),
    gender: 'Nam',
    transferFrom: 'THCS A',
    transferSemester: 'Học kỳ 1',
    grade: '6',
    transferDate: new Date('2025-02-27'),
  },
  {
    id: 2,
    studentCode: 'U023',
    studentName: 'Trần Thị B',
    dateOfBirth: new Date('2012-05-15'),
    gender: 'Nữ',
    transferFrom: 'THCS B',
    transferSemester: 'Học kỳ 2',
    grade: '7',
    transferDate: new Date('2025-03-01'),
  },
  {
    id: 3,
    studentCode: 'U024',
    studentName: 'Lê Hoàng C',
    dateOfBirth: new Date('2011-08-21'),
    gender: 'Nam',
    transferFrom: 'THCS C',
    transferSemester: 'Học kỳ 1',
    grade: '8',
    transferDate: new Date('2025-02-15'),
  },
  {
    id: 4,
    studentCode: '2025-HS0016',
    studentName: 'Phạm Thị D',
    dateOfBirth: new Date('2013-12-30'),
    gender: 'Nữ',
    transferFrom: 'THCS D',
    transferSemester: 'Học kỳ 2',
    grade: '6',
    transferDate: new Date('2025-04-10'),
  },
  {
    id: 5,
    studentCode: '2025-HS0020',
    studentName: 'Đỗ Thanh E',
    dateOfBirth: new Date('2010-03-25'),
    gender: 'Nam',
    transferFrom: 'THCS E',
    transferSemester: 'Học kỳ 1',
    grade: '9',
    transferDate: new Date('2025-05-20'),
  },
];
export default TransferListData;
