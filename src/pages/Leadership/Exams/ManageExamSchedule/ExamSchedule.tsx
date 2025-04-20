import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { formatExamDate } from '../../../../utils/dateFormatter';
import { IExamScheduleItem, IExamApiResponse, ExamStatus } from './type';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/PaginationCustom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from '../../../../components/DeleteModal';

const API_URL = process.env.REACT_APP_API_URL;

const extractSemesterRoman = (semester: string): string => {
  const regex = /Học kỳ\s*(\d+)/i;
  const match = semester.match(regex);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num === 1) return 'Học kỳ I';
    if (num === 2) return 'Học kỳ II';
  }
  return semester;
};

const getStatusName = (status: ExamStatus): string => {
  switch (status) {
    case ExamStatus.PendingApproval:
      return 'Chờ phê duyệt';
    case ExamStatus.NotStarted:
      return 'Chưa bắt đầu';
    case ExamStatus.InProgress:
      return 'Đang diễn ra';
    case ExamStatus.InExecution:
      return 'Đã tiến hành';
    case ExamStatus.Completed:
      return 'Đã hoàn thành';
    default:
      return 'Trạng thái không xác định';
  }
};

interface ManageExamScheduleProps {
  academicYearId: string;
  gradeLevelsId: string;
  classId: string;
}

