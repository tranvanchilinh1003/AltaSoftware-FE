import React, { useState } from 'react';
import AttachFile from '../../../../components/AttachFile';

const ExamInformations: React.FC = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (file: File) => {
    setFileName(file.name);
  };

  return (
    <div className="grid grid-cols-6 gap-5 pt-8 ml-5">
      {/* Cột 1 */}
      <div className="col-span-1 grid gap-3">
        <span className="grid grid-cols-2">
          <span className="font-semibold">Môn học:</span> <span>Lịch sử</span>
          <span className="font-semibold">Lớp:</span> <span>12A1</span>
        </span>
      </div>

      {/* Cột 2 */}
      <div className="col-span-2 grid gap-2 border-l-2 border-gray-300 pl-5">
        <span className="grid grid-cols-2">
          <span className="font-semibold">Ngày kiểm tra:</span>
          <span className="-ml-[35%]">Thứ 5 - Ngày 10 Tháng 8, 2025</span>
        </span>
        <span className="grid grid-cols-2">
          <span className="font-semibold">Thời lượng:</span>
          <span className="-ml-[35%]">45 phút</span>
        </span>
      </div>

      {/* Cột 3 */}
      <div className="col-span-2 grid gap-2 border-l-2 border-gray-300 pl-5">
        <span className="grid grid-cols-2 pb-2">
          <span className="font-semibold">Đề bài:</span>
          <span className="-ml-[35%]">A</span>
        </span>
        <span className="grid grid-cols-2">
          <span className="font-semibold">Tệp đính kèm:</span>
          <span className="-ml-[35%]">
            <AttachFile fileName={fileName} onFileChange={handleFileChange} />
            <style>{`button { display: none; }`}</style>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ExamInformations;
