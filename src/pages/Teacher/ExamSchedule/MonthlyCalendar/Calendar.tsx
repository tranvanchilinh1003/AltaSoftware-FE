import { useState } from "react";
import { exams } from "./data";
import { Exam } from "./type";

interface CalendarProps {
    setSelectedDate?: (date: string | null) => void;
    filters?: Record<string, boolean | undefined>;
    selectedGrade?: string;
}

const Calendar = ({ setSelectedDate, filters = {}, selectedGrade = "Tất cả" }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<"month" | "week">("month");

    const today = new Date();

    // Chuyển đổi tháng
    const handleMonthChange = (newMonth: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newMonth);
        setCurrentDate(newDate);
    };

    // Chuyển đổi năm
    const handleYearChange = (newYear: number) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(newYear);
        setCurrentDate(newDate);
    };

    // Reset về hôm nay
    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate?.(null);
    };

    // Lấy danh sách ngày trong tuần
    const getDaysInWeek = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
    };

    // Lấy danh sách ngày trong tháng
    const getDaysInMonth = () => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            return date;
        });
    };

    // Xác định màu sắc dựa theo loại bài thi
    const getColorByExam = (examList: Exam[]) => {
        if (examList.length > 1) return "bg-orange-500";
        const exam = examList[0];
        if (exam.type === "15 phút") return "bg-yellow-400";
        if (exam.type === "45 phút") return "bg-blue-500";
        if (exam.type === "Giữa kỳ") return "bg-green-500";
        if (exam.type === "Cuối kỳ") return "bg-red-500";
        return "bg-gray-300";
    };

    // Xác định tuần hiện tại
    const getCurrentWeek = () => {
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return { start, end };
    };

    const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

    // Chuyển đổi tuần
    const changeWeek = (step: number) => {
        const newStart = new Date(selectedWeek.start);
        newStart.setDate(newStart.getDate() + step * 7);
        const newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + 6);
        setSelectedWeek({ start: newStart, end: newEnd });
        setCurrentDate(newStart);
    };

    const renderWeekDays = () => {
        const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        return (
            <div className="grid grid-cols-7 border-t border-l border-orange-500 bg-white rounded-lg text-sm sm:text-base">
                {weekDays.map((day, index) => (
                    <div key={index} className="border-r border-b border-orange-500 p-2 sm:p-3 text-center font-semibold text-gray-700">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    // Render lịch theo chế độ tháng hoặc tuần
    const renderCalendar = () => {
        const days = viewMode === "month" ? getDaysInMonth() : getDaysInWeek();

        return (
            <div className="grid grid-cols-7 border-l border-orange-500 bg-white rounded-b-lg text-xs sm:text-sm">
                {days.map((date, index) => {
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

                    let dayExams = exams.filter((exam) => exam.date === formattedDate);

                    // Lọc theo loại bài thi
                    dayExams = dayExams.filter((exam) => filters[exam.type]);

                    // Lọc theo khối
                    if (selectedGrade !== "Tất cả") {
                        dayExams = dayExams.filter((exam) => exam.grade === selectedGrade);
                    }

                    const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();

                    return (
                        <div
                            key={index}
                            className="border-r border-b border-orange-500 min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 cursor-pointer flex flex-col items-center bg-white"
                            onClick={() => setSelectedDate?.(formattedDate)}
                        >
                            <p className={`text-gray-600 text-center w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ${isToday ? "bg-[#8B4513] text-white font-bold" : ""}`}>
                                {date.getDate()}
                            </p>
                            {dayExams.length > 0 && (
                                <div className={`mt-1 p-1 text-white text-xs rounded ${getColorByExam(dayExams)}`}>
                                    {dayExams.map((exam) => (
                                        <div key={exam.id} className="text-center">
                                            <p className="font-bold">{exam.subject}</p>
                                            <p className="italic">{exam.grade}</p>
                                            <p>{exam.startTime} - {exam.endTime}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto bg-white-100 p-2 sm:p-4 rounded-2xl shadow-lg ">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Thanh điều khiển */}
                <div className="bg-black text-white flex flex-wrap items-center px-2 sm:px-4 py-2 sm:py-3 rounded-t-lg text-xs sm:text-base">

                    {/* Phần chọn Tuần/Tháng */}
                    <div className="ml-2 flex items-center bg-gray-800 text-white px-3 py-1 rounded">
                        {viewMode === "week" ? (
                            // Nếu ở chế độ tuần => Hiện chọn tuần
                            <>
                                <button onClick={() => changeWeek(-1)}>{"<"}</button>
                                <span className="mx-2 text-sm">
                                    {selectedWeek.start.getDate()} - {selectedWeek.end.getDate()} Tháng {selectedWeek.start.getMonth() + 1}
                                </span>
                                <button onClick={() => changeWeek(1)}>{">"}</button>
                            </>
                        ) : (
                            // Nếu ở chế độ tháng => Hiện chọn tháng + năm
                            <>
                                <button className="text-lg" onClick={() => handleMonthChange(currentDate.getMonth() - 1)}> {"<"} </button>
                                <select className="mx-1 sm:mx-2 bg-gray-800 text-white text-xs sm:text-sm" value={currentDate.getMonth()} onChange={(e) => handleMonthChange(Number(e.target.value))}>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>Tháng {i + 1}</option>
                                    ))}
                                </select>
                                <select className="mx-1 sm:mx-2 bg-gray-800 text-white text-xs sm:text-sm" value={currentDate.getFullYear()} onChange={(e) => handleYearChange(Number(e.target.value))}>
                                    {Array.from({ length: 20 }, (_, i) => {
                                        const year = today.getFullYear() - 10 + i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                                <button className="text-lg" onClick={() => handleMonthChange(currentDate.getMonth() + 1)}> {">"} </button>
                            </>
                        )}
                    </div>
                    <div className="ml-auto flex gap-1 sm:gap-2">
                        <button className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setViewMode("month")}>
                            Tháng
                        </button>
                        <button className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setViewMode("week")}>
                            Tuần
                        </button>
                        <button className="px-2 sm:px-4 py-1 sm:py-2 rounded bg-green-500 text-white" onClick={goToToday}>
                            Hôm nay
                        </button>
                    </div>

                </div>
                {renderWeekDays()}
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
