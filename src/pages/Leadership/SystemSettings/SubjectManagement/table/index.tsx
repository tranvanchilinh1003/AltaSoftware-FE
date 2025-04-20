
import { useState, useEffect } from 'react';
import './style.css';
import '../../../../../styles/_variables.scss';
import editIcon from '../../../../../assets/icons/fi_edit.png';
import deleteIcon from '../../../../../assets/icons/fi_trash-2.png';
import searchIcon from '../../../../../assets/icons/fi_search.png';
import arrowRight from '../../../../../assets/icons/chevron_big_right.png';
import arrowLeft from '../../../../../assets/icons/arrow left.png';
import arrowUpDown from '../../../../../assets/icons/u_arrow up down.png';

import Popup from '../../../../../components/Popup';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';
import { DropdownOption } from '../../../../../components/Dropdown/type';
import { toast } from 'react-toastify';
import createAxiosInstance from '../../../../../utils/axiosInstance';

const axiosTrue = createAxiosInstance(true);
const API_URL = 'https://fivefood.shop/api/subject-types';

interface Props {
  selectedYearOption: DropdownOption | null;
}

interface Props {
  selectedYearOption: DropdownOption | null;
  reloadTrigger?: boolean; // ✅ thêm vào đây
}

const ClassManagementTable: React.FC<Props> = ({ selectedYearOption, reloadTrigger }) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<number | null>(null);
  const [editingSubject, setEditingSubject] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    if (!selectedYearOption) return;
    setLoading(true);
    try {
      const res = await axiosTrue.get(`${API_URL}?yearId=${selectedYearOption.value}`);
      if (res.data.code === 0) {
        setSubjects(res.data.data);
      }
    } catch (err) {
      toast.error('Không thể tải danh sách môn học.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [selectedYearOption, reloadTrigger]); // ✅ theo dõi thêm reloadTrigger

  const filteredSubjects = subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const currentData = filteredSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id: number) => {
    setSubjectToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (subjectToDelete === null) return;
    try {
      await axiosTrue.delete(`${API_URL}/${subjectToDelete}`);
      setSubjects(subjects.filter((s) => s.id !== subjectToDelete));
      toast.success('Đã xoá môn học thành công!');
    } catch {
      toast.error('Xoá thất bại. Vui lòng thử lại.');
    } finally {
      setIsModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await axiosTrue.get(`${API_URL}/${id}`);
      setEditingSubject(res.data.data);
    } catch (err) {
      toast.error('Không thể tải dữ liệu môn học.');
    }
  };

  const saveEdit = async (data: any) => {
    const payload = {
      name: data.name,
      description: data.description,
      status: data.status,
      AcademicYearsId: data.AcademicYearsId,
    };

    try {
      await axiosTrue.put(`${API_URL}/${data.id}`, payload);
      setSubjects((prev) => prev.map((s) => (s.id === data.id ? { ...s, ...payload } : s)));
      toast.success('Cập nhật môn học thành công!');
      setEditingSubject(null);
    } catch (err) {
      toast.error('Cập nhật thất bại!');
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="content-classrooomsettings">
      <div className="head-content-classrooomsettings">
        <p className="title-classrooomsettings">Danh sách các loại môn học</p>
        <div className="search-classrooomsettings">
          <button className="search-button-classrooomsettings">
            <img src={searchIcon} alt="Tìm kiếm" />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="main-content-classrooomsettings">
        <table className="w-full border-collapse">
          <thead className="bg-br-gradient-top-or text-white">
            <tr>
              <th className="p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  Loại môn
                  <img src={arrowUpDown} alt="Sắp xếp" className="w-6 h-6" />
                </div>
              </th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-left">Ghi chú</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : currentData.length ? (
              currentData.map((item, index) => (
                <tr key={item.id} className={index % 2 ? 'bg-gray-100' : 'bg-gray-200'}>
                  <td className="p-3 text-center">{item.name}</td>
                  <td className={`p-3 text-center ${item.status ? 'text-blue-600' : 'text-red-600'}`}>
                    {item.status ? 'Hoạt động' : 'Không hoạt động'}
                  </td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button onClick={() => handleEdit(item.id)}>
                      <img src={editIcon} alt="Sửa" className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      <img src={deleteIcon} alt="Xoá" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer-content-classroomsettings flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2">Hiển thị</span>
          <input
            type="number"
            className="w-16 border rounded p-1 text-center"
            value={itemsPerPage}
            min={1}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > 0) setItemsPerPage(val);
            }}
          />
          <span className="ml-2">hàng / trang</span>
        </div>

        <div className="pagination flex gap-2">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <img src={arrowLeft} alt="Trước" className="h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium 
    ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <img src={arrowRight} alt="Sau" className="h-4" />
          </button>
        </div>
      </div>

      {isModalOpen && subjectToDelete !== null && (
        <DeleteConfirmation
          title="Xác nhận xoá môn học"
          description="Bạn có chắc muốn xóa môn học này không?"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}

      {editingSubject && (
        <Popup
          titleBig="Thiết lập lớp học"
          titleSmall1="Loại lớp học"
          titleSmall2="Trạng thái"
          titleSmall3="Ghi chú"
          isOpen={true}
          onClose={() => setEditingSubject(null)}
          initId={editingSubject.id}
          initName={editingSubject.name}
          initDescription={editingSubject.description}
          initActive={editingSubject.status}
          onSave={(data) =>
            saveEdit({
              ...data,
              id: editingSubject.id,
              AcademicYearsId: editingSubject.academicYear?.id || 0,
            })
          }
        />
      )}
    </div>
  );
};

export default ClassManagementTable;
