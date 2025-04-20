import { exams } from "./data";
import { Exam } from "./type";
import deleteIcon from "../../../../assets/icons/fi_trash-2.png";
import editIcon from "../../../../assets/icons/fi_edit.png";

const getColorByExam = (exam: Exam) => {
    if (exam.duration === "15 phút") return "#FFD700"; // Vàng
    if (exam.duration === "45 phút") return "#1E90FF"; // Xanh biển
    if (exam.type === "Giữa kỳ") return "#32CD32"; // Xanh lá
    if (exam.type === "Cuối kỳ") return "#FF4500"; // Đỏ
    return "#D3D3D3"; // Mặc định xám
};

interface ExamListProps {
    selectedDate: string | null;
}

const ExamList = ({ selectedDate }: ExamListProps) => {
    const filteredExams = exams.filter((exam) => exam.date === selectedDate);

    return (
        <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:w-[280px]">
            {selectedDate ? (
                <div className="mt-4">
                    <div className="flex items-center justify-center w-full mb-6">
                        {/* Số ngày siêu to, căn giữa theo chiều dọc */}
                        <span className="text-8xl font-bold text-gray-900 flex items-center h-[72px]">
                            {new Date(selectedDate).getDate()}
                        </span>

                        {/* Cột chữ Thứ - Tháng - Năm */}
                        <div className="flex flex-col text-gray-700 text-sm leading-none text-left ml-2 h-[72px] justify-between">
                            <p>Thứ {new Date(selectedDate).getDay() === 0 ? 8 : new Date(selectedDate).getDay()}</p>
                            <p>Tháng {new Date(selectedDate).getMonth() + 1}</p>
                            <p>Năm {new Date(selectedDate).getFullYear()}</p>
                        </div>
                    </div>

                    <div className="border-t-4 border-orange-300 my-2 rounded-full"></div>

                    {filteredExams.length > 0 ? (
                        <div className="mt-4">
                            {filteredExams.map((exam: Exam) => (
                                <div key={exam.id} className="p-3 relative space-y-0">
                                    <h3 className="font-bold text-sm sm:text-base" style={{ color: getColorByExam(exam) }}>
                                        • {exam.subject}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-tight"><b>Đối tượng:</b><span className="text-gray-400"> {exam.examTaker}</span></p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-tight"><b>Thời lượng:</b><span className="text-gray-400"> {exam.duration}</span></p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-tight"><b>Nội dung:</b><span className="text-gray-400"> {exam.content}</span></p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-tight"><b>Hình thức:</b><span className="text-gray-400"> {exam.method}</span></p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">Không có bài thi nào</p>
                    )}

                    {/* Ẩn dòng chữ này nếu không có bài thi */}
                    {filteredExams.length > 0 && (
                        <div className="p-3 relative">
                            <p className="text-red-600 text-xs sm:text-sm"><b>Cố gắng ôn tập cho các bài thi sắp tới nhé</b></p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">Chọn ngày để xem bài thi</p>
            )}
        </div>
    );
};

export default ExamList;