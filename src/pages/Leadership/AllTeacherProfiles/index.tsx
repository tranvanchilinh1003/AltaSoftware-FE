import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Button from '../../../components/Button';
import DropdownSelectionComponent from '../../../components/DropdownSelection';
import CheckboxComponent from '../../../components/CheckBox';
import Status from '../../../components/Status';
import AddressList from '../../../components/AddressUrlStack/Index';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router';
import { ILecturerProfile, ISubject } from './type';
import DeleteModal from '../../../components/DeleteConfirmation';
import Pagination from '../../../components/PaginationCustom';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import createAxiosInstance from "../../../utils/axiosInstance";
const API_BASE_URL = "https://fivefood.shop/api";


const mapStatusToType = (status: number) => {
  switch (status) {
    case 6:
      return 'studying'; // Đang làm việc
    case 7:
      return 'graduated'; // Tạm nghỉ
    case 8:
      return 'dropped'; // Đã nghỉ việc
    case 9:
      return 'classTransferred'; // Nghỉ hưu
    default:
      return 'studying'; // Mặc định
  }
};
const mapStatusToLabel = (status: number) => {
  switch (status) {
    case 6:
      return 'Đang làm việc';
    case 7:
      return 'Tạm nghỉ';
    case 8:
      return 'Đã nghỉ việc';
    case 9:
      return 'Nghỉ hưu';
    default:
      return 'Không xác định'; // Mặc định nếu không khớp
  }
};

const option_date = ['2020-2021', '2019-2020', '2018-2019', '2017-2018'];

