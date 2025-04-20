import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '../../../../components/ui/tabble';
import Button from '../../../../components/Button';
import PaginationControls from '../../../../components/Pagination';
import SearchInput from '../../../../components/SearchTable';
import Dropdown from '../../../../components/Dropdown';
import CalendarInput from '../../../../components/CalendarInput';
import fiedit from '../../../../assets/icons/fi_edit.png';
import infooutline from '../../../../assets/icons/icon-info-outline.png.png';
import arrowupdown from '../../../../assets/icons/u_arrow up down.png';
import { exams, subjectOptions, gradeOptions } from './data';
import { DropdownOption } from '../../../../components/Dropdown/type';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { ClassList, Subject, TestList } from './type';
import axios from 'axios';
import Loading from '../../../../components/Loading';

const axiosInstance = createAxiosInstance(true);
const API_URL = process.env.REACT_APP_API_URL;

const ListTableTest: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activeButton, setActiveButton] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const [selectedSubject, setSelectedSubject] = useState<DropdownOption | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<DropdownOption | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [testList, setTestList] = useState<TestList[]>([]);
  const [classList, setClassList] = useState<ClassList[]>([]);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [originalTestList, setOriginalTestList] = useState<TestList[]>([]);
  const [tempSubject, setTempSubject] = useState<DropdownOption | null>(null);
  const [tempGrade, setTempGrade] = useState<DropdownOption | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`${API_URL}/test`, {
      params: { page, pageSize, sortColumn, sortOrder, search: searchValue },
    })
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setTestList(data);
          setOriginalTestList(data);
        } else {
          setTestList([]);
          console.error("Dữ liệu không hợp lệ từ API:", data);
        }
      })
      .catch((error) => {
        console.error('Error fetching department data:', error);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, sortColumn, sortOrder, searchValue]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/class`, {
      params: {
        page: 1,
        pageSize: 9999,
      },
    })
      .then((response) => {
        const data = response.data.data;
        setClassList(data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
      .finally(() => setLoading(false));
  }, []);


  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);

    const now = new Date();
    let filteredTests = [...originalTestList];

    if (buttonType === 'upcoming') {
      filteredTests = filteredTests.filter(test => new Date(test.startTime) > now);
    } else if (buttonType === 'graded') {
      filteredTests = filteredTests.filter(test => test.fileSubmit === true);
    } else if (buttonType === 'ungraded') {
      filteredTests = filteredTests.filter(test => test.fileSubmit === false);
    }

    setTestList(filteredTests);
    setTotalItems(filteredTests.length);
    setCurrentPage(1);
  };

  const applyAllFilters = (list: TestList[]) => {
    let filtered = [...list];

    const now = new Date();
    if (activeButton === 'upcoming') {
      filtered = filtered.filter(test => new Date(test.startTime) > now);
    } else if (activeButton === 'graded') {
      filtered = filtered.filter(test => test.fileSubmit === true);
    } else if (activeButton === 'ungraded') {
      filtered = filtered.filter(test => test.fileSubmit === false);
    }

    if (selectedSubject) {
      filtered = filtered.filter(test => test.subject?.id === selectedSubject.value);
    }

    if (selectedGrade) {
      filtered = filtered.filter(test => {
        const classIds = test.classIds?.split(',').map(id => parseInt(id.trim(), 10)) || [];
        return classIds.includes(parseInt(selectedGrade.value));
      });
    }

    if (filterDate) {
      filtered = filtered.filter(test => {
        const testDate = new Date(test.startTime || 0);
        return (
          testDate.getFullYear() === filterDate.getFullYear() &&
          testDate.getMonth() === filterDate.getMonth() &&
          testDate.getDate() === filterDate.getDate()
        );
      });
    }
    if (searchValue) {
      filtered = filtered.filter(test =>
        test.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setTestList(filtered);
    setTotalItems(filtered.length);
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/subjects`)
      .then((response) => {
        const data = response.data.data;
        setSubjectList(data);
      })
      .catch((error) => {
        console.error('Error fetching department data:', error);
      })
      .finally(() => setLoading(false));
  }, []);


  const handleFilter = () => {
    setLoading(true);
    setSelectedSubject(tempSubject);
    setSelectedGrade(tempGrade);
    setFilterDate(tempDate);

    let filteredTests = [...originalTestList];

    if (tempSubject) {
      filteredTests = filteredTests.filter(test => test.subject && test.subject.id === tempSubject.value);
    }

    if (tempGrade) {
      filteredTests = filteredTests.filter(test => {
        const classIds = test.classIds?.split(',').map(id => parseInt(id.trim(), 10)) || [];
        return classIds.includes(parseInt(tempGrade.value));
      });
    }

    if (tempDate) {
      filteredTests = filteredTests.filter(test => {
        const testDate = new Date(test.startTime || 0);
        return (
          testDate.getFullYear() === tempDate.getFullYear() &&
          testDate.getMonth() === tempDate.getMonth() &&
          testDate.getDate() === tempDate.getDate()
        );
      });
    }

    if (searchValue) {
      filteredTests = filteredTests.filter(test =>
        test.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setTestList(filteredTests);
    setTotalItems(filteredTests.length);
    setCurrentPage(1);
    setLoading(false);
  };


  const handleSearch = () => {
    setLoading(true);
    axiosInstance.get(`${API_URL}/test`, {
      params: {
        page,
        pageSize,
        sortColumn,
        sortOrder,
        search: searchValue,
      },
    })
      .then((response) => {
        const data = response.data.data;
        setTestList(data);
        setTotalItems(data.length);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error('Error fetching filtered tests:', error);
      })
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    applyAllFilters(originalTestList);
  }, [activeButton, selectedSubject, selectedGrade, filterDate, searchValue]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <div className="w-full max-w-[1680px] mx-auto py-5">
      <div className="max-w-[1680px]">
        <div className="flex max-w-[1680px] gap-4 border-b border-gray-200">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                className={`w-[207px] h-[69px] px-1 font-bold text-[18px] rounded-t-lg border-2 border-b-0 ${activeButton === 'all' ? 'bg-orange-500 text-while-text border-orange-500' : 'bg-white text-black-text border-orange-500'
                  }`}
                onClick={() => handleButtonClick('all')}
              >
                Tất cả bài kiểm tra
              </button>
              <button
                className={`w-[207px] h-[69px] px-1 font-bold text-[18px] rounded-t-lg border-2 border-b-0 ${activeButton === 'upcoming' ? 'bg-orange-500 text-while-text border-orange-500' : 'bg-white text-black-text border-orange-500'
                  }`}
                onClick={() => handleButtonClick('upcoming')}
              >
                Bài kiểm tra sắp tới
              </button>
              <button
                className={`w-[207px] h-[69px] px-1 font-bold text-[18px] rounded-t-lg border-2 border-b-0 ${activeButton === 'graded' ? 'bg-orange-500 text-while-text border-orange-500' : 'bg-white text-black-text border-orange-500'
                  }`}
                onClick={() => handleButtonClick('graded')}
              >
                Bài kiểm tra đã chấm
              </button>
              <button
                className={`w-[207px] h-[69px] px-1 font-bold text-[18px] rounded-t-lg border-2 border-b-0 ${activeButton === 'ungraded' ? 'bg-orange-500 text-while-text border-orange-500' : 'bg-white text-black-text border-orange-500'
                  }`}
                onClick={() => handleButtonClick('ungraded')}
              >
                Bài kiểm tra chưa chấm
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1680px] px-[36px] pt-[24px] pb-[34px] bg-background-white shadow-xl p-7 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label className="font-bold">Chọn bộ môn</label>
                <Dropdown
                  options={subjectList.map(subject => ({
                    label: subject.name,
                    value: subject.id,
                  }))}
                  selectedOption={tempSubject}
                  handleOptionClick={setTempSubject}
                  onSelect={(option) => setSelectedSubject(option)}
                  size="short"
                  placeholder="Chọn bộ môn"
                />

              </div>
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label className="font-bold">Chọn khối</label>
                <Dropdown
                  options={classList.map(Cls => ({
                    label: Cls.name,
                    value: Cls.id.toString(),
                  }))}
                  selectedOption={tempGrade}
                  handleOptionClick={setTempGrade}
                  onSelect={(option) => setSelectedSubject(option)}
                  size="short"
                  placeholder="Chọn khối"
                />
              </div>
              <div className=" flex flex-col mb-6 flex-2 min-w-[150px] h-[40px]">
                <label className="font-bold">Chọn Ngày</label>
                <div className="h-full flex items-center">
                  <CalendarInput
                    selectedDate={tempDate}
                    onDateChange={setTempDate}
                  />
                </div>
              </div>
              <button
                className="bg-orange-500 text-white px-6 py-2 mt-5 rounded-lg font-bold text-center h-[40px] min-w-[120px] max-w-[200px] whitespace-nowrap flex items-center justify-center"
                onClick={handleFilter}
              >
                Lọc kết quả
              </button>

            </div>

            <SearchInput placeholder="Tìm kiếm theo tên topic" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <div className="pt-[24px] pb-[66px]">
            <Table className="w-full  table-fixed border-collapse rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-orange-500 text-while-text">
                  <TableCell isHeader className="p-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      Lớp
                      <img src={arrowupdown} className="w-6 h-6" />
                    </div>
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    Nội dung
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      Môn học
                      <img src={arrowupdown} className="w-6 h-6" />
                    </div>
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    Ngày làm bài
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    Thời lượng
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    Trạng thái
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    Bài làm
                  </TableCell>
                  <TableCell isHeader className="text-center">
                    {' '}
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testList && Array.isArray(testList) ? (
                  (() => {
                    const rows = testList.flatMap((exam, index) => {
                      const start = new Date(exam.startTime);
                      const end = new Date(exam.endTime);
                      const now = new Date();
                      const weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
                      const formattedDate = `${weekdays[start.getDay()]}, ${start.toLocaleDateString('vi-VN')} ${start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
                      const durationMinutes = Math.round((end.getTime() - start.getTime()) / 60000);

                      let status = '';
                      let statusColor = '';
                      if (now < start) {
                        status = 'Chưa bắt đầu';
                        statusColor = 'text-red-500';
                      } else if (now >= start && now <= end) {
                        status = 'Đang tiến hành';
                        statusColor = 'text-blue-500';
                      } else {
                        status = 'Đã kết thúc';
                        statusColor = 'text-green-500';
                      }

                      const classIdArray = exam.classIds.split(',').map(id => parseInt(id.trim(), 10));

                      return classIdArray
                        .filter(classId => !selectedGrade?.value || classId === parseInt(selectedGrade.value))
                        .map((classId, classIdx) => {
                          const className = classList.find(c => c.id === classId)?.name || `Lớp ${classId}`;

                          return (
                            <TableRow key={`${index}-${classIdx}`}>
                              <TableCell className="text-center align-middle">{className}</TableCell>
                              <TableCell className="text-center align-middle">{exam.description}</TableCell>
                              <TableCell className="text-center align-middle">{exam.subject.name}</TableCell>
                              <TableCell className="text-center align-middle">{formattedDate}</TableCell>
                              <TableCell className="text-center align-middle">{durationMinutes} phút</TableCell>
                              <TableCell className={`text-center align-middle font-bold ${statusColor}`}>{status}</TableCell>
                              <TableCell className="text-center align-middle">
                                {status === 'Đã kết thúc' ? (
                                  <button className="bg-yellow-500 w-[142px] text-white px-3 py-1 rounded">Chấm điểm</button>
                                ) : status === 'Đang tiến hành' ? (
                                  <button className="border border-gray-400 w-[142px] text-gray-500 px-3 py-1 rounded" disabled>Chấm điểm</button>
                                ) : (
                                  <button className="bg-orange-500 w-[142px] text-white px-3 py-1 rounded">Bắt đầu</button>
                                )}
                              </TableCell>
                              <TableCell className="text-center align-middle">
                                <div className="flex justify-center gap-2">
                                  <img src={fiedit} className="w-[34px] h-[32px] object-contain shrink-0" />
                                  <img src={infooutline} className="w-[32px] h-[32px] object-contain shrink-0" />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        });
                    });

                    return rows.length > 0 ? rows : (
                      <TableRow>
                        <td colSpan={8} className="text-center">Không tìm thấy kết quả phù hợp</td >
                      </TableRow>
                    );
                  })()
                ) : (
                  <TableRow>
                    <td colSpan={8} className="text-center">Không có dữ liệu</td >
                  </TableRow>
                )}
              </TableBody>


            </Table>
          </div>
          <PaginationControls
            itemsPerPage={pageSize * 2}
            setItemsPerPage={setPageSize}
            onPageChange={setPage}
            currentPage={page}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListTableTest;
