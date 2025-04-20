import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Calendar from './Calendar';
import ExamList from './ExamList';
import { IExam } from './type';

const API_URL = process.env.REACT_APP_API_URL;

interface ExamPageProps {
  academicYearId: string;
  gradeLevelsId: string;
  classId: string;
}

interface ApiCalendarData {
  code: number;
  message: string;
  data: Array<{
    year: number;
    months: Array<{
      month: number;
      days: Array<{
        day: number;
        exams: ApiExam[];
      }>;
    }>;
  }>;
}

interface ApiExam {
  id: number;
  name: string;
  examDay: string;
  duration_in_minutes: number;
  type: string;
  form: boolean;
  status: number;
  statusName: string;
  academicYearId: number;
  subject: number;
  semesterIds: number[];
  gradeLevelsId: number;
  academicYear: string;
  subjectName: string;
  semesterNames: string[];
  gradeLevel: string;
  classNames: string | null;
  teacherNames: string[];
}

const transformApiExamToExam = (apiExam: ApiExam): IExam => {
  return {
    id: apiExam.id,
    subject: apiExam.subjectName,
    duration: `${apiExam.duration_in_minutes} phút`,
    type: apiExam.type.includes('Giữa')
      ? 'Giữa kỳ'
      : apiExam.type.includes('Cuối')
      ? 'Cuối kỳ'
      : apiExam.type,
    date: apiExam.examDay.substring(0, 10), // Lấy phần date (yyyy-mm-dd)
    teacher:
      apiExam.teacherNames && apiExam.teacherNames.length > 0
        ? apiExam.teacherNames.join(', ')
        : '',
    method: apiExam.form ? 'Tự luận' : 'Trắc nghiệm',
  };
};

const ExamPage = ({ academicYearId, gradeLevelsId, classId }: ExamPageProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [exams, setExams] = useState<IExam[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiCalendarData>(
          `${API_URL}/ExamSchedule/calendar-structured`,
          { 
            // Truyền params từ props. Nếu chưa chọn bộ lọc thì có thể gán giá trị mặc định hoặc không truyền
            params: { 
              academicYearId: academicYearId || undefined, 
              gradeLevelsId: gradeLevelsId || undefined, 
              // Nếu bạn có truyền classId và nếu API hỗ trợ lọc theo class thì truyền vào
              classId: classId || undefined, 
              // Nếu có param semesterId, bạn có thể gán mặc định hoặc truyền từ bên ngoài (ở đây ví dụ mặc định là 1)
              semesterId: 1
            } 
          }
        );
        if (response.data.code === 0) {
          let examList: IExam[] = [];
          // Duyệt qua cấu trúc: năm → tháng → ngày → danh sách exam
          response.data.data.forEach((yearItem) => {
            yearItem.months.forEach((monthItem) => {
              monthItem.days.forEach((dayItem) => {
                dayItem.exams.forEach((apiExam) => {
                  examList.push(transformApiExamToExam(apiExam));
                });
              });
            });
          });
          setExams(examList);
        } else {
          setError(response.data.message);
          toast.error(response.data.message);
        }
      } catch (err: any) {
        setError('Failed to fetch exams.');
        toast.error('Failed to fetch exams.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [academicYearId, gradeLevelsId, classId]);

  if (loading) return <div>Loading exams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 w-full mx-auto rounded-lg shadow-md bg-white ">
      <div className="flex justify-between items-center mt-6 mb-3">
        <h2 className="font-bold text-lg md:text-xl ml-8">Danh sách bài thi</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
        <div className="w-full md:w-3/4 m-0">
          {/* Truyền hàm setSelectedDate và mảng exams xuống cho Calendar */}
          <Calendar exams={exams} setSelectedDate={setSelectedDate} />
        </div>
        <div className="w-full md:w-1/4">
          {/* Truyền selectedDate và mảng exams xuống cho ExamList */}
          <ExamList selectedDate={selectedDate} exams={exams} />
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
