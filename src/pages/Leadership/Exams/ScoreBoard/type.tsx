export interface IScoreBoard {
  id: number;
  stt: number;
  name: string;               // Họ và Tên
  birthday: string;           // Ngày sinh
  chuyenCanList: number[];    // Chuyên cần
  mieng: number;              // Miệng
  phut15: number;             // 15 phút
  heSo1: number;              // Hệ số I
  heSo2: number;              // Hệ số II
  tbHocKy: number;            // Trung bình (Học kỳ I)
  diemTrungBinhCaNam: number; // Điểm trung bình cả năm
  ngayCapNhat: string;        // Ngày cập nhật
}
export interface ParamsType {
  academicYearId: string;
  subjectId: string;
  classId: string;
  gradeLevelId: string;
}

export interface ScoreData {
  class: {
    id: number;
    name: string;
    code: string;
    subject: { id: number; name: string };
    startDate: string;
    endDate: string;
  };
  students: any[];
}

export interface ClassData {
  id: number;
  name: string;
  code: string;
  subject: {
    id: number;
    name: string;
  };
  startDate: string;
  endDate: string;
}

