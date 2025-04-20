import { IExam } from './type';
import editIcon from '../../../../assets/icons/fi_edit.png';
import deleteIcon from '../../../../assets/icons/fi_trash-2.png';

interface ExamListProps {
  selectedDate: string | null;
  exams: IExam[];
}

const ExamList = ({ selectedDate, exams }: ExamListProps) => {
  const filteredExams = selectedDate ? exams.filter((exam) => exam.date === selectedDate) : [];

  const getColorByExam = (exam: IExam) => {
    if (exam.duration === '15 phút') return '#FFD700'; // Vàng
    if (exam.duration === '45 phút') return '#1E90FF'; // Xanh biển
    if (exam.type === 'Giữa kỳ') return '#32CD32'; // Xanh lá
    if (exam.type === 'Cuối kỳ') return '#FF4500'; // Đỏ
    return '#D3D3D3'; // Mặc định xám
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:w-[280px]">
      {selectedDate ? (
        <div className="mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {new Date(selectedDate).getDate()}
          </h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
            })}
          </p>
          <div className="border-t-2 border-orange-500 my-2"></div>
          {filteredExams.length > 0 ? (
            <div className="mt-4">
              {filteredExams.map((exam, index) => (
                <div key={exam.id}>
                  {index > 0 && <div className="border-t-2 border-orange-500 my-2"></div>}
                  <div className="p-3 relative" style={{ borderColor: getColorByExam(exam) }}>
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: getColorByExam(exam) }}>
                      • {exam.subject}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      <b>Giáo viên:</b> {exam.teacher}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      <b>Thời lượng:</b> {exam.duration}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      <b>Phân loại:</b> {exam.type}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      <b>Hình thức:</b> {exam.method}
                    </p>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <img src={editIcon} alt="Chỉnh sửa" className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                      <img src={deleteIcon} alt="Xóa" className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">Không có bài thi nào</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">Chọn ngày để xem bài thi</p>
      )}
    </div>
  );
};

export default ExamList;
