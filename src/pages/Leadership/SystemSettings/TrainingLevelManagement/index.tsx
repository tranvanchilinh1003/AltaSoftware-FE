import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingLevels } from './../../../../redux/reducers/Leadership/SystemSettings/TrainingLevelManagement/TrainingLevelManagementSlice';
import type { RootState } from './../../../../redux/store';

import TitleComponent from '../../../../components/Title';
import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './tableHeader';
import ListOfTrainingLevelManagementListTableRow from './tableRow';
import ItemsPerPage from './ItemsPerPage';
import Pagination from './pagination';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import { useCookies } from 'react-cookie';

const TrainingLevelManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(['refreshToken']);
  const refreshToken = cookies.refreshToken;

  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const { TrainingLevelManagement, loading, error } = useSelector((state: RootState) => state.trainingLevelManagement);

  const [itemsPerPage, setItemsPerPage] = useState(TrainingLevelManagement?.pageSize || 5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = TrainingLevelManagement?.totalPages || 1;

  useEffect(() => {
    dispatch(fetchTrainingLevels({ page: currentPage, pageSize: itemsPerPage, sortColumn, sortOrder, token: refreshToken }) as any);
  }, [dispatch, currentPage, itemsPerPage, sortColumn, sortOrder]);

  const handleAddItem = () => {
    navigate('/leadership/system-settings/training-level-management/add');
  };

  return (
    <>
      <AddressList
        addressList={[
          { link: '/', linkName: 'Cài đặt hệ thống' },
          { link: '/', linkName: 'Quản lý các bậc đào tạo' },
        ]}
      />
      <div className="flex justify-between items-center mr-10 mb-5">
        <DropdownSelectionComponent options={['2020', '2021', '2022', '2023']} width={144} className="flex-grow" />
        <Button size="big" type="button" className="primary" onClick={handleAddItem}>
          + Thêm mới
        </Button>
      </div>

      <section className="rounded-lg bg-background-white shadow-lg sm:p-5 antialiased">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 justify-between mx-4 py-4">
          <TitleComponent text="Danh mục Các bậc đào tạo" size={22} weight="extrabold" />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi: {error}</p>
        ) : (
          <div className="p-4 flex flex-col gap-4 w-full">
            <div className="overflow-x-auto border border-gray-400/10 rounded-lg max-h-[340px] overflow-y-auto">
              <Table>
                <TableHeaderComponent />
                <TableBody className="divide-y divide-gray-300 bg-white">
                  {TrainingLevelManagement?.data?.map((item: any, index) => (
                    <ListOfTrainingLevelManagementListTableRow key={item.id} item={item} index={index} />
                  ))}
                </TableBody>
              </Table>
            </div>

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
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TrainingLevelManagement;
