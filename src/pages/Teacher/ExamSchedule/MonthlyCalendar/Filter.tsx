import { useState } from "react";
import { exams } from "./data";
import { Exam } from "./type";
import ExamList from "./ExamList";

interface CalendarProps {
    setSelectedDate?: (date: string | null) => void;
    filters: Record<string, boolean>; // ✅ Thêm prop filters
    setFilters: React.Dispatch<React.SetStateAction<Record<string, boolean>>>; // ✅ Thêm prop setFilters
}
const Filter = ({ setSelectedDate, filters, setFilters }: CalendarProps) => {
    const toggleFilter = (filter: string) => {
        setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };

    // Màu sắc của checkbox khi checked
    const checkboxColors: Record<string, string> = {
        "15 phút": "checked:bg-yellow-400 checked:border-yellow-500",
        "45 phút": "checked:bg-blue-400 checked:border-blue-500",
        "Giữa kỳ": "checked:bg-green-400 checked:border-green-500",
        "Cuối kỳ": "checked:bg-red-400 checked:border-red-500",
    };

    // Tiền tố tương ứng cho từng loại kiểm tra
    const labelPrefix: Record<string, string> = {
        "15 phút": "Kiểm tra",
        "45 phút": "Kiểm tra",
        "Giữa kỳ": "Thi giữa học kỳ",
        "Cuối kỳ": "Thi cuối học kỳ",
    };

    return (
        <div className="flex gap-4 sm:w-[280px]">
            <div>
                <div className="bg-white p-4 mt-4 rounded-lg shadow-md sm:w-[280px]">
                    <h3 className="text-lg font-semibold mb-2">Lọc lịch thi</h3>
                    {Object.keys(filters).map((key) => (
                        <label key={key} className="flex items-center mb-2 cursor-pointer">
                            {/* Checkbox có dấu ✔ khi check */}
                            <input
                                type="checkbox"
                                checked={filters[key]}
                                onChange={() => toggleFilter(key)}
                                className={`w-5 h-5 border-2 rounded appearance-none cursor-pointer transition-all flex items-center justify-center 
                                    border-gray-400 ${checkboxColors[key] || ""} 
                                    checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:flex checked:before:items-center checked:before:justify-center`}
                            />
                            {/* Hiển thị nhãn đúng format */}
                            <span className="ml-2 text-gray-400">
                                {key === "15 phút" || key === "45 phút" ? `${labelPrefix[key]} ${key}` : labelPrefix[key]}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;
