export interface Student {
  id: string;
  name: string;
  avatar: string;
}

export interface AddStudentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onAddStudent: (selectedStudents: Student[]) => void;
}
