import { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { DeleteConfirmation } from '../SchoolYearDelete/SchoolYearDelete';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SchoolYearTable from './SchoolYearTable';
import Panigation from '../SchoolYearPanigation/Panigation';
import { ISchoolYear } from './type';


const SchoolYear = () => {
  const [originalData, setOriginalData] = useState<ISchoolYear[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<ISchoolYear[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [numPage, setNumPage] = useState(1);
  const [index, setIndex] = useState(1);
  const [size, setSize] = useState(8);
  const [totalItems, setTotalItems] = useState(0);

  // Xóa niên khóa thành công
  const handleDeleteSuccess = () => {
    toast.success('Xóa niên khóa thành công!', { position: 'top-right', autoClose: 3000, theme: 'colored' });
    setData((prev) => prev.filter((item) => item.id !== selectedId));
    setShowPopup(false);
  };

  // Ẩn popup
  const handleShowPopup = () => setShowPopup(false);

  // Lấy dữ liệu từ API
  const fetchData = async (pageNumber = 1, pageSize = 9) => {
    try {
      const response = await axios.get(`https://fivefood.shop/api/academic-years`, {
        params: {
          page: pageNumber,
          pageSize: pageSize,
          sortColumn: 'endTime',
          sortOrder: 'desc',
        },
      });
      const sortedData = response.data.data.sort((a: ISchoolYear, b: ISchoolYear) => {
        return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
      });
      setData(sortedData);
      setOriginalData(sortedData);
      setNumPage(response.data.totalPages || 1);
      setTotalItems(response.data.totalItems || 0);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchData(index, size);
  }, [index, size]);

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
    if (!value.trim()) {
      setData(originalData);
    } else {
      setData(originalData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  // Cập nhật số lượng phần tử mỗi trang
  const handleSizeChange = (newSize: number) => {
    if (newSize > 0) {
      setSize(newSize);
      setIndex(1);
    }
  };

  return (
    <div className="py-6 px-14 bg-background-white shadow-custom rounded-[16px]">
      {/* <div className="flex justify-end items-center mb-4">
        <Link to={'/leadership/declare-data/school-year/add-school-year'}>
          <button className="bg-orange-500 px-8 py-3 text-white rounded-md font-medium">Thêm mới</button>
        </Link>
      </div> */}

      {/* Tiêu đề / tìm kiếm */}
      <div className="flex justify-between items-center text-black-text mb-4">
        <h2 className="text-[22px] font-bold">Niên khóa</h2>
        <div className="relative w-full max-w-sm">
          <img src={Icons.search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm niên khóa"
            className="w-full px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none focus:border-orange-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng */}
      <SchoolYearTable
        data={data}
        onDelete={(id) => {
          setSelectedId(id);
          setShowPopup(true);
        }}
      />

      {/* Phân trang */}
      <Panigation indexChoose={index} numPage={numPage} setNumpage={setNumPage} setIndex={setIndex} size={size} setSize={handleSizeChange} />

      {/* Popup delete */}
      {showPopup && selectedId !== null && <DeleteConfirmation id={selectedId} onDeleteSuccess={handleDeleteSuccess} onCancel={handleShowPopup} />}
    </div>
  );
};

export default SchoolYear;