const items = [
  {
    key: '1',
    label: 'Sửa hồ sơ',
  },
  {
    key: '2',
    label: 'Cập nhật nghỉ hưu',
  },
  {
    key: '3',
    label: 'Cập nhật nghỉ việc',
  },
  {
    key: '4',
    label: 'Cập nhật tạm nghỉ',
  },
];
const AllTeacherProfiles: React.FC = () => {
  const [urls, setUrls] = useState([
    { link: '', linkName: 'Hồ sơ giảng viên' },
    { link: '', linkName: 'Tất cả hồ sơ' },
  ]);
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllDeleteModal, setIsAllDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<ILecturerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<string>('')
  const [cookies] = useCookies(["accessToken"]);
  const axiosInstance = createAxiosInstance();
  const [dataSubject, setDataSubject] = useState<ISubject[]>([])
  const handleMenuClick = (key: string, id?: number) => {
    if (key === '1') {
      navigate(`/leadership/InstructorProfile/${id}?tab=edit`);
    } else if (key === '2') {
      navigate(`/leadership/all-teacher-profiles/retirement/${id}`);
    } else if (key === '3') {
      navigate(`/leadership/all-teacher-profiles/resignation/${id}`);
    } else if (key === '4') {
      navigate(`/leadership/all-teacher-profiles/stop-working/${id}`);
    }
  };


  const filteredItems = (status: number) => {
    return items.filter((item) => {
      if (status === 9) {
        return item.key === '3' || item.key === '1';
      }
      if (status === 8) {
        return item.key === '1';
      }
      return true;
    });
  };

  const fetchData = useCallback(
    async (page: number, pageSize: number = itemsPerPage, searchQuery: string = searchTerm) => {
      setLoading(true);
      const token = cookies.accessToken;
      if (!token) {
        setMessage('Không có dữ liệu...');
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/teacherlists`, {
          params: {
            page,
            pageSize,
            search: searchQuery,
            sortColumn: 'Id',
            sortOrder: 'asc',
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const dataList = response.data;

        if (dataList.code === 0 && Array.isArray(dataList.data) && dataList.data.length > 0) {
          setTeachers(dataList.data); // Cập nhật danh sách giảng viên
          setCurrentPage(dataList.page); // Cập nhật trang hiện tại
          setTotalPages(dataList.totalPages); // Cập nhật tổng số trang
        } else {
          setTeachers([]);
          setMessage('Không tìm thấy dữ liệu...');
        }
      } catch (error: any) {
        console.error('Lỗi khi gọi API:', error.response?.data || error.message);
        setMessage('Không có dữ liệu...');
      }
    },
    [itemsPerPage, searchTerm],
  );

  const fetchSubjectName = async () => {
    try {
      const response = await axiosInstance.get('https://fivefood.shop/api/subjects');
      setDataSubject(response.data.data)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
    fetchSubjectName();
  }, [itemsPerPage, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchData(1, itemsPerPage, value); // Gọi filter luôn khi gõ
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(1, itemsPerPage, searchTerm);
  };
  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData(1, itemsPerPage, searchTerm); // Gọi API tìm kiếm với từ khóa hiện tại
  };

  // Xóa dữ liệuliệu
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleSelectTeacher = (teacherId: number) => {
    setSelectedTeachers((prev) => {
      if (prev.includes(teacherId)) {
        // Bỏ chọn giáo viên đó
        return prev.filter((id) => id !== teacherId);
      } else {
        // Chọn thêm giáo viên
        return [...prev, teacherId];
      }
    });
  };
  const handleCheckboxChange = (teacherId: number) => {
    handleSelectTeacher(teacherId);
  };
  const handleSelectAll = () => {
    if (selectedTeachers.length === teachers.length) {
      // Nếu đã chọn hết, bỏ chọn tất cả
      setSelectedTeachers([]);
    } else {
      // Nếu chưa chọn hết, chọn tất cả
      setSelectedTeachers(teachers.map((t) => t.id));
    }
  };

  const handleDeleteClickAll = () => {
    if (selectedTeachers.length === 0) return;

    setIsModalOpen(true);
  };
  // api xóa
  const deleteTeacher = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/teacherinfos/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        return id;
      } else {
        throw new Error(`Ẩn thất bại: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Lỗi khi ẩn giảng viên ${id}:`, error);
      throw id;
    }
  };
  // xác nhận xóa
  const handleConfirmDeleteAll = useCallback(async () => {
    if (selectedTeachers.length === 0) return;

    try {
      setLoading(true);

      const deleteResults = await Promise.allSettled(selectedTeachers.map((id) => deleteTeacher(id)));

      const successfullyDeleted = deleteResults
        .filter((res) => res.status === 'fulfilled')
        .map((res) => (res as PromiseFulfilledResult<number>).value);

      const failedDeletions = deleteResults.filter((res) => res.status === 'rejected').map((res) => (res as PromiseRejectedResult).reason);

      if (successfullyDeleted.length > 0) {
        toast.success(`Đã xóa ${successfullyDeleted.length} giảng viên thành công!`);
        await fetchData(1, 10);
        setSelectedTeachers([]);
      }

      if (failedDeletions.length > 0) {
        toast.error(`Xóa thất bại với ${failedDeletions.length} giảng viên.`);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi xóa giảng viên.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  }, [selectedTeachers, fetchData]);

  // Pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    fetchData(1, newSize);
  };
  // đến teacher edit
  const goEditTeacher = (id: number) => {
    navigate(`/leadership/InstructorProfile/${id}`);
  };
  // đến teacher addadd
  const goAddTeacher = () => {
    navigate(`/leadership/all-teacher-profiles/AddTeacher`);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(teachers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Giáo viên');

    // Tạo file buffer và lưu
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(data, 'DanhSachGiaoVien.xlsx');
  };

  return (
    <div className="p-3">
      <AddressList addressList={urls} />

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="space-x-2 flex justify">
          <button
            className="border-r-[2px]"
            title="Xóa"
            onClick={handleDeleteClickAll}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3906 4.39118C12.6407 4.14113 12.9798 4.00065 13.3334 4.00065H18.6667C19.0204 4.00065 19.3595 4.14113 19.6096 4.39118C19.8596 4.64122 20.0001 4.98036 20.0001 5.33398V6.66732H12.0001V5.33398C12.0001 4.98036 12.1406 4.64122 12.3906 4.39118ZM9.33341 6.66732V5.33398C9.33341 4.27312 9.75484 3.2557 10.505 2.50556C11.2551 1.75541 12.2725 1.33398 13.3334 1.33398H18.6667C19.7276 1.33398 20.745 1.75541 21.4952 2.50556C22.2453 3.2557 22.6667 4.27312 22.6667 5.33398V6.66732H25.3334H28.0001C28.7365 6.66732 29.3334 7.26427 29.3334 8.00065C29.3334 8.73703 28.7365 9.33398 28.0001 9.33398H26.6667V26.6673C26.6667 27.7282 26.2453 28.7456 25.4952 29.4957C24.745 30.2459 23.7276 30.6673 22.6667 30.6673H9.33341C8.27255 30.6673 7.25513 30.2459 6.50499 29.4957C5.75484 28.7456 5.33341 27.7282 5.33341 26.6673V9.33398H4.00008C3.2637 9.33398 2.66675 8.73703 2.66675 8.00065C2.66675 7.26427 3.2637 6.66732 4.00008 6.66732H6.66675H9.33341ZM8.00008 9.33398V26.6673C8.00008 27.0209 8.14056 27.3601 8.39061 27.6101C8.64065 27.8602 8.97979 28.0006 9.33341 28.0006H22.6667C23.0204 28.0006 23.3595 27.8602 23.6096 27.6101C23.8596 27.3601 24.0001 27.0209 24.0001 26.6673V9.33398H8.00008ZM18.6667 13.334C19.4031 13.334 20.0001 13.9309 20.0001 14.6673V22.6673C20.0001 23.4037 19.4031 24.0007 18.6667 24.0007C17.9304 24.0007 17.3334 23.4037 17.3334 22.6673V14.6673C17.3334 13.9309 17.9304 13.334 18.6667 13.334ZM14.6667 14.6673C14.6667 13.9309 14.0698 13.334 13.3334 13.334C12.597 13.334 12.0001 13.9309 12.0001 14.6673V22.6673C12.0001 23.4037 12.597 24.0007 13.3334 24.0007C14.0698 24.0007 14.6667 23.4037 14.6667 22.6673V14.6673Z"
                fill="#FF7506"
              />
            </svg>
          </button>
          <Button className="outline-primary" onClick={handleExportExcel}>
            Xuất file
          </Button>
          <Button className="primary" onClick={goAddTeacher}>
            + Thêm mới
          </Button>
        </div>
      </div>

      <div className=" flex flex-col min-h-[752px]  bg-background-white shadow-custom rounded-lg">
        <div className="flex flex-wrap justify-between items-center px-2 md:px-10 pt-4 gap-2 ">
          <h2 className="text-lg font-sans font-bold">Danh sách giảng viên</h2>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300 bg-gray-200">
              <button type="button" onClick={handleClickSearch} className="absolute right-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </button>
              <input
                type="text"
                name="search-teacher"
                placeholder="Tìm kiếm giảng viên..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full h-[40px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic bg-gray-200"
              />
            </div>
          </form>
        </div>
        <div className="overflow-x-auto py-6 px-8">
          <table className="min-w-full   border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
              <tr>
                <th className="py-3 px-4 text-center w-[50px] ">
                  <CheckboxComponent
                    isChecked={Array.isArray(teachers) && selectedTeachers.length === teachers.length && teachers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center font-sans">
                    <span>Mã giảng viên </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  <div className="flex items-center font-sans">
                    <span>Tên giảng viên </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center font-sans">
                    <span>Ngày sinh </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center font-sans">
                    <span>Giới tính </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center font-sans">
                    <span>Tổ - Bộ môn </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center font-sans">
                    <span>Chức vụ </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  <div className="flex items-center font-sans">
                    <span>Tình trạng </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z"
                        fill="white"
                      />
                      <path
                        d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {teachers?.length > 0 ? (
                teachers.map((teacher, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="py-3 px-4 text-center">
                      <CheckboxComponent isChecked={selectedTeachers.includes(teacher.id)} onChange={handleCheckboxChange.bind(null, teacher.id)} />
                    </td>
                    <td className="py-3 px-4 text-black-text ">{teacher.teacherCode}</td>
                    <td className="py-3 px-4 text-black-text ">{teacher.fullName} </td>
                    <td className="py-3 px-4 text-black-text "> {new Date(teacher.birthDate).toLocaleDateString('vi-VN')}</td>
                    <td className="py-3 px-4 text-black-text ">{teacher.gender ? 'Nam' : 'Nữ'}</td>
                    <td className="py-3 px-4 text-black-text ">{dataSubject.find((sub) => sub.id === teacher.subjectId)?.name || 'Chưa rõ'}</td>

                    <td className="py-3 px-4 text-black-text ">{teacher.position}</td>
                    <td className="py-3 px-4 text-black-text ">
                      <Status type={mapStatusToType(teacher.status)} label={mapStatusToLabel(teacher.status)} />
                    </td>
                    <td className="flex justify-between ">
                      <button onClick={goEditTeacher.bind(null, teacher.id)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M29.2268 15.4663C26.5334 9.21301 21.4668 5.33301 16.0001 5.33301C10.5334 5.33301 5.46676 9.21301 2.77342 15.4663C2.7 15.6346 2.66211 15.8161 2.66211 15.9997C2.66211 16.1832 2.7 16.3648 2.77342 16.533C5.46676 22.7863 10.5334 26.6663 16.0001 26.6663C21.4668 26.6663 26.5334 22.7863 29.2268 16.533C29.3002 16.3648 29.3381 16.1832 29.3381 15.9997C29.3381 15.8161 29.3002 15.6346 29.2268 15.4663ZM16.0001 23.9997C11.7734 23.9997 7.77342 20.9463 5.46676 15.9997C7.77342 11.053 11.7734 7.99967 16.0001 7.99967C20.2268 7.99967 24.2268 11.053 26.5334 15.9997C24.2268 20.9463 20.2268 23.9997 16.0001 23.9997ZM16.0001 10.6663C14.9453 10.6663 13.9141 10.9791 13.037 11.5652C12.16 12.1512 11.4764 12.9842 11.0727 13.9587C10.6691 14.9332 10.5634 16.0056 10.7692 17.0402C10.975 18.0747 11.483 19.025 12.2289 19.7709C12.9747 20.5168 13.925 21.0247 14.9596 21.2305C15.9942 21.4363 17.0665 21.3307 18.0411 20.927C19.0156 20.5234 19.8486 19.8398 20.4346 18.9627C21.0206 18.0857 21.3334 17.0545 21.3334 15.9997C21.3334 14.5852 20.7715 13.2286 19.7713 12.2284C18.7711 11.2282 17.4146 10.6663 16.0001 10.6663ZM16.0001 18.6663C15.4727 18.6663 14.9571 18.5099 14.5186 18.2169C14.08 17.9239 13.7382 17.5074 13.5364 17.0202C13.3346 16.5329 13.2818 15.9967 13.3847 15.4794C13.4876 14.9622 13.7415 14.487 14.1145 14.1141C14.4874 13.7411 14.9626 13.4871 15.4798 13.3842C15.9971 13.2814 16.5333 13.3342 17.0206 13.536C17.5078 13.7378 17.9243 14.0796 18.2173 14.5182C18.5104 14.9567 18.6668 15.4723 18.6668 15.9997C18.6668 16.7069 18.3858 17.3852 17.8857 17.8853C17.3856 18.3854 16.7073 18.6663 16.0001 18.6663Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </button>

                      <Dropdown
                        menu={{ items: filteredItems(teacher.status), onClick: ({ key }) => handleMenuClick(key, teacher.id) }}
                        placement="bottom"
                        arrow={{ pointAtCenter: true }}
                        className={`ms-2 `}
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_2295_53360)">
                            <g clip-path="url(#clip1_2295_53360)">
                              <path
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M21.3333 18.6663C21.3333 17.93 21.9302 17.333 22.6666 17.333H30.6666C31.403 17.333 31.9999 17.93 31.9999 18.6663V26.6663C31.9999 27.4027 31.403 27.9997 30.6666 27.9997C29.9302 27.9997 29.3333 27.4027 29.3333 26.6663V19.9997H22.6666C21.9302 19.9997 21.3333 19.4027 21.3333 18.6663Z"
                                fill="#FF7506"
                              />
                              <path
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M1.33333 4C2.06971 4 2.66667 4.59695 2.66667 5.33333V12H9.33333C10.0697 12 10.6667 12.597 10.6667 13.3333C10.6667 14.0697 10.0697 14.6667 9.33333 14.6667H1.33333C0.596954 14.6667 0 14.0697 0 13.3333V5.33333C0 4.59695 0.596954 4 1.33333 4Z"
                                fill="#FF7506"
                              />
                              <path
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M12.3026 3.19497C14.4662 2.56914 16.7531 2.5016 18.9499 2.99865C21.1466 3.4957 23.1817 4.54113 24.8652 6.03741C26.5486 7.53368 27.8256 9.43202 28.577 11.5553C28.8226 12.2495 28.459 13.0114 27.7648 13.2571C27.0706 13.5027 26.3087 13.1391 26.063 12.4449C25.462 10.7463 24.4404 9.22759 23.0936 8.03058C21.7468 6.83356 20.1188 5.99721 18.3614 5.59957C16.604 5.20193 14.7745 5.25597 13.0436 5.75663C11.3127 6.25729 9.73682 7.18826 8.46305 8.46267C8.4532 8.47253 8.44319 8.48223 8.43304 8.49177L2.24637 14.3051C1.70973 14.8094 0.865922 14.7831 0.361667 14.2465C-0.142589 13.7098 -0.116337 12.866 0.420302 12.3618L6.59214 6.56237C8.18169 4.97713 10.1459 3.81881 12.3026 3.19497ZM31.6383 17.7537C32.1426 18.2904 32.1163 19.1342 31.5797 19.6384L25.4079 25.4379C23.8183 27.0231 21.8541 28.1814 19.6974 28.8052C17.5338 29.4311 15.2469 29.4986 13.0501 29.0016C10.8534 28.5045 8.81831 27.4591 7.13485 25.9628C5.4514 24.4665 4.17441 22.5682 3.42305 20.4449C3.1774 19.7507 3.54101 18.9888 4.23521 18.7431C4.92941 18.4975 5.69131 18.8611 5.93696 19.5553C6.53805 21.2539 7.55963 22.7726 8.9064 23.9696C10.2532 25.1666 11.8812 26.003 13.6386 26.4006C15.396 26.7983 17.2256 26.7442 18.9564 26.2436C20.6873 25.7429 22.2632 24.8119 23.537 23.5375C23.5429 23.5316 23.5489 23.5257 23.5549 23.5199C23.5589 23.5161 23.5629 23.5122 23.567 23.5084L29.7536 17.6951C30.2903 17.1908 31.1341 17.2171 31.6383 17.7537Z"
                                fill="#FF7506"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_2295_53360">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                            <clipPath id="clip1_2295_53360">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Dropdown>

                      <button className="ms-2" onClick={handleDeleteClick} title="Xóa" disabled={!selectedTeachers.includes(teacher.id)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd" className={selectedTeachers.includes(teacher.id) ? '' : 'opacity-50 cursor-not-allowed'}
                            d="M12.3906 4.39118C12.6407 4.14113 12.9798 4.00065 13.3334 4.00065H18.6667C19.0204 4.00065 19.3595 4.14113 19.6096 4.39118C19.8596 4.64122 20.0001 4.98036 20.0001 5.33398V6.66732H12.0001V5.33398C12.0001 4.98036 12.1406 4.64122 12.3906 4.39118ZM9.33341 6.66732V5.33398C9.33341 4.27312 9.75484 3.2557 10.505 2.50556C11.2551 1.75541 12.2725 1.33398 13.3334 1.33398H18.6667C19.7276 1.33398 20.745 1.75541 21.4952 2.50556C22.2453 3.2557 22.6667 4.27312 22.6667 5.33398V6.66732H25.3334H28.0001C28.7365 6.66732 29.3334 7.26427 29.3334 8.00065C29.3334 8.73703 28.7365 9.33398 28.0001 9.33398H26.6667V26.6673C26.6667 27.7282 26.2453 28.7456 25.4952 29.4957C24.745 30.2459 23.7276 30.6673 22.6667 30.6673H9.33341C8.27255 30.6673 7.25513 30.2459 6.50499 29.4957C5.75484 28.7456 5.33341 27.7282 5.33341 26.6673V9.33398H4.00008C3.2637 9.33398 2.66675 8.73703 2.66675 8.00065C2.66675 7.26427 3.2637 6.66732 4.00008 6.66732H6.66675H9.33341ZM8.00008 9.33398V26.6673C8.00008 27.0209 8.14056 27.3601 8.39061 27.6101C8.64065 27.8602 8.97979 28.0006 9.33341 28.0006H22.6667C23.0204 28.0006 23.3595 27.8602 23.6096 27.6101C23.8596 27.3601 24.0001 27.0209 24.0001 26.6673V9.33398H8.00008ZM18.6667 13.334C19.4031 13.334 20.0001 13.9309 20.0001 14.6673V22.6673C20.0001 23.4037 19.4031 24.0007 18.6667 24.0007C17.9304 24.0007 17.3334 23.4037 17.3334 22.6673V14.6673C17.3334 13.9309 17.9304 13.334 18.6667 13.334ZM14.6667 14.6673C14.6667 13.9309 14.0698 13.334 13.3334 13.334C12.597 13.334 12.0001 13.9309 12.0001 14.6673V22.6673C12.0001 23.4037 12.597 24.0007 13.3334 24.0007C14.0698 24.0007 14.6667 23.4037 14.6667 22.6673V14.6673Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center ">
                  <td className="bg-[#F0F3F6]" colSpan={9}>
                    {message}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isModalOpen && (
            <DeleteModal
              title="Xóa"
              description="Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác."
              onCancel={setIsModalOpen.bind(null, false)}
              onConfirm={handleConfirmDeleteAll}
            />
          )}
          {isAllDeleteModal && (
            <DeleteModal
              title="Xóa"
              description="Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác."
              onCancel={setIsAllDeleteModal.bind(null, false)}
              onConfirm={handleConfirmDeleteAll}
            />
          )}
        </div>
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
    </div>
  );
};

export default AllTeacherProfiles;
