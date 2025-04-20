import React, { useState } from 'react';
import { IFileOption, SearchResultProps } from './type';
import { IconArrowCaretDown } from '../../../../components/Icons';
import ScoreBoardExport from '../ScoreBoard/ScoreBoardExport';


const SearchResult: React.FC<SearchResultProps> = ({ scoreBoardClass, scoreBoard }) => {
  // Sử dụng dữ liệu lớp từ scoreBoardClass
  const classInfo = scoreBoardClass;
  
  // Format thời gian bắt đầu
  const startDate = new Date(classInfo.startDate);
  const formattedStartDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(startDate);

  const formattedStartTime =
    startDate.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' (GMT +7 Bangkok)';
  
  // Các tùy chọn định dạng file để xuất
  const fileOptions: IFileOption[] = [
    { value: 'xlsx', label: 'Excel -.xlsx' },
    { value: 'pdf', label: 'PDF -.pdf' },
    { value: 'csv', label: 'CSV -.csv' },
  ];

  // Sử dụng kiểu union cho selectedFile, đảm bảo luôn có giá trị đúng (xlsx | pdf | csv)
  const [selectedFile, setSelectedFile] = useState<'xlsx' | 'pdf' | 'csv'>(fileOptions[0].value as 'xlsx');
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border border-orange-300 rounded-md bg-orange-50">
      <div className="flex justify-between">
        {/* Thông tin lớp học */}
        <div className="space-y-2">
          <p className="font-semibold">
            Môn học: <span className="font-normal ml-8">{classInfo.subject.name}</span>
          </p>
          <p className="font-semibold">
            Lớp: <span className="font-normal ml-16">{classInfo.name}</span>
          </p>
          <p className="font-semibold">
            Mã lớp: <span className="font-normal ml-10">{classInfo.code}</span>
          </p>
        </div>

        {/* Thời gian bắt đầu */}
        <div>
          <p>
            <span className="font-semibold">Thời gian bắt đầu:</span> {formattedStartDate}
          </p>
          <p className="ml-32">{formattedStartTime}</p>
        </div>

        {/* Nút xuất file và dropdown chọn định dạng */}
        <div className="text-right">
          <p className="font-semibold mb-2 text-start">In bảng điểm:</p>
          <div className="flex items-center space-x-2">
            {/* Component xuất file: truyền danh sách học viên dưới dạng scoreBoard */}
            <ScoreBoardExport data={scoreBoard} exportType={selectedFile} />
            
            {/* Dropdown chọn định dạng file */}
            <div
              className="relative"
              style={{ width: '136px', height: '40px' }}
              onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
            >
              {/* Ô hiển thị lựa chọn */}
              <div className="border border-gray-300 rounded px-3 h-[40px] bg-white flex justify-between items-center cursor-pointer">
                {fileOptions.find(option => option.value === selectedFile)?.label}
                <div data-svg-wrapper>
                  <IconArrowCaretDown />
                </div>
              </div>

              {/* Danh sách dropdown */}
              {isFileDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                  {fileOptions.map((option, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-left"
                      onClick={() => {
                        setSelectedFile(option.value as 'xlsx' | 'pdf' | 'csv');
                        setIsFileDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