const ManageExamSchedule: React.FC<ManageExamScheduleProps> = ({ academicYearId, gradeLevelsId, classId }) => {
  const [data, setData] = useState<IExamScheduleItem[]>([]);
  const [searchResults, setSearchResults] = useState<IExamScheduleItem[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const navigate = useNavigate();

  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Hàm gọi API với phân trang
  const fetchData = async (page: number, pageSize: number = itemsPerPage, search?: string) => {
    setLoading(true);
    try {
      const response = await axios.get<IExamApiResponse>(`${API_URL}/ExamSchedule`, {
        params: {
          page,
          pageSize,
          search: search || '',
          academicYearId,
          gradeLevelsId,
          isDescending: true,
        },
      });
      const json = response.data;
      if (json.code === 0 && json.data) {
        const { items, pageNumber: curPage, totalPages: tPages } = json.data;
        setData(items);
        setSearchResults(items);
        setCurrentPage(curPage);
        setTotalPages(tPages);
      } else {
        console.error('Có lỗi:', json.message);
      }
    } catch (error) {
      console.error('Error fetching exam schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API lần đầu và khi thay đổi các bộ lọc
  useEffect(() => {
    setCurrentPage(1);
    fetchData(1);
  }, [itemsPerPage, academicYearId, gradeLevelsId, classId]);

  // Điều hướng khi thay đổi trang
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage, itemsPerPage);
  };

  // Thay đổi số hàng/trang
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    fetchData(1, newSize);
  };

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value.trim();
      setCurrentPage(1);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchData(1, itemsPerPage, searchTerm);
      }, 500);
    },
    [itemsPerPage]
  );

  const goClassList = (id: number) => {
    navigate(`/leadership/exams/${id}`);
  };
  const goEdit = (id: number) => {
    navigate(`/leadership/exams/edit/${id}`);
  };
  const goDetail = (id: number) => {
    navigate(`/leadership/exams/detail/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedExamId(id);
    setIsModalOpen(true);
  };

  // Kiểm tra nếu đang xoá thì không thực hiện thêm lệnh xoá
  const confirmDelete = useCallback(async () => {
    if (isDeleting || selectedExamId === null) return;
    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}/ExamSchedule/${selectedExamId}`);
      const newData = data.filter((exam) => exam.id !== selectedExamId);
      setData(newData);
      setSearchResults(newData);
      toast.success('Xóa thành công!', { autoClose: 1000 });

      if (newData.length < itemsPerPage) {
        if (newData.length === 0 && currentPage > 1) {
          const newPage = currentPage - 1;
          setCurrentPage(newPage);
          fetchData(newPage);
        } else if (currentPage < totalPages) {
          fetchData(currentPage);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Có lỗi khi xóa';
        toast.error(errorMessage, { autoClose: 1000 });
      } else {
        toast.error('Có lỗi khi xóa', { autoClose: 1000 });
      }
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedExamId(null);
    }
  }, [isDeleting, selectedExamId, data, itemsPerPage, currentPage, totalPages]);

  return (
    <div className="flex flex-col min-h-[752px] bg-background-white shadow-custom rounded-lg">
      <div className="flex justify-between items-center mt-5">
        <h2 className="font-bold text-lg md:text-xl ml-8">Danh sách bài thi</h2>
        <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ms-3">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
              fill="#C5C5C5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9429 15.9433C16.3334 15.5528 16.9666 15.5528 17.3571 15.9433L21.7071 20.2933C22.0976 20.6838 22.0976 21.317 21.7071 21.7075C21.3166 22.098 20.6834 22.098 20.2929 21.7075L15.9429 17.3575C15.5524 16.967 15.5524 16.3338 15.9429 15.9433Z"
              fill="#C5C5C5"
            />
          </svg>
          <input
            ref={searchRef}
            type="text"
            placeholder="Tìm kiếm"
            className="w-full h-[40px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic"
            onChange={handleSearch}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center flex-grow">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-x-auto py-6 px-8">
          <table className="min-w-full border-collapse w-full overflow-hidden rounded-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white rounded-t-lg">
              <tr>
                <th className="py-3 px-4 text-center">Học Kỳ</th>
                <th className="py-3 px-4 text-start">Ngày Làm Bài</th>
                <th className="py-3 px-4 text-center">Khoa-Khối</th>
                <th className="py-3 px-4 text-start">Môn Thi</th>
                <th className="py-3 px-4 text-start">Tên kỳ thi</th>
                <th className="py-3 px-4 text-start">Tình trạng</th>
                <th className="py-3 px-4 text-center">Danh sách lớp thi</th>
                <th className="py-3 px-4 text-start">Phân công chấm thi</th>
                <th className="py-3 px-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((exam, index) => (
                <tr key={exam.id} className={`hover:bg-gray-200 transition-all ${index % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-4 whitespace-nowrap">{extractSemesterRoman(exam.semesterNames[0] || '')}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{formatExamDate(exam.examDay)}</td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">{exam.gradeLevel}</td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">{exam.subjectName}</td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">{exam.name}</td>
                  <td className="py-3 px-4 text-left whitespace-nowrap italic opacity-50">{getStatusName(exam.status)}</td>
                  <td className="py-3 px-4 flex justify-center items-center">
                    <button className="w-8 h-8 flex items-center justify-center" onClick={goClassList.bind(null, exam.id)}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                          d="M17.3333 18.666H12C11.6464 18.666 11.3072 18.8065 11.0572 19.0565C10.8072 19.3066 10.6667 19.6457 10.6667 19.9993C10.6667 20.353 10.8072 20.6921 11.0572 20.9422C11.3072 21.1922 11.6464 21.3327 12 21.3327H17.3333C17.687 21.3327 18.0261 21.1922 18.2762 20.9422C18.5262 20.6921 18.6667 20.353 18.6667 19.9993C18.6667 19.6457 18.5262 19.3066 18.2762 19.0565C18.0261 18.8065 17.687 18.666 17.3333 18.666ZM22.6667 5.33268H21.0933C20.8183 4.55462 20.3092 3.88068 19.6361 3.40327C18.9629 2.92585 18.1586 2.66833 17.3333 2.66602H14.6667C13.8414 2.66833 13.0371 2.92585 12.3639 3.40327C11.6908 3.88068 11.1818 4.55462 10.9067 5.33268H9.33334C8.27248 5.33268 7.25506 5.75411 6.50492 6.50426C5.75477 7.2544 5.33334 8.27182 5.33334 9.33268V25.3327C5.33334 26.3935 5.75477 27.411 6.50492 28.1611C7.25506 28.9113 8.27248 29.3327 9.33334 29.3327H22.6667C23.7275 29.3327 24.745 28.9113 25.4951 28.1611C26.2452 27.411 26.6667 26.3935 26.6667 25.3327V9.33268C26.6667 8.27182 26.2452 7.2544 25.4951 6.50426C24.745 5.75411 23.7275 5.33268 22.6667 5.33268ZM13.3333 6.66602C13.3333 6.31239 13.4738 5.97326 13.7239 5.72321C13.9739 5.47316 14.3131 5.33268 14.6667 5.33268H17.3333C17.687 5.33268 18.0261 5.47316 18.2762 5.72321C18.5262 5.97326 18.6667 6.31239 18.6667 6.66602V7.99935H13.3333V6.66602ZM24 25.3327C24 25.6863 23.8595 26.0254 23.6095 26.2755C23.3594 26.5255 23.0203 26.666 22.6667 26.666H9.33334C8.97972 26.666 8.64058 26.5255 8.39053 26.2755C8.14049 26.0254 8.00001 25.6863 8.00001 25.3327V9.33268C8.00001 8.97906 8.14049 8.63992 8.39053 8.38987C8.64058 8.13983 8.97972 7.99935 9.33334 7.99935H10.6667V9.33268C10.6667 9.6863 10.8072 10.0254 11.0572 10.2755C11.3072 10.5255 11.6464 10.666 12 10.666H20C20.3536 10.666 20.6928 10.5255 20.9428 10.2755C21.1929 10.0254 21.3333 9.6863 21.3333 9.33268V7.99935H22.6667C23.0203 7.99935 23.3594 8.13983 23.6095 8.38987C23.8595 8.63992 24 8.97906 24 9.33268V25.3327ZM20 13.3327H12C11.6464 13.3327 11.3072 13.4732 11.0572 13.7232C10.8072 13.9733 10.6667 14.3124 10.6667 14.666C10.6667 15.0196 10.8072 15.3588 11.0572 15.6088C11.3072 15.8589 11.6464 15.9993 12 15.9993H20C20.3536 15.9993 20.6928 15.8589 20.9428 15.6088C21.1929 15.3588 21.3333 15.0196 21.3333 14.666C21.3333 14.3124 21.1929 13.9733 20.9428 13.7232C20.6928 13.4732 20.3536 13.3327 20 13.3327ZM14.6667 14.6673C14.6667 13.9309 14.0698 13.334 13.3334 13.334C12.597 13.334 12.0001 13.9309 12.0001 14.6673V22.6673C12.0001 23.4037 12.597 24.0007 13.3334 24.0007C14.0698 24.0007 14.6667 23.4037 14.6667 22.6673V14.6673Z"
                          fill="#FF7506"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-left">{exam.teacherNames[0]}</td>
                  <td className="py-3 px-4 flex justify-center items-center">
                    <div className="flex space-x-3 items-center">
                      <button className="w-8 h-8 flex items-center justify-center" onClick={goDetail.bind(null, exam.id)}>
                        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                          <path
                            d="M27.2267 10.4673C24.5334 4.21398 19.4667 0.333984 14 0.333984C8.53336 0.333984 3.46669 4.21398 0.773361 10.4673C0.699944 10.6355 0.662048 10.8171 0.662048 11.0007C0.662048 11.1842 0.699944 11.3658 0.773361 11.534C3.46669 17.7873 8.53336 21.6673 14 21.6673C19.4667 21.6673 24.5334 17.7873 27.2267 11.534C27.3001 11.3658 27.338 11.1842 27.338 11.0007C27.338 10.8171 27.3001 10.6355 27.2267 10.4673ZM14 19.0007C9.77336 19.0007 5.77336 15.9473 3.46669 11.0007C5.77336 6.05398 9.77336 3.00065 14 3.00065C18.2267 3.00065 22.2267 6.05398 24.5334 11.0007C22.2267 15.9473 18.2267 19.0007 14 19.0007ZM14 5.66732C12.9452 5.66732 11.914 5.98011 11.037 6.56615C10.1599 7.15218 9.47634 7.98513 9.07267 8.95967C8.669 9.93421 8.56338 11.0066 8.76917 12.0411C8.97496 13.0757 9.48291 14.026 10.2288 14.7719C10.9747 15.5178 11.925 16.0257 12.9595 16.2315C13.9941 16.4373 15.0665 16.3317 16.041 15.928C17.0155 15.5243 17.8485 14.8408 18.4345 13.9637C19.0206 13.0866 19.3334 12.0555 19.3334 11.0007C19.3334 9.58616 18.7715 8.22961 17.7713 7.22941C16.7711 6.22922 15.4145 5.66732 14 5.66732ZM14 13.6673C13.4726 13.6673 12.957 13.5109 12.5185 13.2179C12.08 12.9249 11.7382 12.5084 11.5363 12.0211C11.3345 11.5339 11.2817 10.9977 11.3846 10.4804C11.4875 9.96313 11.7415 9.48797 12.1144 9.11503C12.4873 8.74209 12.9625 8.48812 13.4798 8.38522C13.9971 8.28233 14.5332 8.33514 15.0205 8.53697C15.5078 8.7388 15.9243 9.0806 16.2173 9.51913C16.5103 9.95766 16.6667 10.4732 16.6667 11.0007C16.6667 11.7079 16.3857 12.3862 15.8856 12.8863C15.3855 13.3864 14.7073 13.6673 14 13.6673Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center" onClick={goEdit.bind(null, exam.id)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.50482 5.17157C3.25497 4.42143 4.27239 4 5.33325 4H14.6666C15.403 4 15.9999 4.59695 15.9999 5.33333C15.9999 6.06971 15.403 6.66667 14.6666 6.66667H5.33325C4.97963 6.66667 4.64049 6.80714 4.39044 7.05719C4.14039 7.30724 3.99992 7.64638 3.99992 8V26.6667C3.99992 27.0203 4.14039 27.3594 4.39044 27.6095C4.64049 27.8595 4.97963 28 5.33325 28H23.9999C24.3535 28 24.6927 27.8595 24.9427 27.6095C25.1928 27.3594 25.3333 27.0203 25.3333 26.6667V17.3333C25.3333 16.597 25.9302 16 26.6666 16C27.403 16 27.9999 16.597 27.9999 17.3333V26.6667C27.9999 27.7275 27.5785 28.7449 26.8283 29.4951C26.0782 30.2452 25.0608 30.6667 23.9999 30.6667H5.33325C4.27239 30.6667 3.25497 30.2452 2.50482 29.4951C1.75468 28.7449 1.33325 27.7275 1.33325 26.6667V8C1.33325 6.93913 1.75468 5.92172 2.50482 5.17157Z"
                            fill="#FF7506"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.6666 3.83854C26.2701 3.83854 25.8898 3.99606 25.6094 4.27644L13.2039 16.682L12.4991 19.5011L15.3183 18.7964L27.7238 6.39083C28.0042 6.11044 28.1617 5.73016 28.1617 5.33363C28.1617 4.93711 28.0042 4.55683 27.7238 4.27644C27.4434 3.99606 27.0631 3.83854 26.6666 3.83854ZM23.7238 2.39083C24.5043 1.61034 25.5628 1.17188 26.6666 1.17188C27.7704 1.17188 28.8289 1.61034 29.6094 2.39083C30.3899 3.17131 30.8284 4.22987 30.8284 5.33363C30.8284 6.4374 30.3899 7.49596 29.6094 8.27644L16.9428 20.9431C16.7719 21.114 16.5578 21.2352 16.3233 21.2938L10.99 22.6272C10.5356 22.7407 10.055 22.6076 9.7238 22.2764C9.39263 21.9453 9.2595 21.4646 9.37309 21.0103L10.7064 15.6769C10.765 15.4425 10.8863 15.2284 11.0571 15.0575L23.7238 2.39083Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center" onClick={handleDeleteClick.bind(null, exam.id)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.3906 4.39118C12.6407 4.14113 12.9798 4.00065 13.3334 4.00065H18.6667C19.0204 4.00065 19.3595 4.14113 19.6096 4.39118C19.8596 4.64122 20.0001 4.98036 20.0001 5.33398V6.66732H12.0001V5.33398C12.0001 4.98036 12.1406 4.64122 12.3906 4.39118ZM9.33341 6.66732V5.33398C9.33341 4.27312 9.75484 3.2557 10.505 2.50556C11.2551 1.75541 12.2725 1.33398 13.3334 1.33398H18.6667C19.7276 1.33398 20.745 1.75541 21.4952 2.50556C22.2453 3.2557 22.6667 4.27312 22.6667 5.33398V6.66732H25.3334H28.0001C28.7365 6.66732 29.3334 7.26427 29.3334 8.00065C29.3334 8.73703 28.7365 9.33398 28.0001 9.33398H26.6667V26.6673C26.6667 27.7282 26.2453 28.7456 25.4952 29.4957C24.745 30.2459 23.7276 30.6673 22.6667 30.6673H9.33341C8.27255 30.6673 7.25513 30.2459 6.50499 29.4957C5.75484 28.7456 5.33341 27.7282 5.33341 26.6673V9.33398H4.00008C3.2637 9.33398 2.66675 8.73703 2.66675 8.00065C2.66675 7.26427 3.2637 6.66732 4.00008 6.66732H6.66675H9.33341ZM8.00008 9.33398V26.6673C8.00008 27.0209 8.14056 27.3601 8.39061 27.6101C8.64065 27.8602 8.97979 28.0006 9.33341 28.0006H22.6667C23.0204 28.0006 23.3595 27.8602 23.6096 27.6101C23.8596 27.3601 24.0001 27.0209 24.0001 26.6673V9.33398H8.00008ZM18.6667 13.334C19.4031 13.334 20.0001 13.9309 20.0001 14.6673V22.6673C20.0001 23.4037 19.4031 24.0007 18.6667 24.0007C17.9304 24.0007 17.3334 23.4037 17.3334 22.6673V14.6673C17.3334 13.9309 17.9304 13.334 18.6667 13.334ZM14.6667 14.6673C14.6667 13.9309 14.0698 13.334 13.3334 13.334C12.597 13.334 12.0001 13.9309 12.0001 14.6673V22.6673C12.0001 23.4037 12.597 24.0007 13.3334 24.0007C14.0698 24.0007 14.6667 23.4037 14.6667 22.6673V14.6673Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </button>
                      {isModalOpen && (
                        <DeleteModal
                          title="Xóa lịch thi"
                          description="Xác nhận muốn xoá lịch thi này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
                          onCancel={setIsModalOpen.bind(null, false)}
                          onConfirm={confirmDelete}
                          isLoading={isDeleting}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer: Số hàng/trang + Pagination */}
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text italic text-sm gap-2">
        <div className="flex items-center space-x-2">
          <span>Hiển thị</span>
          <input
            type="number"
            min={1}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>
        {data.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
      </div>
    </div>
  );
};

export default ManageExamSchedule;
