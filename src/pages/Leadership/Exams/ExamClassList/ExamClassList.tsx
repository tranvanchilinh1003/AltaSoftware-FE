import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DeleteModal from '../../../../components/DeleteModal';
import EditStudentCountModal from './EditStudentCountModal'; // Modal mới tạo
import { IconArrowUpDown } from '../../../../components/Icons';
import { IconTrash, IconBook, IconEdit } from '../../../../components/Icons/IconComponents';
import ExamCard from '../../Exams/ExamCard/ExamCard';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Pagination from '../../../../components/PaginationCustom';
import { IParticipatingClass, IExamScheduleDetails, IExamScheduleResponse } from './type';
import { toast } from 'react-toastify';
import Loading from '../../../../components/Loading';

const API_URL = process.env.REACT_APP_API_URL;

const ExamClassList: React.FC = () => {
  // Lấy id từ URL qua hook useParams
  const { id } = useParams<{ id: string }>();

  const [examDetails, setExamDetails] = useState<IExamScheduleDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Các state hỗ trợ phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  // Các state xoá
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedClassToDelete, setSelectedClassToDelete] = useState<IParticipatingClass | null>(null);

  // Các state sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [selectedClassForEdit, setSelectedClassForEdit] = useState<IParticipatingClass | null>(null);

  // Các URL breadcrumb
  const urls = [
    { link: '/leadership/exams', linkName: 'Quản lý bài kiểm tra' },
    { link: '#', linkName: 'Danh sách lớp tham gia' },
  ];

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get<IExamScheduleResponse>(`${API_URL}/ExamSchedule/${id}/details`);
        if (response.data.code === 0) {
          setExamDetails(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch exam details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchExamDetails();
    }
  }, [id]);

  // Nếu đang loading hoặc có lỗi
  if (isLoading) {
    return <div><Loading isLoading /></div>;
  }

  if (error || !examDetails) {
    return <div>Error: {error}</div>;
  }

  // Xác định dữ liệu lớp tham gia theo trang
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentClasses = examDetails.participatingClasses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(examDetails.participatingClasses.length / rowsPerPage);

  // Hàm xử lý thay đổi số hàng mỗi trang
  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1); // reset lại trang khi thay đổi số hàng trên trang
  };

  // Mở modal xóa: lưu lại class cần xoá
  const handleDeleteClick = (participatingClass: IParticipatingClass) => {
    setSelectedClassToDelete(participatingClass);
    setIsDeleteModalOpen(true);
  };

  // Hủy modal
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedClassToDelete(null);
  };

  // Xác nhận xoá
  const handleConfirmDelete = async () => {
    if (!selectedClassToDelete) return;
    setIsDeleting(true);
    try {
      // Gọi API xoá theo endpoint
      await axios.delete(
        `${API_URL}/exam-schedule-classes/${examDetails.id}/class/${selectedClassToDelete.classId}`
      );
      // Sau khi xoá thành công, cập nhật lại danh sách lớp tham gia
      const updatedClasses = examDetails.participatingClasses.filter(
        (cls) => cls.classId !== selectedClassToDelete.classId
      );
      setExamDetails({
        ...examDetails,
        participatingClasses: updatedClasses,
      });
      toast.success('Xóa lớp tham gia thành công!');
      // Nếu đang ở trang cuối nhưng sau xoá số lớp giảm thì cập nhật currentPage
      if (updatedClasses.length <= (currentPage - 1) * rowsPerPage && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi xoá lớp tham gia';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedClassToDelete(null);
    }
  };

  // 1) Khi người dùng click icon Edit => mở modal
  const handleEditClick = (participatingClass: IParticipatingClass) => {
    setSelectedClassForEdit(participatingClass);
    setIsEditModalOpen(true);
  };

  // 2) Hủy modal Edit
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedClassForEdit(null);
  };

  // 3) Xác nhận sửa
  const handleConfirmEdit = async (newCount: number) => {
    console.log('newCount', newCount);
    
    if (!selectedClassForEdit) return;
    setEditLoading(true);
    try {

      await axios.put(
        `${API_URL}/exam-schedule-classes/${examDetails.id}/class/${selectedClassForEdit.classId}/student-count`,
        newCount,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Cập nhật state examDetails
      const updatedClasses = examDetails.participatingClasses.map((cls) => {
        if (cls.classId === selectedClassForEdit.classId) {
          return {
            ...cls,
            joinedExamStudentQuantity: newCount,
          };
        }
        return cls;
      });

      setExamDetails({
        ...examDetails,
        participatingClasses: updatedClasses,
      });

      toast.success('Cập nhật số lượng học viên thành công!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật số lượng';
      toast.error(errorMessage);
    } finally {
      setEditLoading(false);
      setIsEditModalOpen(false);
      setSelectedClassForEdit(null);
    }
  };

  return (
    <>
      <AddressList addressList={urls} />

      <div className="flex flex-col md:flex-row items-start gap-4 py-2">
        {/* Phần danh sách lớp tham gia */}
        <div className="flex flex-col w-full md:w-3/4 min-h-[752px] bg-background-white shadow-custom rounded-lg p-4">
          <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
            <h2 className="text-lg font-sans font-bold">Danh sách lớp tham gia</h2>
          </div>
          <div className="overflow-x-auto flex-grow px-2 md:px-10">
            <table className="w-full border-collapse overflow-hidden rounded-t-lg">
              <thead className="bg-gradient-to-r from-background-2 whitespace-nowrap to-background-1 text-white">
                <tr>
                  <th className="py-3 text-center">
                    <div className="flex items-center px-3 gap-2 font-sans">
                      <span>Mã lớp</span>
                      <IconArrowUpDown />
                    </div>
                  </th>
                  <th className="py-3 text-center">
                    <div className="flex items-center justify-start gap-2 font-sans w-full">
                      <span>Tên lớp</span>
                      <IconArrowUpDown />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-start">GVCN</th>
                  <th className="py-3 px-4 text-center">HS tham gia</th>
                  <th className="py-3 px-4 text-start">GV chấm thi</th>
                  <th className="py-3 px-4 text-center">Xem điểm</th>
                  <th className="py-3 px-4 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {currentClasses.map((item, index) => (
                  <tr key={item.classId} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="py-3 px-5 text-black-text">{item.classCode}</td>
                    <td className="py-3 text-start text-black-text">{item.className}</td>
                    <td className="py-3 px-4 text-start text-black-text">{item.supervisoryTeacherName}</td>
                    <td className="py-3 px-4 text-center text-black-text">
                      {item.joinedExamStudentQuantity + '/' + item.studentQuantity}
                    </td>
                    <td className="py-3 px-4 text-start text-black-text">
                      {item.examGraders.join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`scoreboard/${item.classId}?academicYearId=${examDetails.academicYearId}&classId=${item.classId}&subjectId=${examDetails.subject}`}
                        >
                          <IconBook className="text-orange-text" />
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2 items-center">
                        {/* Chỉnh sửa */}
                        <button onClick={() => handleEditClick(item)} className="w-8 h-8">
                          <IconEdit className="text-orange-text" />
                        </button>

                        {/* Xoá */}
                        <button onClick={() => handleDeleteClick(item)} className="w-8 h-8">
                          <IconTrash className="text-orange-text" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Phần phân trang */}
          <div className="mt-auto flex flex-col md:flex-row items-center justify-between px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
            <div className="flex items-center space-x-2">
              <span>Hiển thị</span>
              <input
                type="number"
                min={1}
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
              />
              <span>hàng trong mỗi trang</span>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
          </div>
        </div>

        {/* Phần ExamCard (có thể truyền dữ liệu examDetails nếu cần) */}
        <div className="w-full md:w-1/4">
          <ExamCard examDetail={examDetails} />
        </div>
      </div>

      {/* Modal xoá */}
      {isDeleteModalOpen && (
        <DeleteModal
          title="Xóa lớp tham gia"
          description="Bạn có chắc chắn muốn xoá lớp tham gia này khỏi bài kiểm tra? Hành động này không thể hoàn tác."
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      )}

      {/* Modal sửa số lượng HS tham gia */}
      {isEditModalOpen && selectedClassForEdit && (
        <EditStudentCountModal
          title="Chỉnh sửa số lượng HS tham gia"
          description={`Lớp: ${selectedClassForEdit.className}`}
          initialCount={selectedClassForEdit.joinedExamStudentQuantity}
          onCancel={handleCancelEdit}
          onConfirm={handleConfirmEdit}
          isLoading={editLoading}
        />
      )}
    </>
  );
};

export default ExamClassList;
