export interface Semester {
    id: number;
    name: string;
    startTime: string; 
    endTime: string;
}

export interface AcademicYear {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    semesters: Semester[];
}

export interface AcademicYearResponse {
    code: number;
    message: string;
    data: AcademicYear[];
    totalItems: number;
}
