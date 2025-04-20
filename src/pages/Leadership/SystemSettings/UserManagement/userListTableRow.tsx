import { useState } from 'react';
import { TableCell, TableRow } from '../../../../components/ui/tabble';
import IconImages from '../../../../components/IconImages';
import { UserListTableRowProps } from './userListTableRow/type';
import { Link } from 'react-router-dom';
import DeleteModal from '../../../../components/DeleteConfirmation';

const UserListTableRow: React.FC<UserListTableRowProps> = ({ item, index, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);

  const handleOpenDeleteModal = () => {
    setSelectedItem({ id: item.id, name: item.name });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && selectedItem) {
      onDelete(selectedItem.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
        <TableCell className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{item.name}</TableCell>
        <TableCell className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{item.email}</TableCell>
        <TableCell className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{item.userGroup}</TableCell>
        <TableCell className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{item.status}</TableCell>
        <TableCell className="px-4 py-3 text-start w-[150px]">
          <div className="flex gap-2">
            <button>
              <Link to={`/user-management/${item.id}`}>
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
          title="Xóa người dùng"
          description={`Bạn có chắc chắn muốn xoá người dùng này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác?`}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default UserListTableRow;
