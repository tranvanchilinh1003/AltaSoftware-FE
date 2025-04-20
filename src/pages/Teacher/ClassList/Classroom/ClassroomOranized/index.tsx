import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../../components/Button';
import icon from './icon';
import { Link } from 'react-router';
import search_icon from '../../../../../../src/assets/icons/fi_search.png';
interface TeachingAssignment {
  id: number; 
  user: {
    code: string;
    fullName: string;
  };
  class: {
    name: string;
  };
  subject: {
    id: number;
    name: string;
  };
  subjectGroup: {
    id: number;
    name: string;
  }[];
  semester: {
    name: string;
  };
  startDate: string;
  endDate: string;
  active: boolean;
}

interface SubjectGroup {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

const TeachingAssignments = () => {
  // Basic states
  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('Id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter states
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TeachingAssignment[]>([]);

  //
  useEffect(() => {
    fetchSubjectGroups();
  }, []);

  // Fetch data  filters change
  useEffect(() => {
    fetchTeachingAssignments();
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

  const fetchTeachingAssignments = async () => {
    setLoading(true);
    try {
      let url = `https://fivefood.shop/api/teaching-assignments/class-not-expired?page=${currentPage}&pageSize=${itemsPerPage}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

      if (selectedGroupId) {
        url += `&subjectGroupId=${selectedGroupId}`;
      }
      if (selectedSubjectId) {
        url += `&subjectId=${selectedSubjectId}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      //
      const totalItems = data.totalItems || data.data.length; // Thay đổi theo cấu trúc response của API
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

      let filtered = data.data || [];

      //
      if (selectedGroupId) {
        filtered = filtered.filter((item: TeachingAssignment) => item.subjectGroup.some((group) => group.id.toString() === selectedGroupId));
      }
      if (selectedSubjectId) {
        filtered = filtered.filter((item: TeachingAssignment) => item.subject.id.toString() === selectedSubjectId);
      }

      // Apply search term filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (item: TeachingAssignment) =>
            item.user.fullName.toLowerCase().includes(searchLower) ||
            item.class.name.toLowerCase().includes(searchLower) ||
            item.subject.name.toLowerCase().includes(searchLower),
        );
      }

      setTeachingAssignments(filtered);
      setTotalPages(calculatedTotalPages);
      setError(null);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setTeachingAssignments([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${
            currentPage === i
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm">
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
          <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            {startPage > 2 && <span className="text-black">...</span>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-black">...</span>}
            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
          <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
        </button>
      </div>
    );
  };
  const updateTeachingStatus = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`https://fivefood.shop/api/teaching-assignments/update-status/${id}`, {
        method: 'PUT',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.code === 0) {
        fetchTeachingAssignments();
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating teaching status:', error);
    }
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      await updateTeachingStatus(id);
      toast.success('Bắt đầu lớp học thành công!');
      fetchTeachingAssignments();
    } catch (error) {
      console.error('Failed to update teaching status:', error);
      toast.error('Không thể bắt đầu lớp học. Vui lòng thử lại!');
    }
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
        </div>

        <div className="relative w-full max-w-sm">
          <img src={search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm theo tên, lớp, môn học..."
            className="w-full font-[--font-Source-Sans-Pro] font-[weight-Source-Sans-Pro-3] px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none focus:border-[--border-orange]"
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-background-orange-1"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">Lỗi: {error}. Vui lòng thử lại sau.</div>
        ) : (
          <table className="table-fixed w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">Mã người dùng</th>
                <th className="py-3 px-2 md:px-4 text-left">Tên giáo viên</th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Lớp</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('class.name')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Môn học</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('subject.name')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Thời gian</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('startDate')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">Học kỳ</th>
                <th className="py-3 px-2 md:px-4 text-left">Trạng thái</th>
                <th className="py-3 px-2 md:px-4 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {teachingAssignments.map((item, index) => (
                <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                  <td className="py-3 px-2 md:px-4">{item.user.code}</td>
                  <td className="py-3 px-2 md:px-4">{item.user.fullName}</td>
                  <td className="py-3 px-2 md:px-4">{item.class.name}</td>
                  <td className="py-3 px-2 md:px-4">{item.subject.name}</td>
                  <td className="py-3 px-2 md:px-4">{getTimeRange(item.startDate, item.endDate)}</td>
                  <td className="py-3 px-2 md:px-4">{item.semester.name}</td>
                  <td className="py-3 px-2 md:px-4">
                    <div title={item.active ? 'Lớp học đang diễn ra' : 'Nhấn để bắt đầu lớp học'}>
                      <button
                        type="button"
                        onClick={() => !item.active && handleUpdateStatus(item.id)}
                        disabled={item.active}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          item.active ? 'bg-gray-200 text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                        style={item.active ? { cursor: 'not-allowed' } : undefined}
                      >
                        {item.active ? 'Đang diễn ra' : 'Bắt đầu'}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <Link to={`/teacher/classroom-detail/${item.user.code}`}>
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

      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text italic text-sm gap-2">
        <div className="flex items-center space-x-2">
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
            className="w-12 h-7 border border-border-orange rounded-md text-center focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default TeachingAssignments;
