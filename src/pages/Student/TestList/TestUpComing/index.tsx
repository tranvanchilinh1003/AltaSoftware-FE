import React, { useState } from 'react';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import SearchInputProps from '../../../../components/SearchInput';
import icon from '../icon';
import CalendarInput from '../../../../components/CalendarInput/index';
import data from '../Types/data';
import Button from '../../../../components/Button';

const TestUpComing: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const subjectOptions = ['Tiếng Anh', 'Toán'];
  const number = ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4', 'Khối 5'];

  return (
    <div className="block h-full w-full">
      {/* Bộ lọc */}
      <div className="flex items-center justify-between mb-6 px-2 md:px-10 w-full">
        <div className="flex space-x-2">
          <div>
            <div className="text-lg font-bold">Chọn bộ môn</div>
            <DropdownSelectionComponent width={'10rem'} placeholder="Chọn bộ môn..." options={subjectOptions} />
          </div>
          <div>
            <div className="text-lg font-bold">Chọn khối</div>
            <DropdownSelectionComponent width={'6rem'} placeholder="Chọn khối..." options={number} />
          </div>
          <div>
            <div className="text-lg font-bold">Chọn ngày</div>
            <CalendarInput popupStyle={{ top: '28.1em' }} selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className="mt-5">
            <Button children={'Lọc kết quả'} className="primary btn-custom" />
          </div>
        </div>
        <SearchInputProps placeholder="Tìm kiếm theo topic..." />
      </div>

      {/* Bảng hiển thị */}
      <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
        <div className="relative w-full border rounded-lg overflow-hidden">
          <table className="table-auto min-w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
              <tr>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Lớp</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Nội dung kiểm tra</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Môn học</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Ngày làm bài</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Thời lượng</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Tình trạng</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Bài làm</th>
                <th className="w-16"></th>
              </tr>
            </thead>

            <tbody className="max-h-48 overflow-y-auto">
              {data
                .filter((item) => item.status === 'Chưa bắt đầu' && item.action==='Chưa bắt đầu')
                .map((item, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="py-3 px-4">{item.subject}</td>
                    <td className="py-3 px-4">{item.content}</td>
                    <td className="py-3 px-4">{item.teacher}</td>
                    <td className="py-3 px-4">{item.examDate}</td>
                    <td className="py-3 px-4">{item.duration}</td>
                    <td className="py-3 px-4 text-left text-red-status italic">{item.status}</td>
                    <td className="py-3 px-4 text-left text-red-status italic">{item.action}</td>
                    <td className="text-left">
                      <img src={icon.infoOutline} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestUpComing;
