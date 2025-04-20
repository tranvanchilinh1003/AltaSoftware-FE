import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentRetention } from '../../../../redux/reducers/Leadership/StudentProfile/StudentRetention/StudentRetention';
import type { RootState } from './../../../../redux/store';

import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './StudentRetentionListTableHeader';
import TableRowComponent from './StudentRetentionListTableRow';
import TitleComponent from '../../../../components/Title';
import ClassListFromSearch from './StudentRetentionListFromSearch';
import ItemsPerPage from './StudentRetentionListItemsPerPage';
import Pagination from './StudentRetentionListPagination';

import AddressList from '../../../../components/AddressUrlStack/Index';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';

const StudentRetentionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const { StudentRetention, loading, error } = useSelector((state: RootState) => state.studentRetention);

  const [itemsPerPage, setItemsPerPage] = useState(StudentRetention?.pageSize || 5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = StudentRetention?.totalPages || 1;

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  useEffect(() => {
    dispatch(fetchStudentRetention({ page: currentPage, pageSize: itemsPerPage, search, sortColumn, sortOrder }) as any);
  }, [dispatch, currentPage, itemsPerPage, search, sortColumn, sortOrder]);

  // console.log('StudentRetention', StudentRetention);

  const handleAddItem = () => {
    navigate('/leadership/add-student-retention');
  };

  return (
    <>
      <AddressList
        addressList={[
          { link: '/', linkName: 'Hồ sơ học viên' },
          { link: '/', linkName: 'Hồ sơ bảo lưu' },
        ]}
      />

      <div className="flex justify-between items-center mr-10 mb-5">
        <DropdownSelectionComponent options={['2020', '2021', '2022', '2023']} width={144} className="flex-grow" />
        <Button size="big" type="button" className="primary" onClick={handleAddItem}>
          + Thêm mới
        </Button>
      </div>

      <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased mb-10 ">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
          <TitleComponent text="Danh sách bảo lưu" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
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
        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi: {error}</p>
        ) : (
          <div className="mb-4 col-span-full xl:mb-2">
            <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
              <div
                className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
                      xl:rounded-lg 2xl:rounded-lg"
              >
                <Table style={{ fontFamily: 'var(--font-Mulish)' }} className="w-full text-sm text-left rtl:text-right">
                  <TableHeaderComponent />

                  <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                    {StudentRetention?.data?.map((item: any, index: number) => (
                      <TableRowComponent key={item.id} item={item} index={index} />
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Chọn số hàng hiển thị */}
              <div className="flex justify-between items-center mt-6">
                <ItemsPerPage
                  value={itemsPerPage}
                  onChange={(newValue) => {
                    setItemsPerPage(newValue);
                    setCurrentPage(1);
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
        )}
      </section>
    </>
  );
};

export default StudentRetentionList;
