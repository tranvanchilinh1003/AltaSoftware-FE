export interface Student {
  name: string;
  muted: boolean;
  isTeacher?: boolean;
  img?: string;
}

export interface StudentAdd {
  id: string;
  name: string;
  avatar: string;
}

export interface StudentListProps {
  students: Student[];
  students_add: StudentAdd[];
}
