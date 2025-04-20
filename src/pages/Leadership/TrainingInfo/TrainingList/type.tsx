export interface TrainingItem {
  id?: number;
  organization?: string;
  specialization?: string;
  startDate?: string;
  endDate?: string;
  degree?: string;
  form?: string;
  onClick?: () => void;
}

export interface TrainingProgram {
  id: number;
  name: string;
  schoolFacilitiesID: number;
  startDate: string;
  endDate: string;
  degree: string;
  trainingForm: string;
  majorId: number;
}

export interface SchoolFacilitie {
  id: number;
  name: string;
}

export interface Major {
  id: number;
  name: string;
}