import React, { useEffect, useState } from 'react';
import { IScoreBoard, ScoreData, ClassData } from './type';
import { IconSearchLightGrayishBlue } from '../../../../components/Icons';
import { IconDoubleArrowUpDown, ArrowLeftIcon, ArrowRightIcon } from '../../../../components/Icons/IconComponents';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import AddressList from '../../../../components/AddressUrlStack/Index';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import SearchResult from '../SearchResult/SearchResult';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return (
    <>
      <span>{formattedDate}</span>
      <br />
      <span>{formattedTime}</span>
    </>
  );
};

const ScoreBoard: React.FC = () => {
  const [urls, setUrls] = useState([
    { link: '/leadership/exams', linkName: 'Quản lý bài kiểm tra' },
    { link: '#', linkName: 'Xem bảng điểm' },
  ]);
  const [scoreBoardData, setScoreBoardData] = useState<IScoreBoard[]>([]);
  const [scoreClass, setScoreClass] = useState<ClassData | null>(null);
  const [academicYearOptions, setAcademicYearOptions] = useState<{ label: string; value: number }[]>([]);
  const [subjects, setSubjects] = useState<{ label: string; value: number }[]>([]);
  const [classOptions, setClassOptions] = useState<{ label: string; value: number }[]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

  // subjectId được lấy từ query, không thay đổi nếu chưa chọn môn học mới
  const subjectIdFromQuery = query.get('subjectId');
  const academicYearIdFromQuery = query.get('academicYearId');
  const classIdFromQuery = query.get('classId');

  // State lưu trữ các lựa chọn được chọn
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<{ label: string; value: number } | null>(null);
  const [selectedClass, setSelectedClass] = useState<{ label: string; value: number } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<{ label: string; value: number } | null>(null);

  // API lấy niên khóa (academic years)
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get(`${API_URL}/academic-years`);
        const data = response.data.data;
        const options = data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setAcademicYearOptions(options);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };
    fetchAcademicYears();
  }, []);

  // API lấy danh sách lớp theo cấp học đã chọn
  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedAcademicYear) {
        try {
          const params = { academicYearId: selectedAcademicYear.value };
          const response = await axios.get(`${API_URL}/class/by-grade-academic`, { params });
          const data = response.data.data;
          const options = data.map((item: any) => ({
            label: item.name.trim(),
            value: item.id,
          }));
          setClassOptions(options);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      } else {
        setClassOptions([]);
      }
    };
    fetchClasses();
  }, [selectedAcademicYear]);

  // API lấy danh sách môn học theo niên khóa đã chọn
  useEffect(() => {
    const fetchSubjectsByAcademicYear = async () => {
      if (selectedAcademicYear) {
        try {
          const response = await axiosInstance.get(`${API_URL}/subjects/get-by-academic-year`, {
            params: { academicYearId: selectedAcademicYear.value },
          });
          const subjectsData = response.data.data;
          const subjectOptions = subjectsData.map((subj: any) => ({
            value: subj.id,
            label: subj.name,
          }));
          setSubjects(subjectOptions);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      } else {
        setSubjects([]);
      }
    };
    fetchSubjectsByAcademicYear();
  }, [selectedAcademicYear]);

  // Hàm gọi API lấy bảng điểm khi click "Tìm kiếm"
  const handleSearch = async () => {
    try {
      const params = {
        academicYearId: selectedAcademicYear ? selectedAcademicYear.value : academicYearIdFromQuery,
        subjectId: selectedSubject ? selectedSubject.value : subjectIdFromQuery,
        classId: selectedClass ? selectedClass.value : classIdFromQuery,
      };

      const response = await axios.get(`${API_URL}/student-score/view-dashboard-scores`, { params });
      if (response.data.code === 0) {
        // Nếu tìm thấy dữ liệu, xóa toast nếu có
        setScoreClass(response.data.data.class);
        const students = response.data.data.students || [];

        const mappedData = students.map((student: any, index: number): IScoreBoard => {
          const semester = student.semesters[selectedSemesterIndex] || {};
          const scores = semester.scores || [];

          const chuyenCanList = scores.filter((s: any) => s.scoreType.name === 'Chuyên cần').map((s: any) => s.score);
          const mieng = scores.find((s: any) => s.scoreType.name === 'Miệng')?.score || 0;
          const phut15 = scores.find((s: any) => s.scoreType.name === '15 phút')?.score || 0;
          const heSo1 = scores.find((s: any) => s.scoreType.weight === 1)?.score || 0;
          const heSo2 = scores.find((s: any) => s.scoreType.weight === 2)?.score || 0;

          return {
            id: student.id,
            stt: index + 1,
            name: student.fullName,
            birthday: new Date(student.dateOfBirth).toLocaleDateString('vi-VN'),
            chuyenCanList,
            mieng,
            phut15,
            heSo1,
            heSo2,
            tbHocKy: semester.averageScore || 0,
            diemTrungBinhCaNam: student.averageScore || 0,
            ngayCapNhat: student.lastUpdate,
          };
        });

        setScoreBoardData(mappedData);
      } else {
        // Nếu API trả về lỗi, hiển thị toast lỗi
        toast.error(response.data.message || 'Không tìm thấy dữ liệu tương ứng');
        // Reset dữ liệu nếu cần
        setScoreBoardData([]);
        setScoreClass(null);
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
        toast.error(message);
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  };

  const [isAutoFetched, setIsAutoFetched] = useState(false);

  useEffect(() => {
    if (academicYearOptions.length && academicYearIdFromQuery) {
      const academicYearQuery = academicYearOptions.find((option) => option.value.toString() === academicYearIdFromQuery);
      if (academicYearQuery) {
        setSelectedAcademicYear(academicYearQuery);
      }
    }
  }, [academicYearOptions, academicYearIdFromQuery]);

  useEffect(() => {
    if (!isAutoFetched && selectedAcademicYear && (selectedSubject || subjectIdFromQuery)) {
      handleSearch();
      setIsAutoFetched(true);
    }
  }, [selectedAcademicYear, selectedSubject, subjectIdFromQuery, isAutoFetched]);

  // Tính số cột chuyên cần tối đa để hiển thị bảng điểm
  const maxChuyenCanCount = Math.max(1, ...scoreBoardData.map((s) => s.chuyenCanList?.length || 0));

  return (
    <>
      <AddressList addressList={urls} />
      <div className="flex items-center gap-3 mb-3">
        {/* Dropdown chọn niên khóa */}
        <DropdownSelectionComponent
          placeholder="Niên khóa"
          label={academicYearOptions.length ? academicYearOptions[0].label : 'Chọn niên khóa'}
          options={academicYearOptions.map((option) => option.label)}
          width={133}
          onSelect={(selectedLabel: string) => {
            const selectedAcademic = academicYearOptions.find((academic) => academic.label === selectedLabel);
            if (selectedAcademic) {
              setSelectedAcademicYear(selectedAcademic);
              // Reset các lựa chọn liên quan khi thay đổi niên khóa
              setSelectedSubject(null);
              setSelectedClass(null);
            }
          }}
        />
        {/* Dropdown chọn lớp học */}
        <DropdownSelectionComponent
          placeholder="Chọn lớp học"
          options={classOptions.map((option) => option.label)}
          width={136}
          onSelect={(selectedLabel: string) => {
            const selectedCls = classOptions.find((cls) => cls.label === selectedLabel);
            if (selectedCls) {
              setSelectedClass(selectedCls);
            }
          }}
        />
        {/* Dropdown chọn môn học */}
        <DropdownSelectionComponent
          placeholder="Môn học"
          options={subjects.map((option) => option.label)}
          width={136}
          onSelect={(selectedLabel: string) => {
            const selectedSubj = subjects.find((subj) => subj.label === selectedLabel);
            if (selectedSubj) {
              setSelectedSubject(selectedSubj);
            }
          }}
        />
        <button
          className="w-[136px] h-[40px] border border-orange-600 bg-orange-200 text-black-text font-semibold rounded-lg hover:bg-orange-300"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
      <hr className="border-t border-gray-300 mt-[29px] mb-[29px]" />

      <h2 className="text-orange-text font-semibold mb-2">Kết quả tìm kiếm</h2>
      {scoreClass && <SearchResult scoreBoardClass={scoreClass} scoreBoard={scoreBoardData} />}

      {/* Bảng điểm */}
      <div className="rounded-lg mb-4 mx-2 mt-[29px]">
        <div className="flex flex-wrap justify-between items-center py-2 gap-2 mb-[14px]">
          <h2 className="text-lg font-sans font-bold text-[#823B00]">Bảng điểm của lớp</h2>
          <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300 bg-[#EFEFEF]">
            <IconSearchLightGrayishBlue className="ms-3" />
            <input
              type="text"
              placeholder="Tìm kiếm theo ID hoặc tên học viên"
              className="bg-[#EFEFEF] w-full h-[40px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-[16px]">
            <thead className="bg-gradient-to-r from-background-2 to-background-1 text-white whitespace-nowrap">
              <tr>
                <th rowSpan={2} className="py-3 text-center">
                  STT
                </th>
                <th rowSpan={2} className="py-3 text-center">
                  <div className="flex items-center justify-start gap-2 font-sans">
                    <span>Họ và tên</span>
                    <span className="relative top-[4px]">
                      <IconDoubleArrowUpDown />
                    </span>
                  </div>
                </th>
                <th rowSpan={2} className="py-3 text-center">
                  Ngày sinh
                </th>
                <th colSpan={6} className="px-4 py-2 border border-grey-text text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative top-[4px] cursor-pointer" onClick={() => setSelectedSemesterIndex(0)}>
                      <ArrowLeftIcon className={selectedSemesterIndex === 0 ? 'text-gray-500' : 'text-white'} />
                    </span>
                    <span className="font-bold uppercase">{selectedSemesterIndex === 0 ? 'HỌC KỲ I' : 'HỌC KỲ II'}</span>
                    <span className="relative top-[4px] cursor-pointer" onClick={() => setSelectedSemesterIndex(1)}>
                      <ArrowRightIcon className={selectedSemesterIndex === 1 ? 'text-gray-500' : 'text-white'} />
                    </span>
                  </div>
                </th>
                <th rowSpan={2} className="py-3 text-center">
                  Điểm trung bình cả năm
                </th>
                <th rowSpan={2} className="py-3 text-center">
                  Đạt
                </th>
                <th rowSpan={2} className="py-3 text-center">
                  Ngày cập nhật
                </th>
              </tr>
              <tr>
                {Array.from({ length: maxChuyenCanCount }).map((_, i) => (
                  <th key={`cc-header-${i}`} className={`py-3 text-center ${i === 0 ? 'border-l border-grey-text' : ''}`}>
                    Chuyên cần {i + 1}
                  </th>
                ))}
                <th className="py-3 text-center">Miệng</th>
                <th className="py-3 text-center">15 phút</th>
                <th className="py-3 text-center">Hệ số I</th>
                <th className="py-3 text-center">Hệ số II</th>
                <th className="py-3 text-center border-r border-grey-text">Trung bình</th>
              </tr>
            </thead>
            <tbody>
              {scoreBoardData.length === 0 ? (
                <tr>
                  <td colSpan={13} className="text-center py-6 text-gray-500 italic">
                    Chưa có bảng điểm
                  </td>
                </tr>
              ) : (
                scoreBoardData.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 text-center">{item.stt}</td>
                    <td className="py-3 text-start font-bold">{item.name}</td>
                    <td className="py-3 text-center">{item.birthday ? dayjs(item.birthday).format('DD/MM/YYYY') : ''}</td>

                    {Array.from({ length: maxChuyenCanCount }).map((_, i) => (
                      <td key={`cc-${item.id}-${i}`} className="py-3 text-center text-lg">
                        {item.chuyenCanList?.[i] ?? '-'}
                      </td>
                    ))}
                    <td className="py-3 text-center text-lg">{item.mieng}</td>
                    <td className="py-3 text-center text-lg">{item.phut15}</td>
                    <td className="py-3 text-center text-lg">{item.heSo1}</td>
                    <td className="py-3 text-center text-lg">{item.heSo2}</td>
                    <td className="py-3 text-center text-lg text-blue-text">{item.tbHocKy.toFixed(1)}</td>
                    <td className={`py-3 text-center text-lg font-bold ${item.diemTrungBinhCaNam >= 5 ? 'text-green-text' : 'text-[#ED2025]'}`}>
                      {item.diemTrungBinhCaNam.toFixed(1)}
                    </td>
                    <td className="py-3 text-center text-lg">
                      {item.diemTrungBinhCaNam >= 5 ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-text mx-auto" />
                      ) : (
                        <XCircleIcon className="w-6 h-6 text-[#ED2025] mx-auto" />
                      )}
                    </td>
                    <td className="py-3 pl-12 text-base italic text-gray-700">{formatDate(item.ngayCapNhat)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
