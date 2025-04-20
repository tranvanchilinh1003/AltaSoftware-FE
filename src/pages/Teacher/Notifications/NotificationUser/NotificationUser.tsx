import React, { useState, useEffect, useRef } from 'react';
import { INotification, CheckboxState, DropdownOption } from './type';
import Pagination from '../../../../components/PaginationCustom';
import SearchInput from '../../../../components/SearchInput';

const initialData: INotification[] = [
  {
    id: 1,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã thích một bình luận của bạn',
    time: '5 phút trước',
    isRead: false,
  },
  {
    id: 2,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã nhắc đến bạn trong một bình luận',
    time: '7 phút trước',
    isRead: false,
  },
  {
    id: 3,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã nhắc đến bạn trong một bình luận',
    time: '10 phút trước',
    isRead: true,
  },
  {
    id: 4,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã gửi cho bạn một lời mời kết bạn',
    time: '15 phút trước',
    isRead: false,
  },
  {
    id: 5,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã bình luận bài viết của bạn',
    time: '20 phút trước',
    isRead: true,
  },
  {
    id: 6,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã thích bài viết của bạn',
    time: '25 phút trước',
    isRead: false,
  },
  {
    id: 7,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã theo dõi bạn',
    time: '30 phút trước',
    isRead: true,
  },
  {
    id: 8,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã nhắc đến bạn trong một bài viết',
    time: '1 giờ trước',
    isRead: false,
  },
  {
    id: 9,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã gửi cho bạn một tin nhắn',
    time: '2 giờ trước',
    isRead: false,
  },
  {
    id: 10,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã tham gia nhóm của bạn',
    time: '3 giờ trước',
    isRead: false,
  },
  {
    id: 11,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã thích một bình luận của bạn',
    time: '4 giờ trước',
    isRead: true,
  },
  {
    id: 12,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã chia sẻ bài viết của bạn',
    time: 'Hôm qua',
    isRead: false,
  },
  {
    id: 13,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã bình luận trong nhóm của bạn',
    time: '2 ngày trước',
    isRead: true,
  },
  {
    id: 14,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã gửi cho bạn một lời mời kết bạn',
    time: '15 phút trước',
    isRead: false,
  },
  {
    id: 15,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã bình luận bài viết của bạn',
    time: '20 phút trước',
    isRead: true,
  },
  {
    id: 16,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã thích bài viết của bạn',
    time: '25 phút trước',
    isRead: false,
  },
  {
    id: 17,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã theo dõi bạn',
    time: '30 phút trước',
    isRead: true,
  },
  {
    id: 18,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã nhắc đến bạn trong một bài viết',
    time: '1 giờ trước',
    isRead: false,
  },
  {
    id: 19,
    avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg',
    message: 'Lorem Ipsum đã gửi cho bạn một tin nhắn',
    time: '2 giờ trước',
    isRead: false,
  },
];

