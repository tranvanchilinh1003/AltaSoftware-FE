import React, { useRef, useState, useEffect } from 'react';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from '../../../../components/SearchTable';
import PaginationControls from '../../../../components/Pagination';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { SectionGroup, SubjectType } from './type';

const trash = require('../../../../assets/icons/fi_trash-2.png');
const edit = require('../../../../assets/icons/fi_edit.png');
const arrow = require('../../../../assets/icons/u_arrow up down.png');


const SectionList: React.FC = () => {
  const [sections, setSections] = useState<SectionGroup[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get('https://fivefood.shop/api/subjects');

        console.log('API response:', response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setSections(response.data.data);
        } else {
          console.error('Dữ liệu trả về không có trường "data" hoặc không phải mảng!', response.data);
          setSections([]);
          setError('Dữ liệu trả về không hợp lệ.');
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setError('Không thể tải dữ liệu môn học. Vui lòng thử lại sau.');
        setSections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedSections.length > 0 && selectedSections.length < sections.length;
    }
  }, [selectedSections, sections]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    if (selectedSections.length === sections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(sections.map((section) => section.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedSections((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleOpenModal = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleConfirm = () => {
    if (deleteId) {
      setSections((prev) => prev.filter((section) => section.id !== deleteId));
    }
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Lọc dữ liệu theo searchValue nếu cần
  const filteredSections = sections.filter((section) => section.name.toLowerCase().includes(searchValue.toLowerCase()));

  // Tính toán tổng số trang và cắt dữ liệu theo trang hiện tại
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSections = filteredSections.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col min-h-[752px] max-w-full bg-background-white shadow-lg rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-sans font-bold">Môn học</h2>
        <SearchInput value={searchValue} onChange={handleSearchChange} placeholder="Nhập từ khóa..." />
      </div>

      {isLoading ? (
        <p className="text-center py-4">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto flex-grow px-2 md:px-10">
          <table className="w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
              <tr>
                <th className="py-3 px-2 md:px-4 text-center w-[50px]">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selectedSections.length === currentSections.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center">
                    Mã môn học
                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center">
                    Tên môn học
                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">Loại môn</th>
                <th className="py-3 px-2 md:px-4 text-left">Số tiết HK1</th>
                <th className="py-3 px-2 md:px-4 text-left">Số tiết HK2</th>
                <th className="py-3 px-2 md:px-4 text-center"></th>
              </tr>
            </thead>

            <tbody>
              {currentSections.length > 0 ? (
                currentSections.map((item, index) => (
                  <tr key={item.id || index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="py-3 px-2 md:px-4 text-center w-[50px]">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={selectedSections.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.code}</td>
                    <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.name}</td>
                    <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.subjectType.name}</td>
                    <td className="py-3 px-2 md:px-4 font-sans text-black-text text-center">{item.hoursSemester1}</td>
                    <td className="py-3 px-2 md:px-4 font-sans text-black-text text-center">{item.hoursSemester2}</td>
                    <td className="py-3 px-2 md:px-4 text-center">
                      <div className="flex justify-center space-x-2 items-center">
                        <Link to={`/leadership/declare-data/section-list/edit/${item.id}`}>
                          <button className="w-8 h-8 flex items-center justify-center">
                            <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                          </button>
                        </Link>
                        <button onClick={() => handleOpenModal(item.id)} className="w-8 h-8 flex items-center justify-center">
                          <img src={trash} alt="Trash" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Không có dữ liệu môn học.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <DeleteAcademicYearModal
          title="Xóa Môn học"
          description="Bạn có chắc chắn muốn xóa môn học này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể hoàn tác."
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}

      <PaginationControls
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SectionList;
