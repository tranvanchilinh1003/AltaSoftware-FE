import { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownOption } from '../../../../components/Dropdown/type';
import trash from '../../../../assets/icons/icon-fi_trash-2.png';
import plus from '../../../../assets/icons/Plus.jpg';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import './style.css';
import Index from '../table/StudentAll';
import StudentDiscipline from '../table/StudentDiscipline';
import StudentReward from '../table/StudentReward';
import { useNavigate } from 'react-router';

const AllStudentProfilesHeader: React.FC = () => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<DropdownOption | null>(null);
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [activeButton, setActiveButton] = useState<string>('all');
  const [yearOptions, setYearOptions] = useState<DropdownOption[]>([]);
  const [gradeOptions, setGradeOptions] = useState<DropdownOption[]>([]);

  const buttons = [
    { label: 'Tất cả hồ sơ', value: 'all' },
    { label: 'Khen thưởng', value: 'reward' },
    { label: 'Kỷ luật', value: 'discipline' },
  ];
  console.log('Current activeButton:', activeButton);
  const renderComponent = () => {
    switch (activeButton) {
      case 'all':
        return <Index />;
      case 'reward':
        return <StudentReward />;
      case 'discipline':
        return <StudentDiscipline />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('https://fivefood.shop/api/academic-years');
        if (!response.data || !Array.isArray(response.data.data)) throw new Error('API không trả về danh sách niên khóa hợp lệ');
        const formattedYears = response.data.data.map((year: any) => ({
          label: year.name,
          value: year.id.toString(),
        }));
        setYearOptions(formattedYears);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách niên khóa:', error);
      }
    };

    const fetchSemesters = async () => {
      try {
        const response = await axios.get('https://fivefood.shop/api/semesters?sortColumn=Id&sortOrder=asc');
        if (!response.data || !Array.isArray(response.data.data)) throw new Error('API không trả về danh sách khối hợp lệ');
        const formattedGrades = response.data.data.map((semester: any) => ({
          label: semester.name,
          value: semester.id.toString(),
        }));
        setGradeOptions(formattedGrades);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khối:', error);
      }
    };

    fetchAcademicYears();
    fetchSemesters();
  }, []);

  const navigator = useNavigate();

  return (
    <>
      <h1 className="text-3xl font-bold text-left text-black-text mb-5">Tất cả hồ sơ học viên</h1>
      <div className="flex justify-between items-center mb-6 mr-[30px]">
        <div className="flex gap-4">
          <Dropdown
            placeholder="Tất cả khối"
            size="short"
            options={gradeOptions}
            selectedOption={selectedGradeOption}
            onSelect={(option) => setSelectedGradeOption(option)}
            handleOptionClick={(option) => setSelectedGradeOption(option)} // Thêm dòng này
          />

          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)} // Thêm dòng này
          />
          <div className="activeButton flex gap-3">
            {buttons.map(({ label, value }) => (
              <button
                key={value}
                className={`btn ${activeButton === value ? 'active' : ''}`}
                onClick={() => {
                  setActiveButton(value);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="trash">
            <img src={trash} alt="Xóa" className="trash-icon" />
          </button>
          <button className="export-btn">Xuất file</button>
          <Button className="primary" size="big" onClick={() => navigator('/leadership/new-student')}>
            <img src={plus} alt="Thêm mới" />
            Thêm mới
          </Button>
        </div>
      </div>
      {/* Hiển thị form dựa trên giá trị activeButton */}
      {renderComponent()}
    </>
  );
};

export default AllStudentProfilesHeader;
