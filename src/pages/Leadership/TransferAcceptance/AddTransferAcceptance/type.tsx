export interface IProvince {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: [];
}

// huận huyện

interface IWard {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}
interface districtsDel {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
  wards: IWard[];
}
// huận huyện
export interface IDistrict {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  districts: districtsDel[];
}

interface Semester {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

interface AcademicYear {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  semesters: Semester[];
}

export interface Student {
  userId: number;
  code: string;
  fullName: string;
  dob: string; // ISO date string
  gender: string;
  nation: string;
  className: string;
  status: string | null;
  academicYear: AcademicYear;
}

export interface StudentApiResponse {
  code: number;
  message: string;
  data: Student[];
}
