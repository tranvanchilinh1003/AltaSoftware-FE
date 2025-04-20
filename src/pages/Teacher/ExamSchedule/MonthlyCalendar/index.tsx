import { useState } from "react";
import Calendar from "./Calendar";
import ExamList from "./ExamList";
import Filter from "./Filter";
import AddressList from "../../../../components/AddressUrlStack/Index";
const labels = [{ link: '', linkName: 'Lịch thi' }];
const ExamPage = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
    const [filters, setFilters] = useState<Record<string, boolean>>({
        "15 phút": true,
        "45 phút": true,
        "Giữa kỳ": true,
        "Cuối kỳ": true,
    });
    const [selectedGrade, setSelectedGrade] = useState<string>("Tất cả");

    // Hàm xử lý thay đổi khối
    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGrade(e.target.value);
    };

    return (
        <div className="flex flex-col gap-4 p-5 w-full max-w-6xl mx-auto">
            <AddressList addressList={labels} />

            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex flex-wrap gap-2 items-center">
                    <select
                        className="border border-gray-300 p-2 rounded"
                        value={selectedGrade}
                        onChange={handleGradeChange}
                    >
                        <option value="Tất cả">Tất cả khối</option>
                        <option value="Khối 10">Khối 10</option>
                        <option value="Khối 11">Khối 11</option>
                        <option value="Khối 12">Khối 12</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                <div className="w-full md:w-3/4">
                    <Calendar setSelectedDate={setSelectedDate} filters={filters} selectedGrade={selectedGrade} />
                </div>
                <div className="w-full md:w-1/4 flex flex-col gap-4">
                    <div className="w-full">
                        <ExamList selectedDate={selectedDate} />
                    </div>
                    <div className="w-full">
                        <Filter filters={filters} setFilters={setFilters} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ExamPage;
