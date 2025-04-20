// Định nghĩa kiểu dữ liệu cho dữ liệu truyền vào từ API
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

export interface IScoreBoard {
  id: number;
  stt: number;
  name: string;
  birthday: string;
  chuyenCanList: number[];
  mieng: number;
  phut15: number;
  heSo1: number;
  heSo2: number;
  tbHocKy: number;
  diemTrungBinhCaNam: number;
  ngayCapNhat: string;
}

export interface SearchResultProps {
  scoreBoardClass: ClassData;
  scoreBoard: IScoreBoard[];
}


// Định nghĩa kiểu cho từng option trong Dropdown
export interface IFileOption {
    value: string;
    label: string;
  }