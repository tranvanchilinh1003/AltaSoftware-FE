import React, { useEffect, useState } from 'react';
import search from './../../../../assets/icons/fi_search.png';
import createAxiosInstance from '../../../../utils/axiosInstance';

const API_URL = 'https://fivefood.shop/api/studentinfos/all';
const axiosTrue = createAxiosInstance(true);
const StudentDisciplineTable: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosTrue.get(API_URL);

        const result = response.data; // axios đã tự parse JSON

        if (result.code === 0) {
          setStudents(result.data);
        } else {
          setError('Lỗi tải dữ liệu');
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setError('Lỗi kết nối API');
      }
    };

    fetchData();
  }, []);

  // 🔎 Lọc danh sách theo tên
  const filteredData = students.filter(
    (student) =>
      student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || student?.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="TableStudentRetentionsBoder">
      <div className="TableStudentRetentions">
        <div className="TableStudentRetention flex justify-between pr-8">
          <div className="mt-4">
            <p className="title-classrooomsettings">Danh sách khen thưởng</p>
          </div>

          <div className="search-classrooomsettings">
            <button className="search-button-classrooomsettings">
              <img src={search} alt="search" className="icon-search" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="TableStudentRetention-Body w-full">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mr-7">
            <>
              <table className="w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Mã học viên</th>
                    <th className="px-4 py-3 text-left">Tên học viên</th>
                    <th className="px-4 py-3 text-left">Ngày sinh</th>
                    <th className="px-4 py-3 text-left">Giới tính</th>
                    <th className="px-4 py-3 text-left">Số lần khen thưởng</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
                      <td className="px-4 py-3">{student.code}</td>
                      <td className="px-4 py-3">{student.fullName}</td>
                      <td className="px-4 py-3">{new Date(student.dob).toLocaleDateString('vi-VN')}</td>
                      <td className="px-4 py-3">{student.gender}</td>
                      <td className="px-4 py-3">{student.disciplineCount || 0}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-500 hover:text-blue-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
                <span className="text-sm text-gray-600">Hiển thị {filteredData.length} hàng</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">&lt;</button>
                  <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">...</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">100</button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">&gt;</button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDisciplineTable;
