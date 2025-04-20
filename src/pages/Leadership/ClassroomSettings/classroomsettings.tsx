import React, { useEffect, useState, useRef } from 'react';
import Button from '../../../components/Button';
import plus from '../../../assets/icons/Plus.png';
import edit from '../../../assets/icons/fi_edit.png';
import trash from '../../../assets/icons/fi_trash-2.png';
import search from '../../../assets/icons/fi_search.png';
import arrow_right from '../../../assets/icons/chevron_big_right.png';
import arrow_left from '../../../assets/icons/arrow left.png';
import Dropdown from '../../../components/Dropdown';
import Popup from '../../../components/PopupClassSetting';
import { DropdownOption } from '../../../components/Dropdown/type';
import Breadcrumb from '../../../components/AddressUrlStack/Index';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import arrowupdown from '../../../assets/icons/u_arrow up down.png';
import './style.scss';
import '../../../styles/_variables.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import createAxiosInstance from '../../../utils/axiosInstance';
import { wait } from '@testing-library/user-event/dist/utils';
const axiosTrue = createAxiosInstance(true);

const ClassroomSettings: React.FC = () => {
  const token = Cookies.get('accessToken');
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [yearOptions, setYearOptions] = useState<DropdownOption[]>([]);
  const [classTypes, setClassTypes] = useState<any[]>([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [hasFetchedYears, setHasFetchedYears] = useState(false);
  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Quản lý popup sửa
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any | null>(null);

  // Quản lý popup xóa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);

  // Debounce state
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Quản lý popup thêm
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [selectedPopupYear, setSelectedPopupYear] = useState<DropdownOption | null>(null);

  // -----------------------------
  // 1) Lấy danh sách niên khoá
  // -----------------------------
  const fetchAcademicYears = async () => {
    if (hasFetchedYears) return;

    try {
      const response = await axiosTrue.get('https://fivefood.shop/api/academic-years');

      const result = response.data;
      if (!result || !Array.isArray(result.data)) {
        throw new Error('API không trả về danh sách niên khóa hợp lệ');
      }

      const formattedYears: DropdownOption[] = result.data.map((year: any) => ({
        label: year.name,
        value: year.id.toString(),
      }));

      setYearOptions(formattedYears);
      setHasFetchedYears(true);
    } catch (error) {
      console.error('Lỗi khi fetch năm học:', error);
    }
  };

  // -----------------------------
  // 2) Lấy danh sách lớp
  // -----------------------------
  useEffect(() => {
    if (!selectedYearOption) {
      setClassTypes([]);
      setTotalPages(1);
      return;
    }

    const controller = new AbortController();

    const fetchClassTypes = async () => {
      try {
        const yearValue = selectedYearOption.value;
        const url = `https://fivefood.shop/api/class-type?searchYear=${yearValue}&searchName=${encodeURIComponent(
          searchTerm,
        )}&page=${currentPage}&pageSize=${itemsPerPage}&sortColumn=Id&sortOrder=desc`;

        // const response = await axios.get(url, {
        //   signal: controller.signal,
        //   headers: authHeaders,
        // });
        const response = await axiosTrue.get(url);

        const result = response.data;
        const items = (result.data || []).filter((item: any) => item.isDelete === false);
        setClassTypes(items);
        setTotalPages(result.totalPages || 1);
      } catch (err: any) {
        if (err.name !== 'CanceledError') {
          console.error('Lỗi khi fetch:', err);
        }
      }
    };

    fetchClassTypes();

    return () => {
      controller.abort();
    };
  }, [selectedYearOption, searchTerm, currentPage, itemsPerPage]);
  // -----------------------------
  // 3) Debounce thay đổi itemsPerPage
  // -----------------------------
  useEffect(() => {
    if (inputValue > 0) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        if (inputValue !== itemsPerPage) {
          setItemsPerPage(inputValue);
          setCurrentPage(1);
        }
      }, 500);
    }
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [inputValue, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // -----------------------------
  // 5) Popup Xóa
  // -----------------------------
  const handleOpenModal = (id: number | string) => {
    setClassToDelete(id.toString());
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClassToDelete(null);
  };

  const API_URL = 'https://fivefood.shop/api/class-type';

  const handleConfirmDelete = async () => {
    if (!classToDelete) return;
    try {
      const response = await axiosTrue.delete(`${API_URL}/${classToDelete}`);

      if (response.status === 200) {
        setClassTypes((prev) => prev.filter((ct) => ct.id.toString() !== classToDelete));
        toast.success('Đã xóa thành công lớp học.');
      } else {
        toast.error('Đã xảy ra lỗi khi xóa lớp học.');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa lớp học.');
    }
    setIsModalOpen(false);
    setClassToDelete(null);
  };

  // -----------------------------
  // 6) Popup Sửa
  // -----------------------------
  // Lấy data by ID -> mở Popup
  const handleEditClass = async (id: string) => {
    try {
      setEditingClassId(id);
      const response = await axiosTrue.get(`${API_URL}/${id}`);

      const detail = response.data?.data;

      setEditingData({
        id: detail.id,
        name: detail.name,
        status: detail.status,
        description: detail.description,
        academicYear: detail.academicYear,
      });
    } catch (error) {
      console.error('Lỗi fetch detail:', error);
      toast.error('Lỗi khi lấy dữ liệu.');
    }
  };

  // Khi bấm "Lưu" trong popup
  const handleSavePopup = async (updatedData: any) => {
    if (!updatedData.id) return;

    try {
      const payload = {
        name: updatedData.name,
        description: updatedData.description,
        academicYearId: updatedData.academicYearId,
        status: updatedData.status,
      };

      // const res = await axios.put(`${API_URL}/${updatedData.id}`, payload, {
      //   headers: authHeaders,
      // });
      const res = await axiosTrue.put(`${API_URL}/${updatedData.id}`, payload);

      toast.success('Cập nhật lớp học thành công.');

      setEditingClassId(null);
      setEditingData(null);
      setClassTypes((prev) => prev.map((ct) => (ct.id === updatedData.id ? { ...ct, ...payload } : ct)));
    } catch (err) {
      toast.error('Đã xảy ra lỗi khi cập nhật lớp học.');
      console.error('Lỗi update:', err);
    }
  };

  // -----------------------------
  // 7) Popup Thêm
  // -----------------------------

  const handleAddClass = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        academicYearId: data.academicYearId ?? null,
        status: data.status,
      };

      const res = await axiosTrue.post(API_URL, payload);

      const result = res.data;

      if (selectedYearOption?.value === result.data.academicYear?.id?.toString()) {
        setClassTypes((prev) => [...prev, result.data]);
      }

      toast.success('Thêm loại lớp học thành công.');
      setIsAddPopupOpen(false);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi thêm loại lớp học.');
      console.error('Lỗi khi thêm mới:', error);
    }
  };

  // -----------------------------
  // Breadcrumb
  // -----------------------------
  const addresses = [
    { linkName: 'Cài đặt hệ thống', link: '/leadership/system-settings' },
    { linkName: 'Thiết lập lớp học', link: '/leadership/system-settings/classroom-settings' },
  ];

  return (
    <>
      <div className="breadcrum ml-5">
        <Breadcrumb addressList={addresses} type={true} />
      </div>

      <div className="tab-dropdown-btn">
        <div
          className="dropdown"
          onClick={() => {
            if (!hasFetchedYears) fetchAcademicYears();
          }}
        >
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)}
          />
        </div>

        <div className="flex justify-end">
          <Button className="primary" size="big" onClick={() => setIsAddPopupOpen(true)}>
            <img src={plus} alt="" />
            Thêm mới
          </Button>
        </div>
        {isAddPopupOpen && (
          <Popup
            titleBig="Thêm loại lớp học"
            titleSmall1="Loại lớp học"
            titleSmall2="Trạng thái"
            titleSmall3="Ghi chú"
            isOpen={true}
            onClose={() => setIsAddPopupOpen(false)}
            initActive={true}
            initName=""
            initDescription=""
            onSave={(data) =>
              handleAddClass({
                ...data,
                academicYearId: selectedPopupYear?.value ?? null,
              })
            }
            dropdown={true}
            dropdownOptions={yearOptions}
            selectedDropdown={selectedPopupYear}
            onSelectDropdown={setSelectedPopupYear}
          />
        )}
      </div>

      <div className="content-classrooomsettings">
        <div className="head-content-classrooomsettings">
          <p className="title-classrooomsettings">Danh sách các loại lớp học</p>
          <div className="search-classrooomsettings">
            <button className="search-button-classrooomsettings">
              <img src={search} alt="search" className="icon-search" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Bảng */}
        <div className="main-content-classrooomsettings">
          <table className="w-full border-collapse">
            <thead className="bg-br-gradient-top-or text-white">
              <tr>
                <th className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    Loại lớp
                    <img src={arrowupdown} alt="Sort Icon" className="w-6 h-6" />
                  </div>
                </th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-left">Ghi chú</th>
                <th className="p-3 text-center"></th>
              </tr>
            </thead>

            <tbody>
              {classTypes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                classTypes.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                    <td className="p-3 text-center">{item.name}</td>
                    <td className={`p-3 text-center ${item.status ? 'text-blue-600' : 'text-red-600'}`}>
                      {item.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      {/* Bấm Sửa => gọi handleEditClass */}
                      <button onClick={() => handleEditClass(item.id.toString())} className="rounded-lg">
                        <img src={edit} alt="edit" className="w-5 h-5" />
                      </button>
                      {/* Bấm Xoá */}
                      <button onClick={() => handleOpenModal(item.id)}>
                        <img src={trash} alt="trash" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Popup Sửa */}
        {editingClassId && editingData && (
          <Popup
            titleBig="Thiết lập lớp học"
            titleSmall1="Loại lớp học"
            titleSmall2="Trạng thái"
            titleSmall3="Ghi chú"
            isOpen={true}
            onClose={() => {
              setEditingClassId(null);
              setEditingData(null);
            }}
            initId={editingData.id}
            initName={editingData.name}
            initDescription={editingData.description}
            initActive={editingData.status}
            onSave={(data) =>
              handleSavePopup({
                ...data,
                id: editingData.id,
                academicYearId: editingData.academicYear?.id ?? 0,
              })
            }
          />
        )}

        {/* Popup Xoá */}
        {isModalOpen && classToDelete && (
          <DeleteConfirmation
            title="Xác nhận xoá loại lớp học"
            description={`Bạn có chắc chắn muốn xóa loại lớp học có ID: ${classToDelete}?`}
            onCancel={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
        )}

        {/* Footer phân trang */}
        <div className="footer-content-classroomsettings flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="mr-2">Hiển thị</span>
            <input
              type="number"
              min={8}
              className="w-12 border rounded p-1 text-center"
              value={inputValue}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) setInputValue(val);
              }}
              onKeyDown={(e) => {
                if (!['ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <span className="ml-2">hàng trong mỗi trang</span>
          </div>

          {/* PHÂN TRANG RÚT GỌN */}
          <div className="pagination flex gap-2">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <img src={arrow_left} alt="Trước" className="h-4" />
            </button>
            {totalPages <= 5 ? (
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page ${currentPage === index + 1 ? 'active bg-blue-500 text-white' : ''}`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <>
                {currentPage > 3 && (
                  <>
                    <button className="page" onClick={() => goToPage(1)}>
                      1
                    </button>
                    {currentPage > 4 && <span>...</span>}
                  </>
                )}
                {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                  .filter((page) => page >= 1 && page <= totalPages)
                  .map((page) => (
                    <button
                      key={page}
                      className={`page ${currentPage === page ? 'active bg-blue-500 text-white' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span>...</span>}
                    <button className="page" onClick={() => goToPage(totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            )}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <img src={arrow_right} alt="Sau" className="h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomSettings;
