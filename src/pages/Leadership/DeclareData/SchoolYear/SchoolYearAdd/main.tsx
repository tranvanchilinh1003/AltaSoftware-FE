import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import icon from './icon';
import DropdownSelection from '../../../../../components/DropdownSelection';
import Checkbox from '../../../../../components/CheckBox';
import Button from '../../../../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { FormData } from '../SchoolYearFormEdit/type';
import { ToastContainer, toast } from 'react-toastify';
import DateInput from '../../../../../components/Date';
import dayjs from 'dayjs';
import axios from 'axios';

import { useCookies } from 'react-cookie';

const CustomDropdown: React.FC<{
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-[144px]">
      <button
        className="w-full px-3 py-2 border border-gray-300 rounded-lg flex justify-between items-center bg-white shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {value || 'Chọn năm'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SchoolYearAdd: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedStartYear, setSelectedStartYear] = useState<string | null>(null);
  const [selectedEndYear, setSelectedEndYear] = useState<string | null>(null);
  const [yearRangeError, setYearRangeError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const [semesterData, setSemesterData] = useState([{ id: 1, name: 'Học kì 1', startDate: null, endDate: null }]);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleCancel = () => {
    // console.log('Cancel clicked');
    toast.info('Đã hủy thao tác');
    navigate('/leadership/declare-data/school-year'); // Quay lại trang trước
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });
  const addSemester = () => {
    const newId = semesterData.length + 1;
    setSemesterData([...semesterData, { id: newId, name: `Học kì ${newId}`, startDate: null, endDate: null }]);
    // toast.success(`Đã thêm học kì ${newId}`);
  };

  // const validateYearRange = (startYear: string | null, endYear: string | null) => {
  //   if (startYear && endYear) {
  //     const start = parseInt(startYear);
  //     const end = parseInt(endYear);
  //     const yearDiff = end - start;

  //     if (yearDiff < 1) {
  //       setYearRangeError('Niên khóa phải kéo dài ít nhất 1 năm');
  //       return false;
  //     } else if (yearDiff > 5) {
  //       setYearRangeError('Niên khóa không được kéo dài quá 5 năm');
  //       return false;
  //     } else {
  //       setYearRangeError(null);
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const handleStartYearChange = (value: string) => {
    setSelectedStartYear(value);
    // validateYearRange(value, selectedEndYear);
  };

  const handleEndYearChange = (value: string) => {
    setSelectedEndYear(value);
    // validateYearRange(selectedStartYear, value);
  };

  const handleDateChange = (semesterId: number, field: 'startDate' | 'endDate', value: string | null) => {
    // console.log(`Cập nhật ${field} của Học kỳ ${semesterId}:`, value);
    setSemesterData((prev) => prev.map((s) => (s.id === semesterId ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    const startDate = semesterData[0]?.startDate;
    const endDate = semesterData[semesterData.length - 1]?.endDate;

    if (!selectedStartYear || !selectedEndYear) {
      toast.error('Vui lòng chọn niên khóa!');
      return;
    }
    // console.log('Start Date:', startDate);
    // console.log('End Date:', endDate);

    // if (!validateYearRange(selectedStartYear, selectedEndYear)) {
    //   toast.error(yearRangeError || 'Niên khóa phải kéo dài ít nhất 1 năm và nhiều nhất 5 năm');
    //   return;
    // }

    if (!startDate || !endDate) {
      toast.error('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc!');
      return;
    }

    const start = dayjs(startDate).startOf('day');
    const end = dayjs(endDate).startOf('day');

    // const durationInYears = end.diff(start, 'year', true);
    // if (durationInYears < 1 || durationInYears > 5) {
    //   toast.error('Niên khóa phải kéo dài ít nhất 1 năm và nhiều nhất 5 năm');
    //   return;
    // }

    try {
      const loadingToast = toast.loading('Đang xử lý...');

      // Gửi yêu cầu thêm niên khóa
      const academicYearPayload = {
        startTime: start.format('YYYY-MM-DDTHH:mm:ss'), // Định dạng ISO 8601
        endTime: end.format('YYYY-MM-DDTHH:mm:ss'), // Định dạng ISO 8601
        schoolId: 2,
      };

      // console.log('📌 Gửi dữ liệu niên khóa:', academicYearPayload);

      const response = await axios.post('https://fivefood.shop/api/academic-years', academicYearPayload, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      });
      toast.dismiss(loadingToast);

      // console.log('📌 Phản hồi từ server (niên khóa):', response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success('Thêm niên khóa thành công!');

        const academicYearId = response.data?.data?.id;
        // console.log('✅ ID niên khóa nhận được:', academicYearId);

        if (!academicYearId) {
          // console.error('❌ API không trả về ID của niên khóa!');
          toast.error('Không thể thêm học kỳ vì thiếu ID niên khóa!');
          return;
        }

        // Thêm các học kỳ
        for (let index = 0; index < semesterData.length; index++) {
          const semester = semesterData[index];
          // console.log(semester.name, semester.startDate, semester.endDate);

          if (!semester.startDate || !semester.endDate) {
            toast.error(`Vui lòng nhập đầy đủ ngày bắt đầu và kết thúc cho ${semester.name}`);
            continue;
          }

          const semesterStart = dayjs(semester.startDate);
          const semesterEnd = dayjs(semester.endDate);

          if (semesterEnd.isAfter(end)) {
            toast.error(`${semester.name} vượt quá thời gian kết thúc của niên khóa`);
            continue;
          }

          const semesterPayload = {
            name: semester.name,
            startTime: semesterStart.format('YYYY-MM-DDTHH:mm:ss'), // Định dạng ISO 8601
            endTime: semesterEnd.format('YYYY-MM-DDTHH:mm:ss'), // Định dạng ISO 8601
            academicYearId: academicYearId,
          };

          // console.log('📌 Gửi dữ liệu học kỳ:', semesterPayload);

          try {
            const semResponse = await axios.post('https://fivefood.shop/api/semesters', semesterPayload, {
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
            });

            // console.log('📌 Phản hồi từ server (học kỳ):', semResponse.data);

            if (semResponse.status === 200 || semResponse.status === 201) {
              toast.success(`Đã thêm ${semesterPayload.name}`);
            } else {
              toast.error(`Lỗi khi thêm ${semesterPayload.name}: ${semResponse.status}`);
            }
          } catch (error: any) {
            // console.error(`Lỗi khi thêm ${semesterPayload.name}:`, error.response?.data || error);
            toast.error(`Lỗi khi thêm ${semesterPayload.name}: ${error.response?.data?.message || 'Đã xảy ra lỗi'}`);
          }
        }

        setTimeout(() => {
          navigate('/leadership/declare-data/school-year');
        }, 2000); // Tăng thời gian để đảm bảo tất cả toast thông báo được hiển thị
      }
    } catch (error: any) {
      // console.error('Lỗi từ server:', error.response?.data || error);
      toast.error(`Lỗi: ${error.response?.status} - ${error.response?.data?.message || 'Đã xảy ra lỗi'}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-20 mt-4 bg-white rounded-lg shadow-lg">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-3xl font-bold text-center mb-4">Thêm niên khóa mới</h1>
      <div className="grid gap-4 grid-cols-2">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Niên khóa:</label>
          <div className="flex items-center space-x-2">
            <CustomDropdown options={yearOptions} value={selectedStartYear} onChange={handleStartYearChange} />
            <span>đến</span>
            <CustomDropdown options={yearOptions} value={selectedEndYear} onChange={handleEndYearChange} />
          </div>
          {yearRangeError && <p className="text-red-500 text-sm mt-1">{yearRangeError}</p>}
        </div>

        <div className="mb-2">
          <label className="flex items-center space-x-2">
            <Checkbox label="Kế thừa dữ liệu:" isChecked={isChecked} onChange={handleCheckboxChange} />
            <DropdownSelection width={'144px'} placeholder="Niên khóa" />
          </label>
          <p className="text-sm text-gray-500 mt-1 flex items-start space-x-2">
            <img src={icon.union} alt="icon" className="w-5 h-5" />
            <span className="italic">
              Dữ liệu được kế thừa bao gồm:
              <br />- Thông tin học viên và danh sách lớp học
              <br />- Thông tin môn học
              <br />- Phân công giảng dạy
            </span>
          </p>
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="mb-2">
        <h2 className="font-bold mb-2 text-orange-text">Cài đặt thời gian</h2>
        {semesterData.map((semester) => (
          <div key={semester.id} className="flex items-center space-x-2 mb-4">
            <label className="flex items-center font-semibold">
              <img src={icon.fi_minus} alt="icon" className="icon-fiminus mr-2" />
              <p className="p-0 m-0 text-sm">Tên học kì:</p>
            </label>
            <input type="text" className="semester-input" placeholder={semester.name} readOnly />

            <div className="flex items-center space-x-2">
              <p className="text-sm">Từ</p>
              <Controller
                name={`semester_${semester.id}_startDate` as keyof FormData}
                control={control}
                defaultValue={semester.startDate || ''}
                render={({ field }) => (
                  <DateInput
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      const formattedDate = date ? date.format('YYYY/MM/DD') : null;
                      field.onChange(formattedDate);
                      handleDateChange(semester.id, 'startDate', formattedDate);
                    }}
                  />
                )}
              />
              <Controller
                name={`semester_${semester.id}_endDate` as keyof FormData}
                control={control}
                defaultValue={semester.endDate || ''}
                render={({ field }) => (
                  <DateInput
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      const formattedDate = date ? date.format('YYYY/MM/DD') : null;
                      field.onChange(formattedDate);
                      handleDateChange(semester.id, 'endDate', formattedDate);
                    }}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <label className="flex items-center font-semibold">
        <img src={icon.fi_plus} alt="icon" className="icon-fiminus mr-2" />
        <button type="button" className="p-0 m-0 text-sm" onClick={addSemester}>
          Thêm học kì mới
        </button>
      </label>

      <div className="flex justify-center mt-6 space-x-3">
        <Button onClick={handleCancel} disabled={false} width="160px" height="52px">
          Huỷ
        </Button>
        <Button className="bg-orange-500 text-white" onClick={handleSave} disabled={false} width="160px" height="52px">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SchoolYearAdd;
