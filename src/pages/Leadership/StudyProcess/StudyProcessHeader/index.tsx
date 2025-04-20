import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import Button from '../../../../components/Button';
import '../style.scss';
import '../../../../styles/_variables.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const StudyProcessHeader: React.FC = () => {
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [yearOptions, setYearOptions] = useState<DropdownOption[]>([]);
  const [hasFetchedYears, setHasFetchedYears] = useState(false);

  const [classOptions, setClassOptions] = useState<DropdownOption[]>([]);
  const [selectedClassOption, setSelectedClassOption] = useState<DropdownOption | null>(null);

  const token = Cookies.get('accessToken');
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  /// Lấy niên khóa
  const fetchAcademicYears = async () => {
    if (hasFetchedYears) return;

    try {
      const response = await axios.get('https://fivefood.shop/api/academic-years', {
        headers: authHeaders,
      });

      const result = response.data;
      if (!result || !Array.isArray(result.data)) {
        throw new Error('API không trả về danh sách niên khóa hợp lệ');
      }

      const formattedYears: DropdownOption[] = result.data.map((year: any) => ({
        label: year.name,
        value: year.id.toString(),
      }));

      setYearOptions(formattedYears);
      setHasFetchedYears(true);
    } catch (error) {
      console.error('Lỗi khi fetch năm học:', error);
      toast.error('Không thể tải danh sách niên khóa');
    }
  };

  /// Lấy danh sách lớp theo niên khóa
  const fetchClassOptions = async () => {
    if (!selectedYearOption?.value) return;

    try {
      const response = await axios.get(
        `https://fivefood.shop/api/class/by-grade-academic?page=1&pageSize=100&academicYearId=${selectedYearOption.value}&sortColumn=Id&sortOrder=asc`,
        { headers: authHeaders },
      );

      const result = response.data;

      if (!result || !Array.isArray(result.data)) {
        throw new Error('API không trả về danh sách lớp học hợp lệ');
      }

      const formattedClasses: DropdownOption[] = result.data.map((cls: any) => ({
        label: cls.name,
        value: cls.id.toString(),
      }));

      setClassOptions(formattedClasses);
    } catch (error) {
      console.error('Lỗi khi fetch danh sách lớp học:', error);
      // toast.error('Không thể tải danh sách lớp học');
    }
  };

  // Gọi API lớp khi chọn niên khóa

  const handleClick = () => {
    alert('Button clicked!');
  };

  const buttonStyle = {
    backgroundColor: 'var(--background-while)',
    color: 'var(--orange-text)',
    border: '1px solid var(--background-4)',
  };

  return (
    <div className="tab-dropdown-btn">
      <div className="group-dropdown">
        {/* <div
          className="dropdown"
          onClick={() => {
            if (!hasFetchedYears) fetchAcademicYears();
          }}
        >
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)}
          />
        </div>

        <div className="dropdown">
          <Dropdown
            placeholder="Tất cả lớp"
            size="short"
            options={classOptions}
            selectedOption={selectedClassOption}
            onSelect={(option) => setSelectedClassOption(option)}
            handleOptionClick={(option) => setSelectedClassOption(option)}
          />
        </div> */}
      </div>

      <div className="btn">
        <Button style={buttonStyle} width={'160'} height={'52'} onClick={handleClick}>
          Xuất file
        </Button>
      </div>
    </div>
  );
};

export default StudyProcessHeader;
