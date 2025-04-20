import { useState } from 'react';
import { Link } from 'react-router';
import Dropdown from '../../../../../../components/Dropdown';
import { DropdownOption } from '../../../../../../components/Dropdown/type';
import './style.css';

const ExemptionMethod: React.FC = () => {
  const [selectedClassOption, setSelectedClassOption] = useState<DropdownOption | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const classOption: DropdownOption[] = [
    { label: 'Hộ nghèo', value: 'poor-household' },
    { label: 'Hộ cận nghèo', value: 'near-poor-household' },
    { label: 'Trẻ em khuyết tật', value: 'disabled-children' },
    { label: 'Học sinh dân tộc thiểu số rất ít người', value: 'ethnic-minority-students' },
    { label: 'Học sinh ở vùng đặc biệt khó khăn', value: 'difficult-area-students' },
    { label: 'Con thương binh, liệt sĩ', value: 'martyrs-family' },
    { label: 'Học sinh mồ côi cả cha lẫn mẹ', value: 'orphans' },
    { label: 'Học sinh bị ảnh hưởng bởi thiên tai, dịch bệnh', value: 'natural-disaster-affected' },
  ];
  return (
    <div className="flex justify-center items-center max-h-screen p-10">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] h-auto shadow-lg flex flex-col">
        <form className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-black-text text-center text-2xl font-bold mb-5">Cập nhật miễn giảm</h2>
          {/*  */}
          <div className="flex flex-col md:flex-row items-left justify-left mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tên học viên:</label>
            <p className="nameStudent">123</p>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Lớp hiện tại:</label>
            <div className="relative w-full md:w-9/12">
              <p className="classStudent"> 12A1</p>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Đối tượng miễn giảm:</label>
            <Dropdown
              placeholder="Hình thức miễn giảm"
              size="medium"
              options={classOption}
              selectedOption={selectedClassOption}
              onSelect={(option) => setSelectedClassOption(option)}
              handleOptionClick={(option) => setSelectedClassOption(option)}
            />
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-start justify-start mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Hình thức miễn giảm</label>
            <input
              type="text"
              className={`w-full md:w-9/12 p-2 rounded-lg cursor-pointer transition-all ${
                isFocused ? 'border border-gray-400 bg-white' : 'border bg-gray-100'
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
            />
          </div>
          {/* <hr className="my-6 border-gray-300" /> */}
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

export default ExemptionMethod;
