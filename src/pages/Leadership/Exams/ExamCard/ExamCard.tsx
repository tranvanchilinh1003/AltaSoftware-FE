import React, { useState } from 'react';
import { IconTrash, IconEdit } from '../../../../components/Icons/IconComponents';
import { Dropdown, Menu } from 'antd';
import { Exam, ExamStatus, getStatusName, statusOptions } from './type';
import dayjs from 'dayjs';


// Loại bỏ mảng dữ liệu mẫu
// const exams: Exam[] = [ ... ];

interface ExamCardItemProps {
  exam: Exam;
}

const ExamCardItem: React.FC<ExamCardItemProps> = ({ exam }) => {
  const [currentStatus, setCurrentStatus] = useState<ExamStatus>(exam.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const handleOptionClick = ({ key }: { key: string }) => {
    setCurrentStatus(Number(key) as ExamStatus);
    setIsEditingStatus(false);
  };

  const menu = (
    <Menu onClick={handleOptionClick}>
      {statusOptions.map((option) => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 w-80">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[22px] font-bold text-green-text flex items-center">
          <span className="text-[22px] mr-2">•</span> {exam.subject}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditingStatus((prev) => !prev)}
            className="text-orange-text hover:text-orange-700"
          >
            <IconEdit width={24} height={24} />
          </button>
          <button className="text-orange-text hover:text-orange-700">
            <IconTrash width={24} height={24} />
          </button>
        </div>
      </div>

      <div className="text-gray-800 text-base">
        <div className="grid grid-cols-2 gap-x-8 text-start">
          <p className="font-bold">Khối:</p>
          <p className="italic font-normal">{exam.grade}</p>

          <p className="font-bold">Tên kỳ thi:</p>
          <p className="italic font-normal">{exam.examName}</p>

          <p className="font-bold">Học kỳ:</p>
          <p className="italic font-normal">{exam.semester}</p>

          <p className="font-bold">Ngày làm bài:</p>
          <p className="italic font-normal">{dayjs(exam.examDate).format('DD/MM/YYYY')}</p>

          <p className="font-bold">Tình trạng:</p>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            open={isEditingStatus}
            onOpenChange={(visible) => setIsEditingStatus(visible)}
          >
            <p className="italic font-normal cursor-pointer whitespace-nowrap">
              {getStatusName(currentStatus)}
            </p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

interface ExamCardProps {
  // Dữ liệu lấy từ API (kiểu định nghĩa theo API ExamScheduleDetails)
  examDetail: {
    id: number;
    name: string;
    examDay: string;
    durationInMinutes: number;
    type: string;
    form: boolean;
    status: number;
    statusName: string;
    academicYearId: number;
    subject: number;
    semesterId: number;
    gradeLevelsId: number;
    academicYear: string;
    semesterName: string;
    gradeLevelName: string;
    subjectName: string;
    teacherNames: string[];
    // các thuộc tính khác nếu cần
  };
}

const ExamCard: React.FC<ExamCardProps> = ({ examDetail }) => {
  // Chuyển đổi dữ liệu từ examDetail để phù hợp với định dạng của ExamCardItem.
  // Bạn có thể hiệu chỉnh mapping các trường tùy theo yêu cầu.
  const exam: Exam = {
    subject: examDetail.subjectName,        // từ API, lấy tên môn học
    grade: examDetail.gradeLevelsId,          // hoặc có thể dùng examDetail.gradeLevelName nếu muốn hiển thị dưới dạng text
    examName: examDetail.name,                // tên kỳ thi
    semester: examDetail.semesterId,          // có thể thay bằng examDetail.semesterName nếu muốn hiển thị tên học kỳ
    examDate: examDetail.examDay,             // ngày thi
    status: examDetail.status,                // trạng thái thi
  };

  return (
    <div className="grid gap-4">
      <ExamCardItem exam={exam} />
    </div>
  );
};

export default ExamCard;
