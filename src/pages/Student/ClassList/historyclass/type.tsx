export type Session = {
    id: number;
    title: string;
    date: string;
    time: string;
    status: "past" | "current" | "upcoming";
};


export type ClassSchedule = {
    avatar: string;
    teacher: string;
    subject: string;
    description: string;
    className: string;
    duration: number;
    startDate: string;
    endDate: {
        date: string;
        time: string;
    };
    classCode: string;
    securityCode: string;
    shareLink: string;
    autoStart: boolean;
    recordingEnabled: boolean;
    sessions: Session[];
};
