interface ScoreType {
  id: number;
  name: string;
  weight: number;
}

interface Score {
  id: number;
  score: number;
  scoreType: ScoreType;
}

interface Semester {
  id: number;
  name: string;
  scores: Score[];
  averageScore: number;
}

export interface Student {
  id: number;
  fullName: string;
  code: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  lastUpdate: string;
  averageScore: number;
  passed: boolean;
  semesters: Semester[];
}
