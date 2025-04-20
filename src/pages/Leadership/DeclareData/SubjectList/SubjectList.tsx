import React, { useEffect, useRef, useState } from 'react';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';
import { Link } from 'react-router-dom';
import SearchInput from '../../../../components/SearchTable';
import PaginationControls from '../../../../components/Pagination';
import createAxiosInstance from '../../../../utils/axiosInstance';
import deLete from '../../../../assets/images/fi_trash-2.png';
import sortIcon from '../../../../assets/images/u_arrow up down.png';
import './style.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Định nghĩa kiểu dữ liệu cho Subject (sử dụng code làm định danh)
interface Subject {
  code: number;
  name: string;
  // Các trường khác nếu cần
}

const SubjectPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  // Các state cho phân trang
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Gọi API lấy danh sách môn học
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(`${API_BASE_URL}/subjects`);
        console.log('API response:', response.data);
        // Giả sử API trả về dữ liệu theo cấu trúc: { data: [ { code, name, ... }, ... ] }
        if (response.data && Array.isArray(response.data.data)) {
          setSubjects(response.data.data);
        } else {
          setError('Dữ liệu trả về không hợp lệ.');
        }
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Không thể tải dữ liệu môn học. Vui lòng thử lại sau.');
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedSubjects.length > 0 && selectedSubjects.length < subjects.length;
    }
  }, [selectedSubjects, subjects]);

  const handleSelectAll = () => {
    if (selectedSubjects.length === subjects.length) {
      setSelectedSubjects([]);
    } else {
      // Lấy danh sách code (chuyển thành chuỗi)
      setSelectedSubjects(subjects.map((subject) => subject.code.toString()));
    }
  };

  const handleSelectItem = (code: string) => {
    setSelectedSubjects((prev) => (prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]));
  };

  const handleDeleteConfirm = () => {
    setSubjects((prev) => prev.filter((subject) => !selectedSubjects.includes(subject.code.toString())));
    setSelectedSubjects([]);
    setIsModalOpen(false);
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(subjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubjects = subjects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="p-6 bg-background-white rounded-lg w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-center w-full mb-4">Danh sách môn học</h2>
          <button
            className={`delete-btn ${selectedSubjects.length > 0 ? 'active' : ''}`}
            onClick={() => setIsModalOpen(true)}
            disabled={selectedSubjects.length === 0}
          >
            <img src={deLete} alt="delete" className="w-6 h-6" />
          </button>
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="max-h-[400px] overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="text-while-text br-gradient-right-or">
                  <th className="p-3 w-16 text-center">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedSubjects.length === subjects.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 w-40 text-left">
                    <span className="flex items-center">
                      Mã môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                  <th className="p-3 w-64 text-left">
                    <span className="flex items-center">
                      Tên môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                </tr>
                {isModalOpen && (
                  <DeleteAcademicYearModal
                    title="Xóa Tổ - Bộ môn"
                    description="Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                  />
                )}
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentSubjects.map((subject, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                    <td className="p-3 w-16 text-center">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={selectedSubjects.includes(subject.code.toString())}
                        onChange={() => handleSelectItem(subject.code.toString())}
                      />
                    </td>
                    <td className="p-3 w-40 text-left">{subject.code}</td>
                    <td className="p-3 w-64 text-left">{subject.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {/* Component phân trang */}
        <PaginationControls
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default SubjectPage;
