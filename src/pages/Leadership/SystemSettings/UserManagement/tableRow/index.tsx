import { useState } from 'react';
import { TableCell, TableRow } from '../../../../../components/ui/tabble';
import IconImages from '../../../../../components/IconImages';
import { UserManagementListTableRowProps } from './type';
import { Link } from 'react-router-dom';
import { columns } from '../tableColumns';
import DeleteModal from './../../../../../components/DeleteConfirmation';

const UserManagementListTableRow: React.FC<UserManagementListTableRowProps> = ({ item, index, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);

  // Mở modal và lưu item cần xóa
  const handleOpenDeleteModal = () => {
    setSelectedItem({ id: item.id, name: item.name });
    setIsDeleteModalOpen(true);
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (onDelete && selectedItem) {
      console.log('check selectedItem', selectedItem.id);
      onDelete(selectedItem.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
        {columns.map((col) => (
          <TableCell key={col.key} className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">
            {item[col.key]}
          </TableCell>
        ))}
        {/* Cột chứa nút chức năng */}
        <TableCell className="px-4 py-3 text-start w-[150px]">
          <div className="flex gap-2">
            <button>
              <Link to={`/student-retention/${item.id}`}>
                <img src={IconImages.OrangeEditWriteOutline} alt="Xem" className="w-4 md:w-5 lg:w-6" />
              </Link>
            </button>
            <button onClick={handleOpenDeleteModal}>
              <img src={IconImages.iconTrashBinOutlineOrange} alt="Xóa" className="w-4 md:w-5 lg:w-6" />
            </button>
          </div>
        </TableCell>
      </TableRow>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && selectedItem && (
        <DeleteModal
          title="Xóa nhóm người dùng"
          description={`Bạn có chắc chắn muốn xoá bậc đào tạo này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác?`}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default UserManagementListTableRow;
