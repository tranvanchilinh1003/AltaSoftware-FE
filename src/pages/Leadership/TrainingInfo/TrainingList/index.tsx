import React, { useEffect, useRef, useState } from 'react';
import SearchInput from '../../../../components/SearchTable';
import Button from '../../../../components/Button';
import arrow_down from '../../../../assets/icons/caret-down_white.png';
import fiarrowright from '../../../../assets/icons/icon-arrow-right.png';
import fiflus from '../../../../assets/icons/fi_plus_white.png';
import fitrash from '../../../../assets/icons/fi_trash-2.png';
import fiedit from '../../../../assets/icons/icon-fi_edit.png';
import fiarrowupdown from '../../../../assets/icons/u_arrow up down.png';
import { trainingData } from './data';
import { Major, SchoolFacilitie, TrainingItem, TrainingProgram } from './type';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PaginationControls from '../../../../components/Pagination';
import createAxiosInstance from '../../../../utils/axiosInstance';
import DeleteAcademicYearModal from '../../../../components/DeleteStudentConfirm';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance(true);

const TrainingList: React.FC<TrainingItem> = ({ onClick }) => {
  const id = useParams<{ id: string }>().id;
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [trainingList, setTrainingList] = useState<TrainingProgram[]>([]);
  const [schoolList, setSchoolList] = useState<SchoolFacilitie[]>([]);
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);


  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);

    if (headerRef.current) {
      if (isExpanded) {
        headerRef.current.classList.remove('bg-background-orange-1', 'text-white');
        headerRef.current.classList.add('bg-white', 'text-black-text');
      } else {
        headerRef.current.classList.remove('bg-white', 'text-black-text');
        headerRef.current.classList.add('bg-background-orange-1', 'text-white');
      }
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/training-program/by-teacher/${id}`, {
        params: {
          search: searchValue,
        },
      })
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setTrainingList(data);
        setTotalItems(response.data.totalItems);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy training program:', error.response?.data || error);
      });

  }, [page, pageSize, sortColumn, sortOrder, searchValue]);



  useEffect(() => {
    axios.get(`${API_URL}/schools`, {
      params: {
        page: 1,
        pageSize: 9999,
        sortColumn: 'name',
        sortOrder: 'asc',
      },
    })
      .then((response) => {
        const data = response.data.data;
        setSchoolList(data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/major`, {
      params: {
        page: 1,
        pageSize: 9999,
        sortColumn: 'name',
        sortOrder: 'asc',
      },
    })
      .then((response) => {
        const data = response.data.data;
        console.log(data);

        setMajorList(data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="bg-background-white border border-gray-300 rounded-lg overflow-x-auto flex-grow w-full my-5">
      <div
        ref={headerRef}
        className={`h-14 flex items-center px-4 rounded-t-lg cursor-pointer border-b border-gray-300 bg-white text-black-text`}
        onClick={toggleExpand}
      >
        <img src={isExpanded ? arrow_down : fiarrowright} className={`${isExpanded ? 'w-5 h-3' : 'w-3 h-5'} mr-2`} alt="Dropdown" />
        <span onClick={onClick} className=" text-lg pl-2">
          Thông tin đào tạo
        </span>
      </div>
      {isExpanded && (
        <div className="px-10 pt-1 pb-10">
          <div className="flex justify-between items-center my-4">
            <SearchInput
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Link to={`/leadership/training-info/add/${id}`}>
              <Button size="mini" className="primary">
                <img src={fiflus} alt="Add Icon" />
                Thêm
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <div className="bg-gray-900 text-white grid grid-cols-8 p-3 text-center rounded-t-lg">
              <span className="flex items-center justify-center gap-1">
                Cơ quan/ Đơn vị
                <img src={fiarrowupdown} alt="arrow up down Icon" className="w-5 h-5" />
              </span>
              <span>Tên đào tạo</span>
              <span>Chuyên ngành</span>
              <span>Ngày bắt đầu</span>
              <span>Ngày kết thúc</span>
              <span>Văn bằng/ Chứng chỉ</span>
              <span>Hình thức</span>
              <span></span>
            </div>
            {Array.isArray(trainingList) && trainingList.length === 0 ? (
              <span className="p-3 text-center text-gray-500">Không tìm thấy kết quả</span>
            ) : (
              Array.isArray(trainingList) && trainingList.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-8 p-3 text-center border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <span>
                    {Array.isArray(schoolList) && schoolList.find((school) => school.id === item.schoolFacilitiesID)?.name || 'N/A'}
                  </span>
                  <span>{item.name}</span>
                  <span>
                    {Array.isArray(majorList) && majorList.find((major) => major.id === item.majorId)?.name || 'N/A'}
                  </span>
                  <span>{formatDate(item.startDate)}</span>
                  <span className={item.endDate === 'Chưa xác định' ? 'italic text-gray-500' : ''}>
                    {item.endDate === 'Chưa xác định' ? 'Chưa xác định' : formatDate(item.endDate)}
                  </span>
                  <span>{item.degree}</span>
                  <span>{item.trainingForm}</span>
                  <span className="flex justify-center gap-2 items-center">
                    <Link to="/leadership/training-info/add">
                      <button className="p-2">
                        <img src={fiedit} alt="Edit Icon" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                      </button>
                    </Link>
                    <button className="p-2">
                      <img src={fitrash} alt="Trash Icon" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    </button>
                  </span>

                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingList;
