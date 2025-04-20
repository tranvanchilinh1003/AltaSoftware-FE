export interface SchoolClass {
  id: number;
  code: string;
  name: string;
  studentQuantity: number;
  subjectQuantity: number;
  description: string;
  active: boolean;
  gradeLevel: any;
  academicYear: any;
  user: any;
  classType: any;
  subjects: any[];
  student: any[];
}
