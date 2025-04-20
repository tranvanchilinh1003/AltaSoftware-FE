import { useState } from 'react';
import { Table, TableBody } from '../../../../../components/ui/tabble';
import classListData, { ClassItem } from '../TableClassList/data';
import { useCheckboxSelection } from './ClassListUseCheckboxSelection';
import TableHeaderComponent from './ClassListTableHeader';
import TableRowComponent from './ClassListTableRow';
import TitleComponent from '../../../../../components/Title';
import ClassListFromSearch from './ClassListFromSearch';
import ItemsPerPage from './ClassListItemsPerPage';
import Pagination from './ClassListPagination';
import Modal from '../../../../../components/common/ModalConfirmation';
import TextComponent from '../../../../../components/Text';
import Button from '../../../../../components/Button';

const TabbleClasslist = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(classListData); // Thêm trạng thái cho dữ liệu
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở/đóng Modal
  const [itemToDelete, setItemToDelete] = useState<ClassItem | null>(null);

  const { selectAll, indeterminate, selectedItems, handleSelectAllChange, handleItemChange } = useCheckboxSelection(classListData.length);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  // Tính toán index bắt đầu và kết thúc dựa trên `currentPage` và `itemsPerPage`
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(classListData.length / itemsPerPage);
  const handleDelete = (item: ClassItem) => {
    const formattedItem = {
      id: item.id,
      name: item.className,
    };
    setItemToDelete(item);

    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setData((prevData) => prevData.filter((d) => d.id !== itemToDelete.id));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] antialiased">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between dark:border-gray-700">
          <TitleComponent text="Lớp học" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
          <ClassListFromSearch
            onSearch={handleSearch}
            placeholder="Tìm kiếm"
            inputStyle={{
              fontFamily: 'var(--font-Mulish)',
              fontStyle: 'italic',
              color: 'var(--black-text)',
            }}
          />
        </div>

        <div className="mb-4 col-span-full xl:mb-2">
          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 overflow-auto rounded-large shadow-small w-full">
            <div className="overflow-x-auto">
              <div className="max-h-[800px] overflow-y-auto min-w-[600px]">
                <Table
                  style={{
                    fontFamily: 'var(--font-Mulish)',
                  }}
                  className="min-w-full h-auto table-fixed w-full border-collapse overflow-hidden rounded-t-lg"
                >
                  {/* Header */}
                  <TableHeaderComponent selectAll={selectAll} indeterminate={indeterminate} onSelectAllChange={handleSelectAllChange} />

                  {/* Body */}
                  <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                    {displayedData.map((item, index) => (
                      <TableRowComponent
                        key={item.id}
                        item={item}
                        index={startIndex + index} // Giữ nguyên index theo dữ liệu gốc
                        isChecked={selectedItems[startIndex + index]}
                        onItemChange={handleItemChange}
                        onDelete={() => handleDelete(item)}
                      />
                    ))}
                  </TableBody>
                </Table>

                {/* Chọn số hàng hiển thị */}
                <div className="flex justify-between items-center mt-6">
                  <ItemsPerPage
                    value={itemsPerPage}
                    onChange={(newValue) => {
                      setItemsPerPage(newValue);
                      setCurrentPage(1); // Reset về trang đầu khi thay đổi số lượng hiển thị
                    }}
                    min={5}
                    max={50}
                    label="Số lượng"
                  />

                  {/* Phân trang */}
                  <div className="flex items-center gap-x-2">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xóa"
        size="medium"
        position="center"
        titleAlign="center"
        showCloseButton={false}
        footerContent={
          /** Đưa vào đây ✅ */
          <div className="flex justify-center items-center gap-4">
            <Button
              size="big"
              type="button"
              style={{
                backgroundColor: 'var(--background-gray)',
                color: 'black',
                outline: 'none',
                border: 'none',
                fontWeight: 'bold',
                fontFamily: 'var(--font-Mulish)',
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={confirmDelete}
              type="button"
              size="big"
              style={{
                backgroundColor: 'var(--background-4)',
                color: 'white',
                outline: 'none',
                border: 'none',
                fontWeight: 'bold',
                fontFamily: 'var(--font-Mulish)',
              }}
            >
              Xác nhận
            </Button>
          </div>
        }
      >
        <TextComponent text="Xác nhận muốn xóa nhưng thông tin đã chọn? sau khi xóa sẽ không thể hoàn tác" size={16} />
      </Modal>
    </>
  );
};

export default TabbleClasslist;
