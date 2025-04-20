import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchTeacherList } from '../../../../redux/reducers/Leadership/DeclareData/Department/teacherSlice';
import { deleteTeacher } from '../../../../redux/reducers/Leadership/DeclareData/Department/teacherThunks';
import { Teacher } from '../../../../redux/reducers/Leadership/DeclareData/Department/type';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmation';
import SearchInput from '../../../../components/SearchTable';
import PaginationControls from '../../../../components/Pagination';
import './style.css';

import edit from '../../../../assets/icons/fi_edit.png';
import list from '../../../../assets/icons/fi_list.png';
import trash from '../../../../assets/icons/fi_trash-2.png';
import arrow from '../../../../assets/icons/u_arrow up down.png';

const DeclareData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, totalPages, pageSize, page } = useSelector((state: RootState) => state.teacher);
  console.log(data);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTeacherList({ page: currentPage, pageSize: itemsPerPage, search: searchValue }));
  }, [dispatch, currentPage, itemsPerPage, searchValue]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = useCallback(() => {
    if (selectedTeacher) {
      dispatch(deleteTeacher(selectedTeacher.id))
        .unwrap()
        .then(() => toast.success('Xóa giáo viên thành công!'))
        .catch((error) => toast.error(error.message || 'Xóa giáo viên thất bại!'));
    }
    setIsDeleteModalOpen(false);
  }, [selectedTeacher, dispatch]);

  return (
    <div className="flex flex-col min-h-[752px] max-w-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-bold">Tổ - Bộ môn</h2>
        <SearchInput value={searchValue} onChange={handleSearchChange} placeholder="Nhập từ khóa..." />
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10">
        {error === 'Không tìm thấy kết quả' ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Tên tổ - bộ môn</span>
                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Trưởng bộ môn</span>
                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((teacher, index) => (
                  <tr key={teacher.id} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="py-3 px-2 md:px-4">{teacher.name || '---'}</td>
                    <td className="py-3 px-2 md:px-4">{teacher.fullName || 'Chưa có dữ liệu'}</td>
                    <td className="py-3 px-2 md:px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link to={`/subject-list/${teacher.id}`}>
                          <button className="w-8 h-8">
                            <img src={list} alt="List" className="w-6 h-6 object-contain" />
                          </button>
                        </Link>
                        <Link to={`/leadership/declare-data/edit/${teacher.id}`}>
                          <button className="w-8 h-8">
                            <img src={edit} alt="Edit" className="w-6 h-6 object-contain" />
                          </button>
                        </Link>
                        <button onClick={() => handleDelete(teacher)} className="w-8 h-8">
                          <img src={trash} alt="Trash" className="w-6 h-6 object-contain" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          title="Xóa giáo viên"
          description="Bạn có chắc chắn muốn xóa giáo viên này không? Hành động này không thể hoàn tác."
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default DeclareData;
