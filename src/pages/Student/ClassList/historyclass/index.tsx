import React, { useState } from 'react';
import AddressList from '../../../../components/AddressUrlStack/Index';
import { classScheduleData } from './data';
import CheckboxComponent from '../../../../components/CheckBox';
import './style.css';
import arrowleftgray from '../../../../assets/icons/arrow left.png';
import iconeye from '../../../../assets/icons/orange_eye_outline.png';
import iconeyeoff from '../../../../assets/icons/visibility_off.png';
import arrowright from '../../../../assets/icons/icon-arrow-right.png';
import calendar from '../../../../assets/icons/icon-calendar.png';

const labels = [
  { link: '/', linkName: 'Quản lý lớp học' },
  { link: '/', linkName: 'Thông tin lớp học' },
  { link: '/', linkName: 'Lịch sử' },
];

const HistoryClass: React.FC = () => {
  const [form, setForm] = useState(classScheduleData);
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const convertToISO = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (newDate: string) => {
    setForm((prev) => ({
      ...prev,
      endDate: { ...prev.endDate, date: convertToISO(newDate) },
    }));
  };

  return (
    <div className="py-4 pr-10 pl-5 ">
      <AddressList addressList={labels} />
      <div className="bg-white rounded-[16px] shadow-md w-full  mx-auto py-5">
        <div className="w-auto flex items-center gap-6 pl-[64px] pt-[24px] pb-[26px]">
          <img src={classScheduleData.avatar} alt="Teacher" className="w-[110px] h-[110px] rounded-full object-cover" />

          <div className="border-l h-[110px] border-gray-300"></div>

          <div className="flex flex-col text-gray-700 text-left ml-2">
            <div className={`flex m-2 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
              <div className="text-base font-bold w-20">Giáo viên:</div>
              <span className="ml-2">{classScheduleData.teacher}</span>
            </div>
            <div className={`flex m-2 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
              <div className="text-base font-bold w-20">Bộ môn:</div>
              <span className="ml-2">{classScheduleData.subject}</span>
            </div>
          </div>

          <div className="border-l h-16 border-gray-300"></div>

          <div className="flex flex-col text-gray-700 text-left">
            <div className={`flex m-2 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
              <div className="text-base font-bold w-20">Mô tả:</div>
              <span>{classScheduleData.description}</span>
            </div>
            <div className={`flex m-2 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
              <div className="text-base font-bold w-20">Lớp:</div>
              <span>{classScheduleData.className}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6">
          <div className="max-w-lg ml-[290px] p-4 rounded-md">
            <div className="flex flex-col gap-3 text-left">
              {/* Lịch học */}
              <div className={`flex items-center gap-4 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
                <p className="font-bold w-1/3">Lịch học</p>
                <p>
                  Tổng số <span className="font-bold">{classScheduleData.sessions.length}</span> buổi
                </p>
              </div>

              {/* Thời lượng */}
              <div className={`flex items-center gap-4 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
                <p className="font-bold w-1/3">Thời lượng</p>
                <p>{classScheduleData.duration} phút</p>
              </div>

              {/* Ngày bắt đầu */}
              <div className={`flex items-center gap-4 ${isRecordingEnabled ? 'text-black-text' : 'text-gray-500'}`}>
                <p className="font-bold w-1/3">Ngày bắt đầu</p>
                <p>{classScheduleData.startDate}</p>
              </div>

              {/* Ngày kết thúc */}
              <div className="flex items-center gap-4">
                <p className="font-bold text-gray-700 w-1/3">Ngày kết thúc</p>
                <div className="flex gap-2 flex-1 w-2/3">
                  {/* Ô nhập ngày với icon lịch */}
                  <div className="relative w-1/2">
                    <input
                      type="date"
                      className="border rounded p-2 text-gray-700 w-full pr-10"
                      value={convertToISO(classScheduleData.endDate?.date)}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                    <img src={calendar} alt="Calendar" className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                  </div>

                  {/* Ô nhập thời gian */}
                  <input type="time" className="border rounded p-2 text-gray-700 w-1/2 h-full" value={classScheduleData.endDate.time} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative  flex items-center justify-center">
            <button className="left-4 md:left-16 top-1/2 transform -translate-y-1/2 hidden md:block">
              <img src={arrowleftgray} alt="Scroll Left" className="w-5 h-5" />
            </button>

            {/* Danh sách buổi học */}
            <div className="">
              <div className="flex gap-4 whitespace-nowrap p-4 overflow-x-auto scrollbar-hide max-w-[1200px]">
                {classScheduleData.sessions.slice(0, 7).map((session) => {
                  let bgColor = 'bg-gray-400';
                  let textColor = 'text-gray-400';

                  if (session.status === 'current') {
                    bgColor = 'bg-orange-500';
                    textColor = 'text-orange-500';
                  } else if (session.status === 'upcoming') {
                    bgColor = 'bg-blue-500';
                    textColor = 'text-blue-500';
                  }
                  return (
                    <div key={session.id} className={`p-4 mx-2 rounded-lg text-center min-w-[120px] shadow-md text-white ${bgColor}`}>
                      <p className={`font-bold bg-white border border-white rounded-full px-6 py-1 inline-block ${textColor} mb-4`}>
                        Buổi {session.title}
                      </p>
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-sm text-white font-bold">{session.date}</div>
                        <div className="text-2xl text-white font-bold">{session.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nút cuộn phải */}

            <button className="right-4 md:right-16 top-1/2 transform -translate-y-1/2 hidden md:block">
              <img src={arrowright} alt="Scroll Right" className="w-3 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg">
          <div className="max-w-3xl ml-[290px] p-4 rounded-md">
            <div className="flex flex-col gap-2 text-left">
              {/* Mã lớp */}
              <div className="flex items-center gap-x-4">
                <p className="font-bold text-gray-700 w-1/5 min-h-[40px] flex items-center">Mã lớp</p>
                <div>
                  <p>{classScheduleData.classCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 relative">
                <p className="font-bold text-gray-700 w-1/5 min-h-[40px] flex items-center">Bảo mật</p>
                <div className="flex-1 max-w-[434px] min-h-[40px] relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full border rounded p-2 text-gray-700 min-h-[40px]"
                    value={classScheduleData.securityCode}
                    readOnly
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={showPassword ? iconeye : iconeyeoff} alt="Toggle Password" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <p className="font-bold text-gray-700 w-1/5 min-h-[40px] flex items-center">Link chia sẻ</p>
                <div className="flex-1 flex min-h-[40px] ">
                  <input
                    type="text"
                    className="max-w-[434px] flex-1 border rounded p-2 text-gray-700 min-h-[40px]"
                    value={classScheduleData.shareLink}
                    readOnly
                  />
                </div>
                <button className="bg-orange-500 text-white px-3 py-2 rounded flex-shrink-0">Copy link</button>
              </div>

              {/* Cài đặt khác */}
              <div className="flex items-start gap-x-4">
                <p className="font-bold text-gray-700 w-1/5 min-h-[40px] flex items-center">Cài đặt khác</p>
                <div className="flex flex-col gap-2 flex-1 max-w-[434px]">
                  <CheckboxComponent
                    label="Tự động kích hoạt buổi học khi đến thời gian bắt đầu"
                    isChecked={form.autoStart}
                    isIndeterminate={false}
                    onChange={(e) => setForm({ ...form, autoStart: e.target.checked })}
                    customStyles={{ label: { textTransform: 'none' } }}
                  />

                  <CheckboxComponent
                    label="Bật tính năng lưu lại buổi học"
                    isChecked={isRecordingEnabled}
                    isIndeterminate={false}
                    onChange={(e) => setIsRecordingEnabled(e.target.checked)}
                    customStyles={{ label: { textTransform: 'none' } }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">Tham gia lớp học</button>
      </div>
    </div>
  );
};

export default HistoryClass;
