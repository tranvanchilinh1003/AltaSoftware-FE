export interface Exam {
  class: string;
  content: string;
  subject: string;
  date: string;
  duration: string;
  status: string;
}

export interface Option {
  label: string;
  value: string;
}
export interface TestList {
  classIds: string;
  description: string;
  startTime: string;
  endTime: string;
  type: number;
  subject: Subject;
  fileSubmit: boolean;
}

export interface Subject {
  id: string;
  name: string;
}

export interface ClassList {
  id: number | string;
  name: string;
}