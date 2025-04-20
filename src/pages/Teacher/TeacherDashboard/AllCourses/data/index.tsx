import { SemesterData } from "../types";

const subjects = ["Ngữ văn", "Lịch sử", "Toán hình học", "Địa lý", "Vật lý", "Hóa học", "Sinh học", "Tin học", "Ngoại ngữ", "GDCD", "Thể dục", "Công nghệ"];
const classes = ["Lớp 10A1", "Lớp 10A2", "Lớp 11B1", "Lớp 11B2", "Lớp 12C1", "Lớp 12C2"];
const schedules = ["Thứ 2 - 8:00", "Thứ 3 - 9:30", "Thứ 4 - 13:00", "Thứ 5 - 15:00", "Thứ 6 - 10:00", "Thứ 7 - 14:30"];
const semesters = ["Học kỳ 1 - 2025", "Học kỳ 2 - 2025", "Học kỳ 1 - 2026", "Học kỳ 2 - 2026"];

const getRandomItem = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const statusOptions = ["Chưa hoàn thành", "Đang học", "Đã hoàn thành"] as const;

export const data: SemesterData[] = semesters.map((semester) => ({
    semester,
    subjects: Array.from({ length: Math.floor(Math.random() * 8) + 5 }, (_, i) => ({
        id: `${semester}-${i}`,
        title: getRandomItem(subjects),
        details: {
            class: getRandomItem(classes),
            schedule: getRandomItem(schedules),
            dateRange: `${String(i % 12 + 1).padStart(2, "0")}/05 - ${String(i % 12 + 10).padStart(2, "0")}/07`,
            status: getRandomItem(statusOptions),
        },
    })),
}));
