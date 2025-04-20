import React, { useEffect, useMemo, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import iconCalendar from '../../../../../assets/icons/icon-calendar.png';
import minus from '../../../../../assets/icons/icon_minus.png';
import plus from '../../../../../assets/icons/icon_plus.png';
import caretdown from '../../../../../assets/icons/caret_down.png';

import { CustomDropdownProps } from '../../../../../components/DropdownSelection/type';
import CheckboxComponent from '../../../../../components/CheckBox';

import { trainingPrograms } from './type';
import Button from '../../../../../components/Button';
import axiosInstance from '../../../../../utils/axiosInstance';
import { Lecturer, Schoolslist, WorkHistory } from '../Types';
import { stringify } from 'querystring';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router';
import Input from '../../../../../components/Input';
dayjs.extend(customParseFormat);
const EditWorkProcess: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Lựa chọn',
  width = '100%',

  onSelect,
  className = '',
}) => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  // const [endDate, setEndDate] = useState(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [success, setSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [trainingPrograms, setTrainingPrograms] = useState<trainingPrograms[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<trainingPrograms[]>([]);
  const [subjectGroups, setSubjectGroups] = useState<trainingPrograms[]>([]);
  const [subjectGroupsid, setSubjectGroupsid] = useState<trainingPrograms[]>([]);
  // const [workprocess, setWorkprocess] = useState<WorkHistory[]>([]);
  const [workprocess, setWorkprocess] = useState<WorkHistory | null>(null);

  const [schools, setSchools] = useState<Schoolslist[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const location = useLocation();
  const teacherIdd = location.state?.teacherId;
  const idd = location.state?.id;
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [subjectGroupsId, setSubjectGroupsId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    TeacherId: null as number | null,
    isCurrent: false,
    endDate: null as string | null,
    startDate: null as string | null,
    program: [] as number[],
    subjectGroupsId: null as number | null,
    organization: '',
    position: '',
  });

  console.log(subjectGroups);

  const axios = axiosInstance();
  useEffect(() => {
    if (!schools.length) return;
    const fetchWorkProcess = async () => {
      try {
        const response = await axios.get(`/api/work-process/${id}`);
        const data = response.data.data;

        if (data) {
          const formattedStartDate = data.startDate ? dayjs(data.startDate) : null;
          const formattedEndDate = data.endDate ? dayjs(data.endDate) : null;
          setStartDate(formattedStartDate);

          if (!schools.some((school) => school.name === data.organization)) {
            schools.unshift({ id: -1, name: data.organization });
          }

          setEndDate(formattedEndDate);
          setFormData((prev) => ({
            ...prev,

            organization: prev.organization || data.organization,
            position: prev.position || data.position,
            isCurrent: data.isCurrent,
            startDate: data.startDate,
            endDate: data.endDate,
            subjectGroupsId: prev.subjectGroupsId ?? data.subjectGroupsId,
          }));
          setWorkprocess(data);
          setTeacherId(data.teacherId);
          setSubjectGroupsId(data.subjectGroupsId);
        } else {
          console.error('Dữ liệu danh sách tổ/bộ môn không hợp lệ', response.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };
    fetchWorkProcess();
  }, [schools]);

  useEffect(() => {
    const fetchLecturers = async () => {
      if (!teacherIdd && id) return;
      try {
        const response = await axios.get(`/api/users/${teacherIdd}`);

        if (response.data.data) {
          const data = response.data.data;

          const formattedData = Array.isArray(data) ? data : [data];

          setFormData((prev) => ({
            ...prev,
            TeacherId: id ? Number(id) : null,
          }));

          setLecturers(formattedData);
        } else {
          console.error('Dữ liệu người thân không hợp lệ', response.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách giảng viên', err);
      }
    };
    fetchLecturers();
  }, [teacherIdd]);

  useEffect(() => {
    const fetchSubjectGroups = async () => {
      try {
        const response = await axios.get('/api/subject-groups');

        if (response.data && Array.isArray(response.data.data)) {
          setSubjectGroups(response.data.data);
        } else {
          console.error('Dữ liệu danh sách tổ/bộ môn không hợp lệ', response.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách tổ/bộ môn', err);
      }
    };
    fetchSubjectGroups();
  }, []);

  useEffect(() => {
    const fetchschools = async () => {
      try {
        const response = await axios.get('/api/schools');

        if (response.data && Array.isArray(response.data.data)) {
          setSchools(response.data.data);
        } else {
          console.error('Dữ liệu danh sách trường học không hợp lệ', response.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách trường học', err);
      }
    };
    fetchschools();
  }, []);
  useEffect(() => {
    if (trainingPrograms.length && workprocess?.program?.length) {
      const matchedPrograms = trainingPrograms.filter((tp) => workprocess.program.includes(tp.id));
      setSelectedPrograms(matchedPrograms);
    }
  }, [trainingPrograms, workprocess]);

  useEffect(() => {
    const fetchTrainingPrograms = async () => {
      try {
        const response = await axios.get('/api/training-program', {
          params: {
            sortColumn: 'Id',
            sortOrder: 'asc',
          },
        });
        if (response.data && Array.isArray(response.data.data)) {
          setTrainingPrograms(response.data.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách chương trình đào tạo', err);
      }
    };
    fetchTrainingPrograms();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log('Dữ liệu gửi đi:', formData);
    const programIds = selectedPrograms.map((program) => program.id);
    try {
      await axios.put(`/api/work-process/${id}`, {
        ...formData,
        program: programIds,
      });
      toast.success('Thêm quá trình công tác thành công!');
      setSuccess(true);
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại!');
      toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isCurrent: e.target.checked,
      program: selectedPrograms.map((program) => program.id),
    });
  };
  const Position = ['Giáo viên', 'Trưởng bộ môn', 'Tổ phó', 'Phó hiệu trưởng', 'Hiệu trưởng'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!e.target) return;

    const { name, value, type } = e.target;

    setFormData((prev) => {
      let updatedData = {
        ...prev,

        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      };

      if (name === 'organization') {
        updatedData.organization = value;
      }

      if (name === 'subjectGroupsId') {
        updatedData.subjectGroupsId = Number(value);
      }
      // Nếu có `isCurrent`, đặt lại `endDate`
      if (name === 'isCurrent') {
        updatedData.endDate = (e.target as HTMLInputElement).checked ? null : prev.endDate;
      }

      return updatedData;
    });

    if (name === 'lecturerId') {
      setSelectedUnit(value);
      setSelectedOrganization(value);
      onSelect && onSelect(value);
    }
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null, isStartDate: boolean) => {
    if (isStartDate) {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
    setFormData((prev) => ({
      ...prev,
      [isStartDate ? 'startDate' : 'endDate']: newDate ? newDate.format('YYYY-MM-DD') : null, // Gửi ngày theo định dạng YYYY-MM-DD
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: trainingPrograms) => {
    if (selectedPrograms.some((program) => program.id === option.id)) return;

    setSelectedPrograms([...selectedPrograms, option]);
    setFormData((prev) => ({
      ...prev,
      program: [...prev.program, option.id],
    }));
    setIsDropdownOpen(false);
  };

  const removeProgram = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedPrograms((prev) => prev.filter((_, i) => i !== index));

    setFormData((prev) => ({
      ...prev,
      programs: prev.program.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] shadow-lg">
        <form onSubmit={handleSubmit} className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-black-text text-center text-2xl font-bold mb-5">Thêm mới quá trình công tác</h2>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Giảng viên:</label>

            {lecturers.map((lecturer) => (
              <div style={{ width }} className={`relative ${className}`} key={lecturer.teacherId}>
                <Input
                  placeholder={lecturer.fullName}
                  disabled
                  onChange={handleChange}
                  name="guardianName"
                  style={{ width: '575px' }}
                  type="text"
                  size="sm"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Cơ quan/Đơn vị: <span className="text-orange-text">*</span>
            </label>
            <div style={{ width }} className={`relative ${className}`}>
              <div className="relative">
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={formData.organization || ''}
                  name="organization"
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Chọn cơ quan/đơn vị
                  </option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="pl-36">
            <CheckboxComponent isChecked={formData.isCurrent} label="Đang làm việc tại đơn vị này" onChange={handleCheckboxChange} />
          </div>
          <div className="pt-3 flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Tổ/Bộ môn: <span className="text-orange-text">*</span>
            </label>
            <div style={{ width }} className={`relative ${className}`}>
              {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
              <div className="relative">
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  name="subjectGroupsId"
                  value={formData.subjectGroupsId ?? ''}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Chọn tổ/bộ môn
                  </option>
                  {subjectGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className=" pt-3 flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Chức vụ: <span className="text-orange-text">*</span>
            </label>

            <div style={{ width }} className={`relative ${className}`}>
              {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
              <div className="relative">
                {/* Select Box */}
                <select
                  name="position"
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                  {Position.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Ngày bắt đầu: <span className="text-orange-text">*</span>
            </label>
            <DatePicker
              className="appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={startDate}
              onChange={(date) => handleDateChange(date, true)}
              format="DD/MM/YYYY"
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={openStart}
              onOpenChange={(status) => setOpenStart(status)}
              suffixIcon={
                <img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpenStart(!openStart)} />
              }
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpenStart(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Ngày kết thúc: <span className="text-orange-text">*</span>
            </label>

            <DatePicker
              className="appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={endDate}
              onChange={(date) => handleDateChange(date, false)}
              format="DD/MM/YYYY"
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={openEnd}
              onOpenChange={(status) => setOpenEnd(status)}
              suffixIcon={
                <img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpenEnd(!openEnd)} />
              }
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpenEnd(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {selectedPrograms.map((program, index) => (
              <div key={index} className="flex">
                <button onClick={(e) => removeProgram(index, e)} className="text-red-500">
                  <img src={minus} alt="Remove" className="w-6 h-6" />
                </button>
                <span className="flex-grow ml-3">{program.name}</span>
              </div>
            ))}
          </div>
          <div className="relative pt-3">
            <div className="text-blue-500 cursor-pointer font-bold flex items-center" onClick={toggleDropdown}>
              <img src={plus} alt="" className="w-6 h-6 inline-block" />
              <span className="ml-2">Thêm chương trình đào tạo</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-48">
                {trainingPrograms
                  .filter((option) => !selectedPrograms.some((program) => program.id === option.id)) // Lọc ra những chương trình chưa được chọn
                  .map((option) => (
                    <div key={option.id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect(option)}>
                      {option.name}
                    </div>
                  ))}
              </div>
            )}
          </div>{' '}
          <div className="flex justify-center mt-4">
            <Button className="secondary" style={{ color: '#000', margin: 2, marginRight: 20, fontWeight: 'bold' }}>
              Hủy
            </Button>

            <Button type="submit" className="primary" style={{ margin: 2, marginLeft: 20, fontWeight: 'bold' }}>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkProcess;
