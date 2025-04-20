// interface niên khóa
export interface ISchoolYear {
  id: number;
  name: string; // khoản năm
  startTime: string; // thời gian bắt đầu
  endTime: string; // thời gian kết thúc
}

// mock data
// export const schoolYearData: ISchoolYear[] = [
//   { id: 1, year: '2020-2021', start: '05/10/2020', end: '05/10/2021' },
//   { id: 2, year: '2019-2020', start: '05/10/2019', end: '05/10/2020' },
//   { id: 3, year: '2018-2019', start: '05/10/2018', end: '05/10/2019' },
//   { id: 4, year: '2017-2018', start: '05/10/2017', end: '05/10/2018' },
//   { id: 5, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
//   { id: 6, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
//   { id: 7, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
//   { id: 8, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
//   { id: 9, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
// ];