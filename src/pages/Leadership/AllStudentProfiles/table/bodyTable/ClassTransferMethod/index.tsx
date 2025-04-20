import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarInput from '../../../../../../components/CalendarInput';
import Dropdown from '../../../../../../components/Dropdown';
import { DropdownOption } from '../../../../../../components/Dropdown/type';
import AttachFile from '../../../../../../components/AttachFile';

const ClassTransferMethod: React.FC = () => {
  const classOption: DropdownOption[] = [
    { label: 'Lớp 1', value: 'class-1' },
    { label: 'Lớp 2', value: 'class-2' },
    { label: 'Lớp 3', value: 'class-3' },
    { label: 'Lớp 4', value: 'class-4' },
    { label: 'Lớp 5', value: 'class-5' },
    { label: 'Lớp 6', value: 'class-6' },
    { label: 'Lớp 7', value: 'class-7' },
    { label: 'Lớp 8', value: 'class-8' },
    { label: 'Lớp 9', value: 'class-9' },
    { label: 'Lớp 10', value: 'class-10' },
    { label: 'Lớp 11', value: 'class-11' },
    { label: 'Lớp 12', value: 'class-12' },
  ];
  const [selectedClassOption, setSelectedClassOption] = useState<DropdownOption | null>(classOption[0]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (file: File) => {
    setFileName(file.name);
  };

  return (
    <div className="flex justify-center items-center max-h-screen p-10">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] h-auto shadow-lg flex flex-col">
        <form className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-black-text text-center text-2xl font-bold mb-5">Cập nhật chuyển lớp</h2>

          <div className="flex flex-col md:flex-row items-left justify-left mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tên học viên:</label>
            <p className="nameStudent">123</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Lớp hiện tại:</label>
            <div className="relative w-full md:w-9/12">
              <p className="classStudent"> 12A1</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Ngày chuyển lớp:</label>
            <div className="relative w-full md:w-9/12 flex gap-4">
              <CalendarInput selectedDate={new Date()} locale="vi-VN" placeholder="Chọn ngày" />
              <input
                type="text"
                className="w-full md:w-3/12 p-2 rounded-lg text-black-text cursor-pointer bg-gray-200"
                defaultValue="Học kì 1"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-start mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Chuyển đến lớp:</label>
            <Dropdown
              placeholder="Chuyển đến lớp"
              size="short"
              options={classOption}
              selectedOption={selectedClassOption}
              onSelect={(option) => setSelectedClassOption(option)}
              handleOptionClick={(option) => setSelectedClassOption(option)}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tệp đính kèm:</label>
            <AttachFile fileName={fileName} onFileChange={handleFileChange} />
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0"></label>
            <p className="italic text-gray-500">Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
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

export default ClassTransferMethod;
