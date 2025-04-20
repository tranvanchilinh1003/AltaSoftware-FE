export type SubjectDetails = {
  class: string;
  schedule: string;
  dateRange: string;
  status: 'Chưa hoàn thành' | 'Đang học' | 'Đã hoàn thành' | 'Đã lên lịch';
};

export type Subject = {
  id: string;
  title: string;
  details: SubjectDetails;
};

export type SemesterData = {
  semester: string;
  subjects: Subject[];
};
