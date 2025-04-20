import { useCallback, useEffect, useState } from 'react';
import { WorkHistory } from './Types';
// import { workHistoryData as initialworkHistoryData } from './data';
import arrow_right from '../../../../assets/icons/icon-arrow-right.png';
import arrow_down from '../../../../assets/icons/caret-down_white.png';
import edit from '../../../../assets/icons/orange_edit_write_outline.png';
import fi_trash from '../../../../assets/icons/icon-fi_trash-2.png';
import fi_search from '../../../../assets/icons/fi_search.png';
import fi_plus from '../../../../assets/icons/fi_plus.png';
import TrainingList from '../../TrainingInfo/TrainingList';
import fiarrowupdown from '../../../../assets/icons/u_arrow up down.png';
import Button from '../../../../components/Button';
import SearchInput from '../../../../components/SearchTable';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';
import dayjs from 'dayjs';

import { Link, useNavigate, useParams } from 'react-router-dom';
import PaginationControls from '../../../../components/Pagination';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useTeacherContext } from '../InstructorProfile/TeacherContext';
const Workprocess = () => {
  const { id } = useParams<{ id: string }>();

  const [openSection, setOpenSection] = useState<string | null>('work');
  const [subjectGroups, setSubjectGroups] = useState<WorkHistory[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<WorkHistory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectGroupsList, setSubjectGroupsList] = useState<Record<number, string>>({});
  const [originalData, setOriginalData] = useState<WorkHistory[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchWorkProcess();
  }, [searchValue, currentPage, itemsPerPage]);
  const { teacherData } = useTeacherContext();
  useEffect(() => {
    fetchSubjectGroups();
  }, []);
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/leadership/all-teacher-profiles/addworkprocess', {
      state: {
        teacherId: teacherData.userId,
        id: teacherData.id,
      },
    });
  };
  const handleAddClickid = () => {
    navigate(`/leadership/all-teacher-profiles/editWorkProcess/${subjectGroups[0].id}`, {
      state: {
        teacherId: teacherData.userId,
        id: teacherData.id,
      },
    });
  };
  const axiosInstance = createAxiosInstance();

  const fetchWorkProcess = async () => {
    try {
      const response = await axiosInstance.get(`/api/work-process/getbyteacherid/${id}`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          sortColumn: 'Id',
          sortOrder: 'asc',
          search: searchValue,
        },
      });

      const data = response.data.data;
      const isArray = Array.isArray(data);
      const processedData = isArray ? data : data ? [data] : [];

      setSubjectGroups(processedData);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  const fetchSubjectGroups = async () => {
    try {
      const response = await axiosInstance.get('/api/subject-groups');
      const data = response.data.data || [];

      // Chuyển đổi danh sách thành object { id: name }
      const subjectMap = data.reduce((acc: any, item: any) => {
        acc[item.id] = item.name;
        return acc;
      }, {} as Record<number, string>);

      setSubjectGroupsList(subjectMap);
    } catch (error) {
      console.error('Lỗi khi tải nhóm môn học:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };
  const toggleSection = (section: string) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = useCallback((group: WorkHistory) => {
    setSelectedGroup(group);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedGroup) return;

    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.delete(`/api/work-process/${selectedGroup.id}`);
      setSubjectGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
      setIsDeleteModalOpen(false);
      toast.success('Xóa quá trình công tác thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      toast.error('Đã xảy ra lỗi khi xóa quá trình công tác.');
    }
  }, [selectedGroup]);

  return (
    <div className="overflow-x-auto flex-grow px-2 md:px-10">
      <div className="  border rounded-lg shadow-md overflow-hidden">
        <button
          onClick={toggleSection.bind(this, 'work')}
          className={` w-full h-[58px] text-left px-4 py-2 flex items-center justify-between transition-colors 
        ${openSection === 'work' ? 'bg-orange-500 text-white' : 'bg-white text-black-text border border-slate-100'}`}
        >
          <span className="flex items-center text-lg gap-2">
            {openSection === 'work' ? (
              <img src={arrow_down} alt="arrow down" className="w-5 h-3 transition-transform" />
            ) : (
              <img src={arrow_right} alt="arrow right" className="w-3 h-5 transition-transform" />
            )}
            Quá trình công tác
          </span>
        </button>

        {openSection === 'work' && (
          <div className="p-4 w-[95%] mx-auto  ">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
              <div className="w-[438px] h-10 relative">
                <img src={fi_search} alt="Search" className="absolute left-4 top-1/2 w-5 h-5 transform -translate-y-1/2" />

                <SearchInput placeholder="Tìm kiếm" value={searchValue} onChange={handleSearchChange} />
              </div>

              <Button onClick={handleAddClick} size="mini" className="primary">
                <img src={fi_plus} alt="Add Icon" />
                Thêm
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border rounded-lg text-center overflow-hidden">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Cơ quan/ Đơn vị
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Tổ/ Bộ môn
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Chức vụ
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Ngày bắt đầu
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Ngày kết thúc
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjectGroups.map((row, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                      <td className="p-2">{row.organization}</td>

                      {/* Thay subjectGroupsId bằng tên nhóm môn học */}
                      <td className="p-2">{subjectGroupsList[row.subjectGroupsId] || 'Đang tải...'}</td>
                      <td className="p-2">{row.position}</td>
                      <td className="p-2">{dayjs(row.startDate).format('DD/MM/YYYY')}</td>
                      <td className="p-2">{dayjs(row.endDate).format('DD/MM/YYYY')}</td>
                      <td className="p-2 text-center whitespace-nowrap space-x-4">
                        <button onClick={handleAddClickid}>
                          <img src={edit} alt="edit" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                        </button>

                        <button onClick={handleDeleteClick.bind(null, row)}>
                          <img src={fi_trash} alt="delete" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {totalPages > 1 && currentPage <= totalPages && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>

      <div className="pt-10">
        <TrainingList onClick={toggleSection.bind(this, 'education')} />
      </div>
      {isDeleteModalOpen && (
        <DeleteAcademicYearModal
          title="Xóa Quá Trình Công Tác"
          description="Xác nhận muốn xóa Quá Trình Công Tác này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Workprocess;
