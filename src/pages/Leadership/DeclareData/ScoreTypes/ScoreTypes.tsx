import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteModal from '../../../../components/DeleteModal';
import { IScoreType } from './type';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/PaginationCustom';
import { IconEdit, IconTrash } from '../../../../components/Icons/IconComponents';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

const ScoreTypes: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Dữ liệu phân trang lấy từ API
  const [data, setData] = useState<IScoreType[]>([]);

  // Kết quả tìm kiếm (khi user gõ)
  const [searchResults, setSearchResults] = useState<IScoreType[]>([]);

  // Các state khác
  const [selectedScoreType, setSelectedScoreType] = useState<IScoreType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Tham chiếu đến ô input tìm kiếm
  const searchRef = useRef<HTMLInputElement>(null);

  // Biến này để lưu lại "hẹn giờ" debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================
  // 1) Hàm fetch dữ liệu phân trang
  // ==========================
  const fetchData = async (page: number, pageSize: number = itemsPerPage, search?: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/score-type`, {
        params: {
          page,
          pageSize,
          search: search || '',
        },
      });
      const json = response.data;
      if (json.code === 0 && json.data) {
        const { data: items, page: curPage, totalPages: tPages } = json;
        setData(items);
        setSearchResults(items);
        setCurrentPage(curPage);
        setTotalPages(tPages);
      } else {
        console.error('Có lỗi:', json.message);
      }
    } catch (error: any) {
      console.error('Lỗi khi gọi API:', error);
      toast.error('Lỗi khi gọi API', { autoClose: 1000});
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // 2) Gọi fetchData lần đầu
  // ==========================
  useEffect(() => {
    fetchData(currentPage);
  }, [itemsPerPage, currentPage]);

  // ==========================
  // 3) Đổi trang (phân trang)
  // ==========================
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  // ==========================
  // 4) Xoá item
  // ==========================
  const confirmDelete = useCallback(async () => {
    if (!selectedScoreType) return;
    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}/score-type/${selectedScoreType.id}`);
      
      // Lọc khỏi data và searchResults
      const newData = data.filter((item) => item.id !== selectedScoreType.id);
      setData(newData);
      setSearchResults(newData);
      toast.success('Xóa thành công!', { autoClose: 1000});

      // Nếu số item của trang hiện tại ít hơn số item tối đa
      if (newData.length < itemsPerPage) {
        // Nếu trang hiện tại trở nên trống và không phải trang đầu tiên, load lại trang trước đó
        if (newData.length === 0 && currentPage > 1) {
          const newPage = currentPage - 1;
          setCurrentPage(newPage);
          fetchData(newPage);
        }
        // Nếu còn trang kế bên (currentPage không phải trang cuối) thì gọi API load lại trang hiện tại để bổ sung item
        else if (currentPage < totalPages) {
          fetchData(currentPage);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Có lỗi khi xóa';
        toast.error(errorMessage, { autoClose: 1000});
      } else {
        toast.error('Có lỗi khi xóa', { autoClose: 1000});
      }
    }
    
     finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  }, [selectedScoreType, data, itemsPerPage, currentPage, totalPages]);

  // ==========================
  // 5) Tìm kiếm
  // ==========================
  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();

    // Luôn set trang về 1 khi có search mới
    setCurrentPage(1);

    // Huỷ hẹn giờ cũ nếu có
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Tạo hẹn giờ mới, ví dụ 500ms
    debounceRef.current = setTimeout(() => {
      fetchData(1, itemsPerPage, searchTerm);
    }, 500);
  }, [itemsPerPage]);

  // ==========================
  // 6) Xử lý Delete Modal
  // ==========================
  const handleDeleteClick = useCallback((item: IScoreType) => {
    setSelectedScoreType(item);
    setIsDeleteModalOpen(true);
  }, []);
  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  // ==========================
  // 7) Thay đổi số item/trang
  // ==========================
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    fetchData(1, newSize);
  };

  // ==========================
  // 8) Hàm xử lý điều hướng
  // ==========================
  const handleNavigate = (id: number) => {
    navigate(`/leadership/declare-data/score-types/${id}`);
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="flex flex-col min-h-[752px] bg-background-white shadow-custom rounded-lg p-4">
      {/* HEADER: Title + Ô Tìm kiếm */}
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-sans font-bold">Loại Điểm</h2>

        {/* Ô tìm kiếm */}
        <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-3">
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

      {/* BODY: Hiển thị loading hay bảng dữ liệu */}
      {loading ? (
        <div className="flex justify-center items-center flex-grow">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-x-auto flex-grow px-2 md:px-10">
          <table className="w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-2 to-background-1 text-white">
              <tr>
                <th className="py-3 px-4 text-center" rowSpan={2}>
                  <div className="flex items-center px-3 gap-2 font-sans">
                    <span>Loại điểm</span>
                  </div>
                </th>
                <th className="py-3 text-center" rowSpan={2}>
                  <div className="flex items-center justify-center gap-2 font-sans w-full">
                    <span>Hệ số</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-center border border-white" colSpan={2}>
                  Số cột điểm tối thiểu
                </th>
                <th className="text-right" rowSpan={2}></th>
              </tr>
              <tr>
                <th className="py-3 px-4 text-center border border-white">Học kỳ 1</th>
                <th className="py-3 px-4 text-center border border-white">Học kỳ 2</th>
              </tr>
            </thead>

            <tbody>
              {searchResults.map((item, index) => (
                <tr key={item.id ?? index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                  <td className="py-3 px-5 text-black-text">{item.name}</td>
                  <td className="py-3 px-4 text-center text-black-text">{item.weight}</td>
                  <td className="py-3 px-4 text-center text-black-text">{item.qtyScoreSemester1}</td>
                  <td className="py-3 px-4 text-center text-black-text">{item.qtyScoreSemester2}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2 items-center">
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-orange-text hover:text-orange-600"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="w-8 h-8 flex items-center justify-center text-orange-text hover:text-orange-600"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isDeleteModalOpen && (
            <DeleteModal
              title="Xóa"
              description="Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác."
              onCancel={handleCancelDelete}
              onConfirm={confirmDelete}
              isLoading={isDeleting}
            />
          )}
        </div>
      )}

      {/* FOOTER: Chọn số hàng/trang + Pagination */}
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
        <div className="flex items-center space-x-2 font-sans">
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

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ScoreTypes;
