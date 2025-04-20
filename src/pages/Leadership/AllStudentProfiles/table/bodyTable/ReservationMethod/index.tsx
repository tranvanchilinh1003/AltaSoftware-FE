import { useState } from 'react';
import { Link } from 'react-router';
import CalendarInput from '../../../../../../components/CalendarInput';
import AttachFile from '../../../../../../components/AttachFile';

const ReservationMethod: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (file: File) => {
    setFileName(file.name);
  };
  return (
    <div className="flex justify-center items-center max-h-screen p-10">
      <div className="bg-white rounded-2xl w-full max-w-[884px] h-auto shadow-lg flex flex-col">
        <form className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-black-text text-center text-2xl font-bold mb-5">Cập nhật bảo lưu</h2>
          {/*  */}
          <div className="flex flex-col md:flex-row items-left justify-left">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tên học viên:</label>
            <p className="nameStudent">123</p>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Lớp hiện tại:</label>
            <div className="relative w-full md:w-9/12">
              <p className="classStudent"> 12A1</p>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Ngày chuyển bảo lưu:</label>
            <div className="relative w-full md:w-9/12 flex gap-4">
              <CalendarInput selectedDate={new Date()} locale="vi-VN" placeholder="Chọn ngày" />
              <input type="text" className="w-full md:w-3/12 p-2 rounded-lg text-black-text cursor-pointer bg-gray-200" value="Học kì 1" disabled />
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-start justify-start mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Thời hạn bảo lưu:</label>
            <input
              type="text"
              className={`w-full md:w-9/12 p-2 rounded-lg cursor-pointer transition-all ${
                isFocused ? 'border border-gray-400 bg-white' : 'border bg-gray-100'
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
              placeholder="Nhập tên trường"
            />
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-start justify-between">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0 self-start">Lí do chuyển lớp:</label>
            <div className="relative w-full md:w-9/12">
              <textarea
                className={`w-full h-32 md:h-30 p-2 rounded-lg cursor-pointer transition-all ${
                  isTextareaFocused ? 'border border-gray-400 bg-white' : 'border bg-gray-100'
                }`}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={(e) => setIsTextareaFocused(e.target.value !== '')}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0"></label>
            <p className="italic text-gray-500">Kết quả học tập của viên sẽ được bảo lưu trong hồ sơ học viên.</p>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tệp đính kèm:</label>
            <AttachFile fileName={fileName} onFileChange={handleFileChange} />
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0"></label>
            <p className="italic text-gray-500">Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
          </div>
          {/* <hr className="my-6 border-gray-300" /> */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
            <Link to="">
              <button className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg">Hủy</button>
            </Link>

            <button className="w-full md:w-40 py-2 bg-orange-text text-white font-bold rounded-lg">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationMethod;
