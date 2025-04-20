// data.tsx
export interface IExamSession {
  id: number;
  teacher: string;
  avatar: string;
  class: string;
  subject: string;
  startDate: string;
  endDate: string;
  describe: string;
  sessions: Session[];
  totalSessions: number;
  examCode: string;
  password?: string;
  link: string;
  options: string[];
}

export interface Session {
  id: number;
  sessions: number;
  date: string;
  time: string;
  studentCount: number;
}
