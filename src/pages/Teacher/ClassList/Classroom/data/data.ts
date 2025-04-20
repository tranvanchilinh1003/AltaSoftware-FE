import { Classroom } from './type';

export const classrooms: Classroom[] = [
  { id: 1, classCode: 'C001', subjectCode: 'ENG101', time: '08:00 - 10:00', lecturer: 'Nguyễn Văn A', status: true },
  { id: 2, classCode: 'C002', subjectCode: 'MATH202', time: '10:30 - 12:00', lecturer: 'Trần Thị B', status: false },
  { id: 3, classCode: 'C003', subjectCode: 'PHY303', time: '13:00 - 15:00', lecturer: 'Phạm Ngọc C', status: true },
  { id: 4, classCode: 'C004', subjectCode: 'PHY303', time: '13:00 - 15:00', lecturer: 'Phạm Ngọc C', status: false },
];
