// src/pages/Leadership/DeclareData/SectionList/type.tsx

export interface SubjectType {
  id: string;
  name: string;
  status: boolean;
  description: string;
  academicYear: string | null;
}

export interface SectionGroup {
  id: string;
  code: string;
  name: string;
  hoursSemester1: number;
  hoursSemester2: number;
  subjectType: SubjectType;
}
