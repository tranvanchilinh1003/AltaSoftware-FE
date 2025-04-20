import React, { useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import DateInput from '../../../components/Date';
import Dropdown from '../../../components/Dropdown';
import search from './../../../assets/icons/fi_search.png';
import info from './../../../assets/icons/icon-info-outline.png.png';
import Panigation from '../../Leadership/DeclareData/SchoolYear/SchoolYearPanigation/Panigation';
import Status, { StatusType } from './Status';
import { IconArrowUpDown } from '../../../components/Icons';
const MyCourse: React.FC = () => {
  const [data, setData] = useState([
    { maLop: '101010', monHoc: 'Hello', thoiGian: '2021-02-02...', giangVien: 'Nguyễn Ngọc Ngạn', trangThai: 'not_finish' },
    { maLop: '101010', monHoc: 'Hello', thoiGian: '2021-02-02...', giangVien: 'Nguyễn Ngọc Ngạn', trangThai: 'not_start' },
    { maLop: '101010', monHoc: 'Hello', thoiGian: '2021-02-02...', giangVien: 'Nguyễn Ngọc Ngạn', trangThai: 'not_join' },
    { maLop: '101010', monHoc: 'Hello', thoiGian: '2021-02-02...', giangVien: 'Nguyễn Ngọc Ngạn', trangThai: 'finish' },
  ]);

  const [type, setType] = useState(1);
  return (
    <>
      <AddressList addressList={[{ link: '', linkName: 'Lớp học của tôi' }]} />
      <div className="flex items-center gap-3 mt-2">
        <button
          className={`truncate p-2 pl-5 pr-5 border border-orange-500 rounded-md ${
            type === 1 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md' : ''
          }`}
          onClick={() => setType(1)}
        >
          Tất cả lớp học
        </button>
        <button
          className={`truncate p-2 pl-5 pr-5 border border-orange-500 rounded-md ${
            type === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md' : ''
          }`}
          onClick={() => setType(2)}
        >
          Lớp học sắp tới
        </button>
        <button
          className={`truncate p-2 pl-5 pr-5 border border-orange-500 rounded-md ${
            type === 3 ? ' bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md' : ''
          }`}
          onClick={() => setType(3)}
        >
          Lớp học đã hoàn thành
        </button>
        <button
          className={`truncate p-2 pl-5 pr-5 border border-orange-500 rounded-md ${
            type === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md' : ''
          }`}
          onClick={() => setType(4)}
        >
          Lớp học chưa hoàn thành
        </button>
      </div>
      <div className="mt-3 p-2 bg-white shadow-md rounded-md">
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="w-full gap-2 items-center flex flex-wrap   lg:w-9/12">
            <div className="w-2/7">
              <span className="font-bold mb-2 inline-block">Chọn niên khóa</span>
              <Dropdown
                selectedOption={null}
                handleOptionClick={() => {}}
                options={[
                  { label: '2022-2030', value: '1' },
                  { label: '2022-2020', value: '2' },
                ]}
              />
            </div>
            <div className="w-2/8">
              <span className="font-bold mb-2  block">Chọn ngày</span>
              <DateInput className="w-1/2" onChange={() => {}} value={null} />
            </div>
            <div className="w-2/8">
              <span className="font-bold mb-2  block">Chọn môn học</span>
              <Dropdown
                selectedOption={null}
                handleOptionClick={() => {}}
                options={[
                  { label: 'Toán', value: '1' },
                  { label: 'Sinh học', value: '2' },
                ]}
              />
            </div>
            <div className="w-2/8">
              <p className="mb-3"></p>

              <div className="flex gap-1">
                <button className="p-1 rounded-md pl-3 pr-3 bg-orange-500 text-white ml-2 inline-block">Lọc kết quả</button>
                <button className="p-1 rounded-md pl-3 font-bold pr-3 bg-gray-200  ">Lọc kết quả</button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/12 p-1">
            <div className="w-4/5 mr-2">
              <p className="mb-3"></p>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-lg">
                <img style={{ width: '20px' }} src={search} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên topic"
                  className="bg-transparent text-gray-400 placeholder-gray-400 focus:outline-none ml-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div
            className="mt-3 bg-white   overflow-hidden p-2"
            style={{ height: '450px ', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <table className="w-full border-collapse overflow-hidden rounded-t-lg">
                <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
                  <tr>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Mã lớp</span>
                        <IconArrowUpDown className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Môn học</span>
                        <IconArrowUpDown className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Thời gian</span>
                        <IconArrowUpDown className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Giảng viên</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Trạng thái</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.maLop}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.monHoc}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.thoiGian}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.giangVien}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">
                        <Status status={item.trangThai as StatusType} />
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        <img style={{ width: '20px' }} src={info} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Panigation indexChoose={1} numPage={9} size={2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourse;
