import React, { useState } from 'react';
import { IExamSession } from './type';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/Icons/IconComponents';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import AddressList from '../../../../components/AddressUrlStack/Index';
import { useNavigate } from 'react-router-dom';
const avatar = require('../../../../assets/images/teacher.png');

const mockExamData: IExamSession = {
  id: 1,
  teacher: 'Nguyễn Văn A',
  avatar: '',
  class: '6',
  subject: 'Lịch sử',
  startDate: '19/08/2020',
  endDate: '24/08/2020',
  describe: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat, nulla nec tincidunt tincidunt, neque erat bibendum lectus',
  sessions: [
    { id: 1, sessions: 1, date: '19/08/2020', time: '14:00 - 14:45', studentCount: 107 },
    { id: 2, sessions: 2, date: '20/08/2020', time: '14:00 - 14:45', studentCount: 23 },
    { id: 3, sessions: 3, date: '21/08/2020', time: '15:00 - 15:45', studentCount: 23 },
    { id: 4, sessions: 4, date: '22/08/2020', time: '15:00 - 16:30', studentCount: 23 },
    { id: 5, sessions: 5, date: '23/08/2020', time: '16:00 - 16:45', studentCount: 23 },
    { id: 6, sessions: 6, date: '24/08/2020', time: '16:00 - 16:45', studentCount: 23 },
  ],
  totalSessions: 6,
  password: '12345678',
  examCode: '785 4512 6325',
  link: 'https://school.edu.vn/baiang/10aidaisobtl1',
  options: [
    'Tự động kích hoạt buổi học khi đến thời gian bắt đầu',
    'Bật tính năng lưu lại buổi học',
    'Cho phép học viên/cá nhân tham gia chia sẻ buổi học',
  ],
};

const ExamSchedule: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [urls, setUrls] = useState([
    { link: '/', linkName: 'Quản lý lớp học' },
    { link: '/', linkName: 'Thông tin lớp học' },
    { link: '/', linkName: 'Lịch sử' },
  ]);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const labels = ['Thông tin lớp học', 'Hỏi đáp Q & A'];
  const paths = ['/teacher/class-list/class-information-done', '/hoi-dap'];

  function handleTabClick(index: number) {
    setActiveTab(index);
    navigate(paths[index]);
  }

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="p-3">
        <AddressList addressList={urls} />
      </div>
      <div className="p-3">
        {labels.map((label, index) => {
          const isActive = activeTab === index;
          return (
            <button key={index} className={`tab-button ${isActive ? 'active' : ''}`} onClick={handleTabClick.bind(null, index)}>
              {label}
            </button>
          );
        })}
      </div>
      <div className=" relative  bg-gray-50 rounded-[16px] shadow-[0_0_10px_#9ACAF540] mx-auto w-full max-w-[1680px] min-h-[720px] mb-10">
        {/* Header */}
        <div className="flex items-center shadow-sm p-4 pl-8">
          {/* Avatar */}
          <img src={avatar} alt="Teacher" className="w-[110px] h-[110px] rounded-full object-cover mr-12" />

          {/* Thông tin giáo viên */}
          <div className="flex-1 grid grid-cols-[1fr_2fr] gap-4 ml-4">
            {/* Cột trái */}
            <div className="border-l pl-12">
              <p className="text-base font-bold text-gray-700">
                Giáo viên: <span className="font-normal">{mockExamData.teacher}</span>
              </p>
              <p className="text-base font-bold text-gray-700">
                Bộ môn: <span className="font-normal">{mockExamData.subject}</span>
              </p>
            </div>

            {/* Cột phải */}
            <div className="border-l pl-12">
              <p className="text-base font-bold text-gray-700">
                Mô tả:
                <span className="font-normal text-gray-500">
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat, nulla nec tincidunt tincidunt, neque erat bibendum lectus
                </span>
              </p>
              <p className="text-base font-bold text-gray-700">
                Lớp: <span className="font-normal">10A1</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F3F6] pb-6 pl-8">
          {/* Main Content */}
          <div className="max-w-sm ml-[208px] p-4 rounded-md ">
            <div className="grid grid-cols-2 gap-y-2">
              <div className="font-bold text-gray-700">Lịch học</div>
              <div className="text-gray-700 text-right text-start">
                Tổng số <span className="font-bold">{mockExamData.totalSessions}</span> buổi
              </div>

              <div className="font-bold text-gray-700">Ngày bắt đầu</div>
              <div className="text-gray-700 text-right text-start">{mockExamData.startDate}</div>

              <div className="font-bold text-gray-700">Ngày kết thúc</div>
              <div className="text-gray-700 text-right text-start">{mockExamData.endDate}</div>
            </div>
          </div>

          {/* Session Grid */}
          <div className="flex items-center gap-2 mb-6 ml-[192px] ">
            <span className="text-gray-400 text-2xl cursor-pointer">
              <ArrowLeftIcon />
            </span>
            <div className="flex gap-3 overflow-x-auto">
              {mockExamData.sessions.map((session) => (
                <div key={session.id} className="bg-background-gray p-3 rounded-lg text-center min-w-[120px] shadow-sm">
                  <p className=" font-bold text-base text-grey-text bg-white rounded-[14px] h-[27px] items-center justify-center">
                    Buổi {session.sessions}
                  </p>
                  <p className="text-base text-while-text font-bold">{session.date}</p>
                  <p className="text-lg text-while-text font-bold">{session.time}</p>
                </div>
              ))}
            </div>
            <span className="text-gray-400 text-2xl cursor-pointer">
              {' '}
              <ArrowRightIcon />
            </span>
          </div>
        </div>
        {/* Bottom Info: Thông tin Mã lớp, Bảo mật, Cài đặt khác, Link chia sẻ */}
        <div className="p-6 pl-[256px] mr-8">
          {/* Mã lớp */}
          <div className="flex items-center mb-4">
            <label className="w-32 text-gray-700 font-bold">Mã lớp</label>
            <span className="text-gray-800">{mockExamData.examCode}</span>
          </div>

          {/* Bảo mật */}
          <div className="flex items-center mb-4">
            <label className="w-32 text-gray-700 font-bold">Bảo mật</label>
            <div className="relative w-[434px]">
              <input
                type={showPassword ? 'text' : 'password'}
                readOnly
                value={mockExamData.password}
                className="border border-gray-300 rounded-md p-2 text-gray-800 bg-gray-50 w-full pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-orange-500" onClick={handleToggleShowPassword}>
                {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
              </span>
            </div>
          </div>
          {/* Cài đặt khác */}
          <div className="flex items-start mb-4">
            {/* Label bên trái */}
            <p className="w-32 text-gray-700 font-bold">Cài đặt khác</p>

            {/* Các checkbox bên phải */}
            <div className="flex flex-col space-y-2">
              {mockExamData.options.map((option, idx) => (
                <div className="flex items-center" key={idx}>
                  <input type="checkbox" id={`option-${idx}`} className="mr-2 rounded" />
                  <label htmlFor={`option-${idx}`} className="text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Link chia sẻ */}
          <div className="flex items-center">
            <label className="w-32 text-gray-700 font-bold">Link chia sẻ</label>
            <input
              type="text"
              className="w-[434px] border border-gray-300 rounded-md p-2 text-gray-800 bg-gray-50"
              value={mockExamData.link}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamSchedule;
