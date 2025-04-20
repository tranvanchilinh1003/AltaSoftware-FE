import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarInput from '../../../../components/CalendarInput';

import AttachFile from '../../../../components/AttachFile';

const UpdateDiscipline: React.FC = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (file: File) => {
    setFileName(file.name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[884px] shadow-lg">
        <div className="w-full flex flex-col gap-6">
          {/* Tiêu đề */}
          <h2 className="text-black-text text-center text-2xl font-bold">Cập nhật khen thưởng</h2>

          {/* Học viên */}
          <div className="flex flex-col md:flex-row">
            <label className="md:w-3/12 font-bold text-base">Học viên:</label>
            <p className="md:w-9/12 text-black">Nguyễn Ngọc Tuyết</p>
          </div>

          {/* Lớp hiện tại */}
          <div className="flex flex-col md:flex-row">
            <label className="md:w-3/12 font-bold text-base">Lớp hiện tại:</label>
            <p className="md:w-9/12 text-black">10A</p>
          </div>

          {/* Ngày khen thưởng */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-3/12 font-bold text-base">
              Ngày khen thưởng<span className="text-red-500">*</span>:
            </label>
            <div className="flex w-full md:w-9/12 gap-4">
              <CalendarInput selectedDate={new Date()} locale="vi-VN" placeholder="Chọn ngày" />
              <input
                type="text"
                className="w-1/5 rounded-lg text-black-text cursor-pointer bg-gray-100 text-center"
                defaultValue="Học kỳ 1"
                disabled
              />
            </div>
          </div>

          {/* Nội dung */}
          <div className="flex flex-col md:flex-row items-start">
            <label className="md:w-3/12 font-bold text-base">
              Nội dung<span className="text-red-500">*</span>:
            </label>
            <textarea className="w-full md:w-9/12 h-32 bg-gray-100 p-3 rounded-lg resize-y" placeholder="Lorem ipsum dolor sit amet..."></textarea>
          </div>

          {/* Tệp đính kèm */}
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-3/12 font-bold text-base">
              Tệp đính kèm<span className="text-red-500">*</span>:
            </label>
            <div className="w-full md:w-12/12 flex items-center pl-10">
              <AttachFile fileName={fileName} onFileChange={handleFileChange} />
            </div>
          </div>

          {/* Nút Hủy & Lưu */}
          <div className="flex justify-center gap-6 mt-4">
            <Link to="">
              <button className="w-32 h-12 py-2 bg-gray-200 text-black-text font-bold rounded-lg">Hủy</button>
            </Link>
            <button className="w-32 h-12 py-2 bg-orange-500 text-white font-bold rounded-lg">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDiscipline;
