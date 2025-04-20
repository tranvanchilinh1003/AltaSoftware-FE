export interface TrainingProgramForm {
    institution: number;
    major: number;
    startDate: string;
    endDate: string;
    method: string;
    degree: string;
    attachment: File | null;
    name: string;
    filename: string;
}

export interface Institution {
    id: number;
    name: string;
}

export interface Major {
    id: number;
    name: string;
}
export interface Teacher {
    id: number;
    fullName: string;
}

