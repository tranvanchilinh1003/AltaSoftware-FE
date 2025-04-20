import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwitchTabCustom from '../../../components/SwitchTabCustom';
import Button from '../../../components/Button';
import ManageExamSchedule from './ManageExamSchedule/ExamSchedule';
import ExamPage from './ExamListTable'; // Đây chính là ExamPage đã được cập nhật
import Dropdown from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/Dropdown/type';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../../../utils/axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance();

const ExamSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('table');
  const navigate = useNavigate();

  // State quản lý lựa chọn của người dùng
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<DropdownOption | null>(null);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<DropdownOption | null>(null);
  const [selectedClass, setSelectedClass] = useState<DropdownOption | null>(null);

  // State lưu danh sách option từ API
  const [academicYearOptions, setAcademicYearOptions] = useState<DropdownOption[]>([]);
  const [gradeOptions, setGradeOptions] = useState<DropdownOption[]>([]);
  const [classOptions, setClassOptions] = useState<DropdownOption[]>([]);

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

  useEffect(() => {
    const fetchGradeLevels = async () => {
      try {
        const response = await axios.get(`${API_URL}/grade-levels`);
        const data = response.data.data;
        const options = data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setGradeOptions(options);
      } catch (error) {
        console.error('Error fetching grade levels:', error);
      }
    };

    fetchGradeLevels();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedGradeLevel) {
        try {
          const params = { gradeId: selectedGradeLevel.value };
          const response = await axiosInstance.get(`${API_URL}/class/by-grade-academic`, { params });
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
  }, [selectedGradeLevel]);

  // Tạo mảng options với option rỗng được thêm vào đầu danh sách
  const academicYearOptionsWithEmpty: DropdownOption[] = [
    { label: 'Tất cả', value: '' },
    ...academicYearOptions,
  ];
  const gradeOptionsWithEmpty: DropdownOption[] = [
    { label: 'Tất cả', value: '' },
    ...gradeOptions,
  ];
  const classOptionsWithEmpty: DropdownOption[] = [
    { label: 'Tất cả', value: '' },
    ...classOptions,
  ];

  const tabs = [
    {
      label: 'Xem theo bảng',
      value: 'table',
      content: (
        <ManageExamSchedule
          academicYearId={selectedAcademicYear ? selectedAcademicYear.value : ''}
          gradeLevelsId={selectedGradeLevel ? selectedGradeLevel.value : ''}
          classId={selectedClass ? selectedClass.value : ''}
        />
      ),
    },
    {
      label: 'Xem theo lịch',
      value: 'calendar',
      content: (
        <ExamPage
          academicYearId={selectedAcademicYear ? selectedAcademicYear.value : ''}
          gradeLevelsId={selectedGradeLevel ? selectedGradeLevel.value : ''}
          classId={selectedClass ? selectedClass.value : ''}
        />
      ),
    },
  ];

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const getActiveTabContent = () => {
    const foundTab = tabs.find((tab) => tab.value === activeTab);
    return foundTab ? foundTab.content : null;
  };

  const goCreate = () => {
    navigate(`/leadership/exams/create-exam-schedule`);
  };

  return (
    <div>
      <h1 className="text-[#373839] text-5xl font-bold mb-8">Quản lý lịch thi</h1>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex gap-4">
          <Dropdown
            options={academicYearOptionsWithEmpty}
            selectedOption={selectedAcademicYear}
            handleOptionClick={(option) => {
              // Nếu chọn rỗng, set về null
              setSelectedAcademicYear(option.value ? option : null);
            }}
            placeholder="Niên khóa"
            className="w-full whitespace-nowrap"
          />
          <Dropdown
            options={gradeOptionsWithEmpty}
            selectedOption={selectedGradeLevel}
            handleOptionClick={(option) => {
              setSelectedGradeLevel(option.value ? option : null);
            }}
            placeholder="Chọn khối"
            headerClassName="w-full whitespace-nowrap"
          />
          <Dropdown
            options={classOptionsWithEmpty}
            selectedOption={selectedClass}
            handleOptionClick={(option) => {
              setSelectedClass(option.value ? option : null);
            }}
            placeholder="Chọn lớp"
            className="w-full whitespace-nowrap"
          />
        </div>
        <SwitchTabCustom className="h-[48px]" tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="flex-grow"></div>
        <Button className="primary" size="big" onClick={goCreate}>
          <span className="text-lg">+</span> Thêm mới
        </Button>
      </div>

      {/* Nội dung tab */}
      <div className="mt-4">{getActiveTabContent()}</div>
    </div>
  );
};

export default ExamSchedule;
