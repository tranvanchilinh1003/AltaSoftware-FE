import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Spinner from '../../../../components/Spinner';
import { ExamData } from './type';

const ExamDetailModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    navigate('/leadership/exams', { replace: true });
  };

  const fetchExamSchedule = async (id: string) => {
    const response = await axios.get(`https://fivefood.shop/api/ExamSchedule/${id}`);
    return response.data;
  };  

  useEffect(() => {
    const getExamData = async () => {
      try {
        const data = await fetchExamSchedule(id!);
        if (data.code === 0) {
          setExam(data.data);
        } else {
          setError(data.message || 'Lỗi khi lấy dữ liệu lịch thi.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getExamData();
  }, [id]);

  if (loading) return <div><Spinner /></div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!exam) return <div>Không có dữ liệu lịch thi</div>;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center">
      <div className="modal-container relative p-6 bg-white rounded-lg shadow-lg w-full overflow-auto">
        <svg
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer hover:text-red-500 transition"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.5899 7.38995C19.1367 6.84322 19.1367 5.95678 18.5899 5.41005C18.0432 4.86332 17.1568 4.86332 16.6101 5.41005L12 10.0201L7.38995 5.41005C6.84322 4.86332 5.95678 4.86332 5.41005 5.41005C4.86332 5.95678 4.86332 6.84322 5.41005 7.38995L10.0201 12L5.41005 16.6101C4.86332 17.1568 4.86332 18.0432 5.41005 18.5899C5.95678 19.1367 6.84322 19.1367 7.38995 18.5899L12 13.9799L16.6101 18.5899C17.1568 19.1367 18.0432 19.1367 18.5899 18.5899C19.1367 18.0432 19.1367 17.1568 18.5899 16.6101L13.9799 12L18.5899 7.38995Z"
            fill="#823B00"
          />
        </svg>

        <h1 className="text-3xl font-bold text-center mb-6">{exam.name}</h1>
        <div className="text-base grid grid-cols-4 gap-x-4 gap-y-4">
          <div>
            <span className="font-bold">Môn thi:</span> {exam.subjectName}
          </div>
          <div>
            <span className="font-bold">Phân loại:</span> {exam.type}
          </div>
          <div>
            <span className="font-bold">Thời gian:</span> {exam.duration_in_minutes} phút
          </div>
          <div>
            <span className="font-bold">Học kỳ:</span> {exam.semesterNames}
          </div>
          <div>
            <span className="font-bold">Ngày thi:</span> {new Date(exam.examDay).toLocaleDateString()}
          </div>
          <div>
            <span className="font-bold">Khoa-khối:</span> {exam.gradeLevel}
          </div>
          <div>
          <span className="font-bold">Lớp:</span> {exam.classNames.join(', ')}
          </div>
          <div></div>

          <div className="col-span-4 mt-2">
            <span className="font-bold">Phân công chấm thi:</span>{' '}
            {exam.teacherNames && exam.teacherNames.length > 0 ? exam.teacherNames.join(', ') : 'Chưa có phân công'}
          </div>
        </div>

        {/* File đính kèm */}
        <div className="mt-4">
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.0802 12.4192L11.9002 18.6092C11.09 19.3293 10.0353 19.7125 8.95188 19.6806C7.86846 19.6487 6.83816 19.2041 6.07173 18.4377C5.30531 17.6712 4.86067 16.6409 4.82878 15.5575C4.79688 14.4741 5.18014 13.4194 5.90016 12.6092L13.9002 4.60924C14.3778 4.15553 15.0114 3.90257 15.6702 3.90257C16.3289 3.90257 16.9625 4.15553 17.4402 4.60924C17.9055 5.08083 18.1664 5.71671 18.1664 6.37924C18.1664 7.04177 17.9055 7.67765 17.4402 8.14924L10.5402 15.0392C10.4719 15.1128 10.3898 15.1721 10.2985 15.214C10.2073 15.2558 10.1087 15.2792 10.0084 15.2829C9.90816 15.2866 9.80812 15.2705 9.71405 15.2356C9.61997 15.2007 9.5337 15.1475 9.46016 15.0792C9.38662 15.0109 9.32725 14.9288 9.28544 14.8376C9.24363 14.7464 9.2202 14.6478 9.21648 14.5475C9.21277 14.4472 9.22885 14.3472 9.26379 14.2531C9.29874 14.159 9.35187 14.0728 9.42016 13.9992L14.5502 8.87924C14.7385 8.69093 14.8443 8.43554 14.8443 8.16924C14.8443 7.90293 14.7385 7.64754 14.5502 7.45924C14.3619 7.27093 14.1065 7.16514 13.8402 7.16514C13.5739 7.16514 13.3185 7.27093 13.1302 7.45924L8.00016 12.5992C7.74346 12.8539 7.53973 13.1569 7.40069 13.4908C7.26166 13.8246 7.19008 14.1826 7.19008 14.5442C7.19008 14.9059 7.26166 15.2639 7.40069 15.5977C7.53973 15.9315 7.74346 16.2345 8.00016 16.4892C8.52453 16.9887 9.22097 17.2673 9.94516 17.2673C10.6694 17.2673 11.3658 16.9887 11.8902 16.4892L18.7802 9.58924C19.575 8.73619 20.0078 7.60791 19.9872 6.4421C19.9666 5.27629 19.4944 4.16398 18.6699 3.3395C17.8454 2.51503 16.7331 2.04275 15.5673 2.02219C14.4015 2.00162 13.2732 2.43436 12.4202 3.22924L4.42016 11.2292C3.34136 12.4241 2.76519 13.9891 2.81169 15.5982C2.8582 17.2073 3.52379 18.7365 4.6698 19.867C5.8158 20.9975 7.35384 21.6423 8.96344 21.6669C10.5731 21.6916 12.1301 21.0942 13.3102 19.9992L19.5002 13.8192C19.5934 13.726 19.6674 13.6153 19.7178 13.4935C19.7683 13.3717 19.7943 13.2411 19.7943 13.1092C19.7943 12.9774 19.7683 12.8468 19.7178 12.725C19.6674 12.6032 19.5934 12.4925 19.5002 12.3992C19.4069 12.306 19.2962 12.232 19.1744 12.1816C19.0526 12.1311 18.922 12.1051 18.7902 12.1051C18.6583 12.1051 18.5277 12.1311 18.4059 12.1816C18.2841 12.232 18.1734 12.306 18.5899 12.3992V12.4192Z"
                fill="#C9C4C0"
              />
            </svg>
            <span className="ml-1 font-bold">File đính kèm:</span>
            <span className="ml-2">Loremisump.pdf</span>
          </div>
          <div className="mt-4">
            <button className="w-[113px] h-[32px] border border-orange-600 bg-orange-200 text-black font-semibold rounded-lg hover:bg-orange-300 flex items-center justify-center space-x-1">
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>Tải xuống</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailModal;
