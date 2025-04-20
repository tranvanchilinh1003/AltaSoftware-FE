export interface FormData {
  term1StartDate: Date | null;
  term1EndDate: Date | null;
  term2StartDate?: Date | null;
  term2EndDate?: Date | null;
  yearStart: string;
  yearEnd: string;
  schoolYearTo: string;
  inheritData: boolean;
}
