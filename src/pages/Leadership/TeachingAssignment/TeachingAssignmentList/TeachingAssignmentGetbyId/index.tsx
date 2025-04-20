import { useState } from 'react';
import AlertwithIcon from '../../../../../components/AlertwithIcon';
import TitleComponent from '../../../../../components/Title';
import { Table, TableBody } from '../../../../../components/ui/tabble';
import useDeleteTeachingAssignment from '../../hooks/useDeleteTeachingAssignment';
import useFetchTeachingAssignmentsByTeacherId from '../../hooks/useFetchTeachingAssignmentsByTeacherId';
import TeachingAssignmentFormEdit from '../../TeachingAssignmentEdit';
import NoDataRow from '../../TeachingAssignmentNoData/NoDataRow';
import { columns } from '../tableColumns';
import TeachingAssignmentActions from '../TeachingAssignmentActions';
import ItemsPerPage from '../TeachingAssignmentListItemsPerPage';
import Pagination from '../TeachingAssignmentListPagination';
import TableHeaderComponent from '../TeachingAssignmentListTableHeader';
import TableRowComponent from '../TeachingAssignmentListTableRow';
import ConfirmDeleteModal from '../TeachingConfirmDeleteModal';
import LoadingSkeleton from '../TeachingLoadingSkeleton';

interface TeachingAssignmentGetbyIdProps {
    lecturerId: number | null;
}

const TeachingAssignmentGetbyId: React.FC<TeachingAssignmentGetbyIdProps> = ({ lecturerId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Use lecturerId instead of selectedLecturerId
    const { data, page, pageSize, totalPages, loading, setPage, setPageSize, refetchData } = useFetchTeachingAssignmentsByTeacherId(lecturerId);

    const { deleteAssignment, alert } = useDeleteTeachingAssignment();
    const startIndex = (page - 1) * pageSize;

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedId) {
            deleteAssignment([Number(selectedId)], refetchData);
            setIsModalOpen(false);
            setSelectedId(null);
        }
    };


    const handleOpenEditModal = (item: any) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

    const handleItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: event.target.checked,
        }));
    };
    const selectedIds = Object.entries(checkedItems)
        .filter(([_, isChecked]) => isChecked)
        .map(([id]) => Number(id));
    return (
        <>
            <TeachingAssignmentActions
                selectedIds={selectedIds}  // Lấy danh sách ID của các mục đã chọn
                onDeleteMany={() => {
                    if (selectedIds.length > 0) {
                        deleteAssignment(selectedIds, refetchData); // Gọi hàm xoá nhiều
                        setCheckedItems({});  // Reset lại trạng thái checkbox
                    }
                }}
            />

            <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased mb-10 ">
                <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
                    <TitleComponent
                        text="Danh sách phân công giảng dạy"
                        size={22}
                        weight="extrabold"
                        style={{ fontFamily: 'var(--font-Mulish)' }}
                    />
                </div>

                <div className='mx-4'>
                    {alert && (
                        <AlertwithIcon message={alert.message} type={alert.type} icon={alert.icon} />
                    )}
                </div>

                <div className="mb-4 col-span-full xl:mb-2 min-h-[650px] overflow-auto">
                    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
                        <div className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
                        xl:rounded-lg 2xl:rounded-lg">
                            <Table
                                style={{ fontFamily: 'var(--font-Mulish)', }}
                                className="w-full text-sm text-left rtl:text-right">
                                {/* Header */}
                                <TableHeaderComponent />
                                {/* Body */}
                                <TableBody className="divide-y divide-[#F0F3F6] bg-white">
                                    {loading ? (
                                        <LoadingSkeleton pageSize={pageSize} columns={columns} />
                                    ) : (
                                        Array.isArray(data) && data.length > 0 ? (
                                            data.map((item, index) => (
                                                <TableRowComponent
                                                    key={item.id}
                                                    item={item}
                                                    index={startIndex + index}
                                                    onDelete={handleDelete}
                                                    onEdit={() => handleOpenEditModal(item)}
                                                    onItemChange={handleItemChange}
                                                    isChecked={checkedItems[startIndex + index] || false}
                                                />
                                            ))
                                        ) : (
                                            <NoDataRow colSpan={columns.length} />
                                        )
                                    )}
                                </TableBody>

                            </Table>
                        </div>
                        {/* Chọn số hàng hiển thị */}
                        {Array.isArray(data) && data.length > 0 && (
                            <div className="flex justify-between items-center mt-6">
                                <ItemsPerPage
                                    value={pageSize}
                                    onChange={(newValue) => {
                                        setPageSize(newValue);
                                        setPage(1);
                                    }}
                                    min={5}
                                    max={20}
                                    label="Số lượng"
                                />
                                {/* Phân trang */}
                                <div className="flex items-center gap-x-2">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={(page) => setPage(page)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
            {isEditModalOpen && (
                <TeachingAssignmentFormEdit
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    item={selectedItem}
                    refetchData={refetchData}
                />
            )}
        </>
    );
};

export default TeachingAssignmentGetbyId;