const NotificationUser: React.FC = () => {
  // 1) Lưu danh sách thông báo trong state
  const [allData, setAllData] = useState<INotification[]>(initialData);

  // 2) Các ID được chọn
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 3) Dropdown "Chọn tất cả / Chưa đọc / Đã đọc"
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // 4) Checkbox chính (all, some, none)
  const [mainCheckboxState, setMainCheckboxState] = useState<CheckboxState>('none');

  // 5) Ref cho checkbox chính để set indeterminate
  const mainCheckboxRef = useRef<HTMLInputElement>(null);

  // 6) Thêm menu 3 chấm (top-right)
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  // Phân trang: itemsPerPage là hằng số nếu không cần thay đổi
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Tính toán dữ liệu trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  // Cập nhật trạng thái của checkbox chính
  useEffect(() => {
    if (!mainCheckboxRef.current) return;
    if (mainCheckboxState === 'all') {
      mainCheckboxRef.current.checked = true;
      mainCheckboxRef.current.indeterminate = false;
    } else if (mainCheckboxState === 'some') {
      mainCheckboxRef.current.checked = false;
      mainCheckboxRef.current.indeterminate = true;
    } else {
      mainCheckboxRef.current.checked = false;
      mainCheckboxRef.current.indeterminate = false;
    }
  }, [mainCheckboxState]);

  // Xử lý chọn tất cả checkbox trên trang
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const idsOnPage = currentItems.map((item) => item.id);
      const newSelected = Array.from(new Set([...selectedItems, ...idsOnPage]));
      setSelectedItems(newSelected);
      setMainCheckboxState('all');
    } else {
      const idsOnPage = currentItems.map((item) => item.id);
      const newSelected = selectedItems.filter((id) => !idsOnPage.includes(id));
      setSelectedItems(newSelected);
      setMainCheckboxState('none');
    }
  };

  // Xử lý chọn từng dòng
  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // Hàm thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý Dropdown chọn Tất cả, Chưa đọc, Đã đọc
  const handleDropdownSelect = (option: DropdownOption) => {
    setShowDropdown(false);
    if (option === 'Tất cả') {
      // Lấy tất cả ID của trang hiện tại
      const idsOnPage = currentItems.map((item) => item.id);
      setSelectedItems(idsOnPage);
      setMainCheckboxState('all');
    } else if (option === 'Chưa đọc') {
      // Chỉ lấy chưa đọc trên trang hiện tại
      const unreadIds = currentItems.filter((item) => !item.isRead).map((item) => item.id);
      setSelectedItems(unreadIds);
      setMainCheckboxState('some');
    } else if (option === 'Đã đọc') {
      // Chỉ lấy đã đọc trên trang hiện tại
      const readIds = currentItems.filter((item) => item.isRead).map((item) => item.id);
      setSelectedItems(readIds);
      setMainCheckboxState('some');
    } else {
      setSelectedItems([]);
      setMainCheckboxState('none');
    }
  };

  // Xử lý "Đánh dấu đã đọc"
  const handleMarkAsRead = () => {
    setAllData((prev) => prev.map((item) => (selectedItems.includes(item.id) ? { ...item, isRead: true } : item)));
    setShowMoreOptions(false);
  };

  // Xử lý "Xóa"
  const handleDelete = () => {
    setAllData((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowMoreOptions(false);
  };

  // ---------- Các hàm xử lý sự kiện được tách riêng ----------
  const onMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(e.target.checked);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const onSelectAllDropdown = () => {
    handleDropdownSelect('Tất cả');
  };

  const onSelectUnreadDropdown = () => {
    handleDropdownSelect('Chưa đọc');
  };

  const onSelectReadDropdown = () => {
    handleDropdownSelect('Đã đọc');
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions((prev) => !prev);
  };

  // Hàm xử lý sự kiện checkbox của từng dòng (sử dụng .bind trong JSX)
  const onItemCheckboxChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectItem(id, e.target.checked);
  };

  // ---------- End các hàm xử lý sự kiện ----------

  return (
    <div className="bg-gray-50 rounded-[16px] shadow-[0_0_10px_#9ACAF540] p-4">
      {/* Hàng đầu: Checkbox chính + SearchInput + Dropdown + 3 chấm */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center space-x-1">
            <input ref={mainCheckboxRef} type="checkbox" onChange={onMainCheckboxChange} className="w-4 h-4 ml-2 accent-blue-500 cursor-pointer" />

            <button onClick={toggleDropdown} className="flex items-center justify-center text-gray-600 hover:text-black">
              <svg className="w-4 h-4" fill="black" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="pl-5">
              <SearchInput />
            </div>

            {showDropdown && (
              <div className="absolute z-10 top-7 left-0 bg-white border border-gray-300 rounded shadow min-w-[120px]">
                <ul className="py-1 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onSelectAllDropdown}>
                    Tất cả
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onSelectUnreadDropdown}>
                    Chưa đọc
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onSelectReadDropdown}>
                    Đã đọc
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-black" onClick={toggleMoreOptions}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
            </svg>
          </button>
          {showMoreOptions && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded shadow min-w-[120px] z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap" onClick={handleMarkAsRead}>
                  Đánh dấu đã đọc
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
                  Xóa
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bảng thông báo */}
      <div className="rounded-lg overflow-hidden border border-gray-300 h-96 overflow-y-auto">
        {currentItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Không có thông báo</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <tbody>
              {currentItems.map((item) => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <tr key={item.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onItemCheckboxChange.bind(null, item.id)}
                        className="w-4 h-4 accent-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <img src={item.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                        <span className={`text-gray-700 text-base ${!item.isRead ? 'font-medium' : ''}`}>{item.message}</span>
                      </div>
                    </td>
                    <td className={`p-2 text-gray-700 text-base ${!item.isRead ? 'font-medium' : ''}`}>{item.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Phân trang sử dụng component Pagination */}
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default NotificationUser;
