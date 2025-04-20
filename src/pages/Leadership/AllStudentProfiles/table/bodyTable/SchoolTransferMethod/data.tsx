interface Data {
    id: string;
    name: string;
    birthDate: string;
    gender: 'Nam' | 'Nữ';
    people: string;
    class: string;
    status: 'Đang theo học' | 'Đã tốt nghiệp' | 'Đã chuyển lơp' | 'Đã chuyển trường' | 'Đã thôi học';
  }
  export const data: Data[] = [
    {
      id: '2020-6A',
      name: 'Trần Trung',
      birthDate: '10/10/2002',
      gender: 'Nam',
      people: 'Kinh',
      class: '6A',
      status: 'Đang theo học',
    },
    {
      id: '2020-6B',
      name: 'Trần Kiên',
      birthDate: '10/10/2002',
      gender: 'Nam',
      people: 'Kinh',
      class: '6A',
      status: 'Đã tốt nghiệp',
    },
  ];
  