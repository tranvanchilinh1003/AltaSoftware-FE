import { TableCell, TableRow } from '../../../../../components/ui/tabble';
import IconImages from '../../../../../components/IconImages';
import { TransferListTableRowProps } from './type';
import { Link } from 'react-router-dom';
import { columns } from '../tableColumns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteModal from '../../../../../components/DeleteConfirmation';
import {
  deleteTransferAcceptance,
  fetchTransferSchool,
} from '../../../../../redux/reducers/Leadership/StudentProfile/TransferAcceptance/TransferAcceptance';
import { RootState } from './../../../../../redux/store';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { AppDispatch } from './../../../../../redux/store';

const TransferListTableRow: React.FC<TransferListTableRowProps> = ({ item, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(['refreshToken']);
  const refreshToken = cookies.refreshToken;
  const [selectedItem, setSelectedItem] = useState<{ id: number } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { TransferStudentResponse, loading, error } = useSelector((state: RootState) => state.transferAcceptance);

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(TransferStudentResponse?.pageSize || 5);
  const [currentPage, setCurrentPage] = useState(TransferStudentResponse?.page || 1);
  const handleOpenDeleteModal = () => {
    setSelectedItem({ id: item?.studentId });
    setIsDeleteModalOpen(true);
  };
  console.log('selectedItem', selectedItem);

  const handleConfirmDelete = async () => {
    const id = item?.studentId;

    await dispatch(deleteTransferAcceptance({ id: id, token: refreshToken }));

    const isLastItemOnPage = TransferStudentResponse?.data.length === 1;
    const newPage = isLastItemOnPage && currentPage > 1 ? currentPage - 1 : currentPage;
    setIsDeleteModalOpen(false);
    toast.success('Xóa thành công!');
    dispatch(fetchTransferSchool({ page: newPage, pageSize: itemsPerPage, search, sortColumn, sortOrder }) as any);
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
              <Link to={`/leadership/update-transfer-acceptance/${item.studentId}`}>
                <img src={IconImages.OrangeEditWriteOutline} alt="Xem" className="w-4 md:w-5 lg:w-6" />
              </Link>
            </button>

            <button onClick={handleOpenDeleteModal}>
              <img src={IconImages.iconTrashBinOutlineOrange} alt="Xóa" className="w-4 md:w-5 lg:w-6" />
            </button>
          </div>
        </TableCell>
      </TableRow>
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

export default TransferListTableRow;
