import React, { useState } from 'react';
import { examData } from './data';
import { Student } from './type';

const right = require('../../../assets/images/chevron_big_right.png');
const file = require('../../../assets/icons/u_paperclip.png');
const down = require('../../../assets/icons/caret_down.png');
const union = require('../../../assets/icons/Union.png');
const TeacherScoring = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white p-8">
      <div className="flex items-center">
        <span className="text-gray-400 text-sm mr-2">Quản lý bài kiểm tra</span>
        <img src={right} alt="right" className="w-4 h-4 mr-2" />
        <h1 className="text-3xl font-bold text-black">Chấm điểm</h1>
      </div>
      <div className="flex-end">
        <button className="mt-4 bg-orange-500 text-white p-2 rounded-md w-30 float-right mb-4">Chấm điểm</button>
      </div>

      <div className="grid grid-cols-12 gap-4  w-full mx-0">
        <div className="col-span-4 bg-white p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex">
              <p className="w-24 font-semibold">Môn học:</p> <p>{examData.subject}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Lớp:</p> <p>{examData.class}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Thời gian:</p> <p>{examData.time}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Phân loại:</p> <p>{examData.type}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-semibold">Đề bài:</p> <p>{examData.question}</p>
            </div>
            <div className="flex items-center">
              <p className="w-24 text-xs italic">File đính kèm:</p>
              <label htmlFor="file" className="cursor-pointer flex items-center bg-gray-100 text-black p-2 rounded-md hover:bg-gray-300">
                <img src={file} alt="Icon" className="w-5 h-5 mr-2" />
                DSTT_KT45P_12A1.doc
              </label>
              <input id="file" type="file" className="hidden" onChange={handleFileChange} />
              {fileName && <span className="text-gray-700 ml-2">{fileName}</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mt-4 mb-2">Danh sách học viên:</h2>
            <div className="relative inline-block ml-4">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black flex items-center space-x-2 hover:bg-gray-300 transition-all duration-300"
              >
                <span>{selectedStatus}</span>
                <img
                  src={down}
                  alt="Icon"
                  className="w-4 h-4 transition-transform duration-300"
                  style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => handleStatusChange('Tất cả')}
                    className="w-full px-4 py-2 text-left text-black hover:bg-gray-200 transition-all"
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => handleStatusChange('Chưa chấm')}
                    className="w-full px-4 py-2 text-left text-black hover:bg-gray-200 transition-all"
                  >
                    Chưa chấm
                  </button>
                  <button
                    onClick={() => handleStatusChange('Đã chấm')}
                    className="w-full px-4 py-2 text-left text-black hover:bg-gray-200 transition-all"
                  >
                    Đã chấm
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-auto max-h-[400px]">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="text-orange-text px-4 py-2 text-left">STT</th>
                  <th className="text-orange-text px-4 py-2 text-left">Họ và tên</th>
                  <th className="text-orange-text px-4 py-2 text-left">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {examData.students.map((student, index) => {
                  const rowColor = index + 1 <= 5 ? ' text-black-text' : index + 1 <= 9 ? ' text-blue-text' : '';

                  return (
                    <tr key={student.id} className={`border-b ${rowColor} hover:bg-gray-200 transition`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2 font-semibold">{student.score ?? '--'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-5 bg-white p-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-center">{examData.subject}</h2>
          {examData.content.map((paragraph, index) => (
            <p key={index}>
              <strong className="text-orange-text underline">Câu {index + 1}:</strong> {paragraph}
            </p>
          ))}
        </div>

        <div className="col-span-3 bg-white p-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] rounded-lg">
          <p>
            <strong>Ngày nộp bài:</strong>
            <span className="ml-9"> 20/10/2020</span>
          </p>
          <p className="ml-36"> 13:00</p>
          <p>
            <strong>Thời gian làm bài:</strong>
            <span className="ml-1"> 13m45s</span>
          </p>
          <div className="border-b pb-2 mt-4 mb-4"></div>
          <p>Tệp đính kèm của học viên:</p>
          <div className="flex items-center space-x-3">
            <label htmlFor="file" className="cursor-pointer flex items-center bg-gray-200 text-black-text p-2 rounded-md hover:bg-gray-200">
              <img src={file} alt="Icon" className="w-5 h-5 mr-2" />
              DSTT_KT45P_12A1.doc
            </label>
            <input id="file" type="file" className="hidden" onChange={handleFileChange} />
            {fileName && <span className="text-gray-700">{fileName}</span>}
          </div>
          <div className="border-b pb-2 mt-4 mb-4"></div>
          <div className="mt-2">
            <label className="block font-semibold">Điểm số:</label>
            <input
              type="number"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập điểm"
            />
            <div className="flex items-center space-x-2 mt-2">
              <img src={union} alt="union" className="w-4 h-4" />
              <p className="text-sm text-gray-500 italic">Điểm số được tính theo thang điểm 10.</p>
            </div>
          </div>

          <div className="mt-10">
            <label className="block font-semibold">Nhận xét:</label>
            <textarea
              className="border border-gray-300 p-2 w-full h-40 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder=""
            ></textarea>
          </div>

          <button className="mt-4 bg-orange-500 text-white p-2 rounded-md w-30 float-right">Lưu điểm</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherScoring;
