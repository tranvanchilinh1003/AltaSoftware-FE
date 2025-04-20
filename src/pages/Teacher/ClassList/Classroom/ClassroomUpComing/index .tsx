import React, { useState, useEffect } from 'react';

import icon from './icon';
import { Link } from 'react-router';
import search_icon from '../../../../../../src/assets/icons/fi_search.png';
interface User {
  id: number;
  code: string;
  fullName: string;
}

interface Class {
  id: number;
  code: string;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface SubjectGroup {
  id: number;
  name: string;
  teacherId: number;
  teacher: any;
}

interface Topics {
  id: number;
  name: string;
}

interface Session {
  id: number;
  name: string;
}

interface AcademicYear {
  id: number;
  name: string | null;
  startTime: string;
  endTime: string;
  semesters: any;
}

interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
}

interface TeachingAssignment {
  id: number;
  startDate: string;
  endDate: string;
  description: string;
  active: boolean;
  user: User;
  class: Class;
  subject: Subject;
  subjectGroup: SubjectGroup;
  topics: Topics;
  sessions: Session[];
  semester: Semester;
}

interface ApiResponse {
  code: number;
  message: string;
  data: TeachingAssignment[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const ClassroomExpired: React.FC = () => {
  // Basic states
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortColumn, setSortColumn] = useState('Id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter states
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial data loading
  useEffect(() => {
    fetchSubjectGroups();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, sortColumn, sortOrder, selectedGroupId, selectedSubjectId, searchTerm]);

  const fetchSubjectGroups = async () => {
    try {
      const response = await fetch('https://fivefood.shop/api/subject-groups');
      const data = await response.json();
      if (data.code === 0) {
        setSubjectGroups(data.data);
      }
    } catch (err) {
      console.error('Error fetching subject groups:', err);
    }
  };

  const fetchSubjects = async (groupId: string) => {
    if (!groupId) {
      setSubjects([]);
      return;
    }
    try {
      const response = await fetch(`https://fivefood.shop/api/subjects?groupId=${groupId}`);
      const data = await response.json();
      if (data.code === 0) {
        setSubjects(data.data);
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setSubjects([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `https://fivefood.shop/api/teaching-assignments/class-expired?page=${currentPage}&pageSize=${itemsPerPage}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

      if (selectedGroupId) {
        url += `&subjectGroupId=${selectedGroupId}`;
      }
      if (selectedSubjectId) {
        url += `&subjectId=${selectedSubjectId}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ApiResponse = await response.json();

      if (data.code === 0) {
        let filtered = data.data;

        if (searchTerm.trim()) {
          const searchLower = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (item) =>
              item.user.code.toLowerCase().includes(searchLower) ||
              item.user.fullName.toLowerCase().includes(searchLower) ||
              item.class.name.toLowerCase().includes(searchLower) ||
              item.subject.name.toLowerCase().includes(searchLower),
          );
        }

        if (filtered.length === 0) {
          setTeachingAssignments([]);
          setTotalPages(0);
          setError('Không tìm thấy dữ liệu phù hợp với bộ lọc');
        } else {
          setTeachingAssignments(filtered);
          // Sử dụng totalPages từ API response thay vì tính toán lại
          setTotalPages(data.totalPages);
          setError('');
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setTeachingAssignments([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGroupId(value);
    setSelectedSubjectId('');
    fetchSubjects(value);
    setCurrentPage(1);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjectId(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    //
    const pageButtons: JSX.Element[] = [];

    // Calculate display range
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={
            currentPage === i
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }
        >
          {i}
        </button>,
      );
    }

    //
    if (totalPages > 5 && endPage < totalPages) {
      pageButtons.push(
        <button key="ellipsis" className="text-black">
          ...
        </button>,
      );
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={
            currentPage === totalPages
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }
        >
          {totalPages}
        </button>,
      );
    }

    return pageButtons;
  };

  // Add a new function to handle reset
  const handleReset = () => {
    setSelectedGroupId('');
    setSelectedSubjectId('');
    setSearchTerm('');
    setCurrentPage(1);
    fetchData();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
const getStatusStyles = (active: boolean) => {
  if (active) {
    return {
      background: 'linear-gradient(90deg, rgba(255, 122, 0, 0.1) 0%, rgba(255, 122, 0, 0.2) 100%)',
      color: '#FF5A00',
      border: '1px solid #FF5A00',
    };
  }
  return {
    background: 'linear-gradient(90deg, rgba(128, 128, 128, 0.1) 0%, rgba(128, 128, 128, 0.2) 100%)',
    color: '#666666',
    border: '1px solid #666666',
  };
};
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-3 px-2 md:px-10 w-full">
        <div className="flex space-x-8">
          <div>
            <div className="text-lg font-bold">Chọn tổ bộ môn</div>
            <select
              className="w-48 h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedGroupId}
              onChange={handleGroupChange}
            >
              <option value="">Tất cả tổ bộ môn</option>
              {subjectGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-lg font-bold">Chọn môn học</div>
            <select
              className="w-48 h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedSubjectId}
              onChange={handleSubjectChange}
              disabled={!selectedGroupId}
            >
              <option value="">Tất cả môn học</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          {(selectedGroupId || selectedSubjectId || searchTerm) && (
            <button onClick={handleReset} className="mt-auto mb-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium">
              Reset bộ lọc
            </button>
          )}
        </div>
        <div className="relative w-full max-w-sm">
          <img src={search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm theo mã, tên GV, lớp, môn học..."
            className="w-full font-[--font-Source-Sans-Pro] font-[weight-Source-Sans-Pro-3] px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none focus:border-[--border-orange]"
          />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
        {loading ? (
          <div className="text-center py-4">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="table-fixed w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans cursor-pointer" onClick={() => handleSort('class.code')}>
                    <span>Mã lớp</span>
                    <img
                      src={icon.arrow}
                      alt="Sort"
                      className={`w-5 h-5 md:w-6 md:h-6 object-contain transition-transform ${
                        sortColumn === 'class.code' && sortOrder === 'desc' ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans cursor-pointer" onClick={() => handleSort('class.name')}>
                    <span>Tên lớp</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Môn học</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Thời gian</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Giảng viên</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Chủ đề</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-center">
                  <div className="flex items-center gap-2 font-sans justify-center">
                    <span>Trạng thái</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {teachingAssignments.map((item, index) => (
                <tr key={item.id} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                  <td className="py-3 px-2 md:px-4">{item.class.code}</td>
                  <td className="py-3 px-2 md:px-4">{item.class.name}</td>
                  <td className="py-3 px-2 md:px-4">{item.subject.name}</td>
                  <td className="py-3 px-2 md:px-4">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </td>
                  <td className="py-3 px-2 md:px-4">{item.user.fullName}</td>
                  <td className="py-3 px-2 md:px-4">{item.topics.name}</td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <span style={getStatusStyles(item.active)} className="px-4 py-1.5 rounded-full text-sm font-medium inline-block min-w-[120px]">
                      {item.active ? 'Đang diễn ra' : 'Kết thúc'}
                    </span>
                  </td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <Link to={`/teacher/classroom-detail/${item.class.code}`}>
                      <button>
                        <img src={icon.infoOutline} alt="Chi tiết" className="w-5 h-5 md:w-6 md:h-6 object-contain cursor-pointer" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Thanh phân trang */}
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
        <div className="flex items-center space-x-2 font-sans">
          <span>Hiển thị</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0) {
                setItemsPerPage(value);
                setCurrentPage(1);
              }
            }}
            className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          {renderPaginationButtons()}

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomExpired;
