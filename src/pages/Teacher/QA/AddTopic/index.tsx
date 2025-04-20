import React from 'react';
import icon_calendar from './../../../../assets/icons/icon-calendar.png';
import icon_clock from './../../../../assets/icons/u_clock-three.png';
import icon_file from './../../../../assets/icons/u_paperclip.png';
const AddTopic = () => {
  return (
    <div className="mt-16 max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-4">Tạo topic mới</h2>
      <input type="text" placeholder="Chủ đề topic" className="w-full p-3 border rounded-lg mb-3 bg-gray-100 text-gray-600" />
      <textarea
        placeholder="Mô tả và câu hỏi cho topic này..."
        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 mb-3"
        rows={4}
      ></textarea>
      <div className="flex justify-between space-x-4 mb-3">
        <h3 className="font-semibold text-black">Thời gian đóng topic</h3>
        <div className="flex items-center space-x-2  pr-20">
          <img className="w-5 h-5" alt="icon clock" src={icon_file} />
          <span className="font-semibold text-black">File đính kèm:</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-6  ">
        {/*  */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-orange-500 font-semibold">
            <img className="w-5 h-5" alt="icon clock" src={icon_clock} />
            <span>16:00</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 font-semibold">
            <img className="w- h-5" alt="icon calender" src={icon_calendar} />
            <span>22 tháng 10, 2020</span>
          </div>
        </div>

        {/* File đính kèm */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-orange-400 text-orange-500 rounded-lg bg-orange-100 hover:bg-orange-200">
            <input type="file" className="hidden" />
            Chọn tệp tải lên...
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button className="px-12 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg">Hủy</button>
        <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg">Tạo Topic</button>
      </div>
    </div>
  );
};

export default AddTopic;
