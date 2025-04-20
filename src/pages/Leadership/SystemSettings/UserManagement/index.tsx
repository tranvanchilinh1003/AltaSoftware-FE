import { useState } from 'react';
import TitleComponent from '../../../../components/Title';
import ClassListFromSearch from '../../DeclareData/ClassList/TableClassList/ClassListFromSearch';
import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './tableHeader';
import TableRowComponent from './tableRow';
import UserManagementData from './data';
import ItemsPerPage from './ItemsPerPage';
import Pagination from './pagination';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import UserListTableHeader from './userListTableHeader';
import UserListTableRow from './userListTableRow';
import UserListData from './data/userListData';

const UserManagement = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(UserManagementData);
  const [urls, setUrls] = useState([
    { link: '/', linkName: 'Cài đặt hệ thống' },
    { link: '/', linkName: 'Người dùng hệ thống' },
  ]);
  const [selectedTab, setSelectedTab] = useState('user-groups');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [userListData, setUserListData] = useState(UserListData); // Add state for user list data

  const handleAddItem = () => {
    navigate('/leadership/system-settings/user-management/settings'); // Chuyển hướng đến trang mong muốn
  };

  const handleDeleteItem = (id: number) => {
    // Gọi API hoặc cập nhật state để xóa item theo id
    console.log('Xóa item với ID:', id);
    setData((prevData) => prevData.filter((item) => item.id !== Number(id)));
  };

  const handleSearch = (query: string) => {
    console.log('Search data:', query);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(UserManagementData.length / itemsPerPage);

  return (
    <>
      <AddressList addressList={urls} />
      <div className="flex justify-between items-center mb-5 mr-7">
        <div className="flex items-center gap-4">
          <DropdownSelectionComponent
            label="Chọn kỳ"
            placeholder="Chọn kỳ"
            options={['Kỳ 1', 'Kỳ 2']}
            onSelect={setSelectedTerm}
            width={144}
            className="border-black"
          />
          <DropdownSelectionComponent
            label="Chọn khối"
            placeholder="Chọn khối"
            options={['Khối 1', 'Khối 2']}
            onSelect={setSelectedGrade}
            width={144}
            className="border-black"
          />
          <div className="flex items-center gap-0" style={{ padding: '5px' }}>
            <button
              className={`tab-link ${selectedTab === 'user-groups' ? 'active' : ''} px-2 py-1`}
              onClick={() => handleTabClick('user-groups')}
              style={{
                backgroundColor: selectedTab === 'user-groups' ? 'black' : '#F2F2F2',
                color: selectedTab === 'user-groups' ? 'white' : 'grey',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                borderRight: '1px solid white',
                padding: '5px',
              }}
            >
              Nhóm người dùng
            </button>
            <button
              className={`tab-link ${selectedTab === 'user-list' ? 'active' : ''} px-2 py-1 `}
              onClick={() => handleTabClick('user-list')}
              style={{
                backgroundColor: selectedTab === 'user-list' ? 'black' : '#F2F2F2',
                color: selectedTab === 'user-list' ? 'white' : 'grey',
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                padding: '5px',
              }}
            >
              Danh sách người dùng
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="big" type="button" className="secondary" onClick={handleAddItem}>
            + Thêm mới
          </Button>
        </div>
      </div>

      {selectedTab === 'user-groups' && (
        <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased mr-7">
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
            <TitleComponent text="Danh sách các nhóm người dùng" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
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
            <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
              <div
                className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
                xl:rounded-lg 2xl:rounded-lg w-full max-h-[340px] overflow-y-auto"
              >
                <Table className="">
                  <TableHeaderComponent />
                  <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                    {displayedData.map((item, index) => (
                      <TableRowComponent
                        key={item.id}
                        item={item}
                        index={startIndex + index} // Giữ nguyên index theo dữ liệu gốc
                        onDelete={handleDeleteItem}
                      />
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

                <div className="flex items-center gap-x-2">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'user-list' && (
        <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased">
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
            <TitleComponent text="Danh sách người dùng" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
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
            <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
              <div
                className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
                xl:rounded-lg 2xl:rounded-lg w-full max-h-[340px] overflow-y-auto"
              >
                <Table className="">
                  <UserListTableHeader />
                  <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                    {userListData.map((item: any, index: number) => (
                      <UserListTableRow key={item.id} item={item} index={index} onDelete={handleDeleteItem} />
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

                <div className="flex items-center gap-x-2">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserManagement;
