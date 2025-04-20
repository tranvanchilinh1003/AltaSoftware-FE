import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell, TableRow } from '../../../../../components/ui/tabble';
import IconImages from '../../../../../components/IconImages';
import { StudentRetentionListTableRowProps } from './type';
import { Link } from 'react-router-dom';
import { columns } from '../tableColumns';
import {
  deleteStudentRetention,
  fetchStudentRetention,
} from '../../../../../redux/reducers/Leadership/StudentProfile/StudentRetention/StudentRetention';
import DeleteModal from '../../../../../components/DeleteConfirmation';
import { AppDispatch } from './../../../../../redux/store';
import { RootState } from './../../../../../redux/store';
import { toast } from 'react-toastify';

const StudentRetentionListTableRow: React.FC<StudentRetentionListTableRowProps> = ({ item, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number } | null>(null);
  const { StudentRetention, loading, error } = useSelector((state: RootState) => state.studentRetention);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(StudentRetention?.pageSize || 5);
  const [currentPage, setCurrentPage] = useState(StudentRetention?.page || 1);

  const handleOpenDeleteModal = () => {
    setSelectedItem({ id: item.id });
    setIsDeleteModalOpen(true);
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    await dispatch(deleteStudentRetention(item.id));

    const isLastItemOnPage = StudentRetention?.data.length === 1;
    const newPage = isLastItemOnPage && currentPage > 1 ? currentPage - 1 : currentPage;
    setIsDeleteModalOpen(false);
    toast.success('Xóa thành công!');
    dispatch(fetchStudentRetention({ page: newPage, pageSize: itemsPerPage, search, sortColumn, sortOrder }) as any);
  };

  return (
    <>
      <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
        {columns.map((col) => (
          <TableCell key={col.key} className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base ">
            {col.isDate ? new Date(item[col.key]).toLocaleDateString() : item[col.key]}
          </TableCell>
        ))}
        {/* Cột chứa nút chức năng */}
        <TableCell className="px-4 py-3 text-start w-[150px]">
          <div className="flex gap-2">
            <button>
              <div className="flex gap-2">
                <Link to={`/leadership/update-student-retention/${item.id}`}>
                  <img src={IconImages.OrangeEditWriteOutline} alt="Sửa" className="w-4 md:w-5 lg:w-6" />
                </Link>
                <button onClick={handleOpenDeleteModal}>
                  <img src={IconImages.iconTrashBinOutlineOrange} alt="Xóa" className="w-4 md:w-5 lg:w-6" />
                </button>
              </div>
            </button>
          </div>
        </TableCell>
      </TableRow>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && selectedItem && (
        <DeleteModal
          title="Xóa bậc đào tạo"
          description={`Xác nhận muốn xoá bậc đào tạo này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.`}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default StudentRetentionListTableRow;
