import { ClassSchedule } from "./type";
import avatar from "../../../../assets/images/people/Ellipse 43.png";

const getStatus = (date: string, time: string): "past" | "current" | "upcoming" => {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const sessionDateTime = new Date(`${formattedDate}T${time}`);
    const now = new Date();

    if (sessionDateTime < now) return "past";
    if (sessionDateTime.toDateString() === now.toDateString()) return "current";
    return "upcoming";
};



const today = new Date();
const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

// Tạo dữ liệu sessions mới
export const classScheduleData: ClassSchedule = {
    teacher: "Nguyễn Võ Văn A",
    avatar: avatar,
    subject: "Lịch sử",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    className: "10A1",
    startDate: formatDate(today),
    endDate: {
        date: formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)),
        time: "17:00",
    },
    duration: 90,
    sessions: [
        { id: 1, title: "1", date: "10/03/2025", time: "14:00", status: getStatus("10/03/2025", "14:00") },
        { id: 2, title: "2", date: "12/03/2025", time: "13:00", status: getStatus("12/03/2025", "20:57") },
        { id: 3, title: "3", date: "13/03/2025", time: "13:45", status: getStatus("13/03/2025", "13:45") },
        { id: 4, title: "4", date: "14/03/2025", time: "14:00", status: getStatus("14/03/2025", "14:00") },
        { id: 5, title: "5", date: "15/03/2025", time: "14:00", status: getStatus("15/03/2025", "14:00") },
        { id: 6, title: "6", date: "16/03/2025", time: "14:00", status: getStatus("16/03/2025", "14:00") },
        { id: 7, title: "7", date: "17/03/2025", time: "14:00", status: getStatus("17/03/2025", "14:00") },
        { id: 8, title: "8", date: "18/03/2025", time: "14:00", status: getStatus("18/03/2025", "14:00") },
        { id: 9, title: "9", date: "19/03/2025", time: "14:00", status: getStatus("19/03/2025", "14:00") },
    ],
    classCode: "ABC123",
    securityCode: "XYZ789",
    shareLink: "https://example.com",
    autoStart: true,
    recordingEnabled: false,
};

