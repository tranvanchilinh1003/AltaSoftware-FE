import React, { useState } from 'react';
import Input from '../../../components/Input';
import caretdown from '../../../assets/icons/caret_down.png';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import iconCalendar from '../../../assets/icons/icon-calendar.png';
import calendaralt from '../../../assets/icons/u_calendar-white.png';
import right from '../../../assets/icons/icon-arrow-right.png';
import eye from '../../../assets/icons/orange_eye_outline.png';
import eyeoff from '../../../assets/icons/visibility_off.png';
import dayjs, { Dayjs } from 'dayjs';
import CheckboxComponent from '../../../components/CheckBox';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    durationTime: 0,
    password: '',
    autoOpen: true,
    shareCodeUrl: '',
    status: '',
    isExam: true,
    teachingAssignmentId: 0,
    examId: 0,
    active: true,
  });
  const axios = axiosInstance();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/sessions', formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });

      toast.success('Buổi học đã được thêm thành công!');
      console.log('Success:', response.data);
    } catch (error) {
      toast.error('Lỗi khi thêm buổi học!');
      console.error('Error:', error);
    }
  };
  const handleStartDateChange = (newDate: Dayjs | null) => {
    if (!newDate) return;

    // Ngày bắt đầu (định dạng YYYY-MM-DD)
    const formattedStartDate = newDate.format('YYYY-MM-DD');

    // Ngày kết thúc = startDate + 1 ngày
    const calculatedEndDate = newDate.add(1, 'day').format('YYYY-MM-DD');

    setFormData((prev) => ({
      ...prev,
      startDate: formattedStartDate,
      endDate: calculatedEndDate, // Đảm bảo endDate lớn hơn startDate ít nhất 1 ngày
    }));

    setOpenStart(false);
  };
  // const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;

  //   // Nếu đã có startDate, cập nhật endDate dựa trên durationMinutes
  //   if (formData.startDate) {
  //     const startDate = dayjs(formData.startDate);
  //     const updatedEndDate = startDate
  //       .add(1, 'day')
  //       .hour(Number(value.split(':')[0]))
  //       .minute(Number(value.split(':')[1]));

  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //       endDate: updatedEndDate.format('YYYY-MM-DD HH:mm'),
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const [startDate, setStartDate] = useState(null);

  const [openStart, setOpenStart] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-lg w-full mx-auto max-w-6xl p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-400 text-sm">Quản lý lớp học</span>
          <img src={right} alt="next" className="w-3 h-5" />
          <h1 className="text-3xl font-bold text-black">Thêm buổi học mới</h1>
        </div>

        <div className="text-black-text font-bold bg-white p-12 rounded-lg shadow-lg w-full  mx-auto max-w-6xl">
          <div className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="topic" className="w-1/4 text-gray-700">
                Chủ đề
              </label>
              <Input name="name" value={formData.name} onChange={handleChange} style={{ width: '700px' }} size="lg" type="text" />
            </div>
            <div className="flex items-center">
              <label htmlFor="description" className="w-1/4 text-gray-700">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                id="description"
                style={{ width: '700px' }}
                className="w-3/4 p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <div className="flex items-center">
              <label htmlFor="assistant" className="w-1/4 text-gray-700">
                Trợ giảng
              </label>
              <Input style={{ width: '700px' }} size="lg" type="text" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center">
                <label htmlFor="duration" className="w-1/4 text-gray-700">
                  Thời lượng
                </label>
                <div className="relative w-1/6">
                  <select
                    id="durationHours"
                    name="durationHours"
                    value={formData.durationTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 appearance-none pr-10"
                  >
                    {Array.from({ length: 24 }, (_, hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center border-l border-gray-300 pl-2">
                    <img src={caretdown} alt="Clock Icon" className="w-10 h-10" />
                  </div>
                </div>
                <span className="mx-2">Giờ</span>
                <div className="pl-11 relative w-[208px]">
                  <select
                    id="durationMinutes"
                    name="durationMinutes"
                    value={formData.durationTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 appearance-none pr-10"
                  >
                    {[0, 15, 30, 45].map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center border-l border-gray-300 pl-2">
                    <img src={caretdown} alt="Clock Icon" className="w-10 h-10" />
                  </div>
                </div>
                <span className="ml-2">Phút</span>
              </div>
              <div className="flex items-center">
                <label htmlFor="start-date" className="w-1/4 text-gray-700">
                  Ngày bắt đầu
                </label>
                <div className="relative w-[230px] max-w-[230px] sm:w-[250px] md:w-[270px] lg:w-[300px]">
                  <DatePicker
                    name="startDate"
                    className="appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
                    value={formData.startDate ? dayjs(formData.startDate) : null}
                    onChange={handleStartDateChange}
                    format={(value) => value.format('D/M/YYYY')}
                    locale={locale}
                    placeholder="DD/MM/YYYY"
                    open={openStart}
                    onOpenChange={(status) => setOpenStart(status)}
                    suffixIcon={
                      <img
                        className="w-[22px] h-[25px] cursor-pointer"
                        src={iconCalendar}
                        alt="calendar icon"
                        onClick={() => setOpenStart(!openStart)}
                      />
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
                <div className="pl-5 relative w-[190px]">
                  <select
                    id="durationMinutes"
                    name="durationMinutes"
                    value={formData.durationTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 appearance-none "
                  >
                    <option value="14:45">14:45</option>
                    <option value="14:50">14:50</option>
                    <option value="15:00">15:00</option>
                    <option value="15:15">15:15</option>
                    <option value="15:30">15:30</option>
                    <option value="15:45">15:45</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center border-l border-gray-300 pl-2">
                    <img src={caretdown} alt="Clock Icon" className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label htmlFor="end-date" className="w-1/4 text-gray-700">
                  Ngày kết thúc
                </label>
                <div className="relative w-[230px] max-w-[230px] sm:w-[250px] md:w-[270px] lg:w-[300px]">
                  <DatePicker
                    className="appearance-none w-full h-11 border border-gray-300 rounded-lg shadow-md px-3"
                    value={formData.endDate ? dayjs(formData.endDate) : null}
                    // onChange={(newDate) => {
                    //   if (!newDate) return;
                    //   setFormData((prev) => ({
                    //     ...prev,
                    //     endDate: newDate.format('YYYY-MM-DD'),
                    //   }));
                    // }}
                    disabled
                    format={(value) => value.format('D/M/YYYY')}
                    locale={locale}
                    placeholder="DD/MM/YYYY"
                    suffixIcon={<img src={calendaralt} alt="Calendar Icon" className="w-8 h-8" />}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center  border-gray-300 pl-2">
                    <img src={calendaralt} alt="Clock Icon" className="w-8 h-8" />
                  </div>
                </div>

                <div className="pl-5 relative w-[190px]">
                  <select
                    id="durationMinutes"
                    name="durationMinutes"
                    value="15:00"
                    className="w-full border border-gray-300 rounded-md p-2 appearance-none  cursor-not-allowed"
                    disabled
                  >
                    <option value="15:00">15:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="security" className="w-1/4 text-gray-700">
                Bảo mật
              </label>
              <div className="relative w-[700px]">
                <Input style={{ width: '100%' }} size="lg" type={showPassword ? 'text' : 'password'} className="pr-12" />
                <img
                  src={showPassword ? eye : eyeoff}
                  alt="Toggle Password"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="flex  items-start">
              <label htmlFor="security" className="w-1/4 text-gray-700 ">
                Cài đặt khác
              </label>

              <div className="space-y-2">
                <CheckboxComponent
                  label="Tự động kích hoạt buổi học khi đến thời gian bắt đầu"
                  isChecked={false}
                  onChange={(e) => console.log(e.target.checked)}
                />
                <CheckboxComponent label="Bật tính năng lưu lại buổi học" isChecked={false} onChange={(e) => console.log(e.target.checked)} />
                <CheckboxComponent
                  label="Cho phép học viên/ cá nhân tham gia chia sẻ buổi học"
                  isChecked={false}
                  onChange={(e) => console.log(e.target.checked)}
                />
              </div>
            </div>

            <div className="flex items-center">
              <label htmlFor="share-link" className="w-1/4 text-gray-700">
                Link chia sẻ
              </label>
              <Input style={{ width: '600px' }} size="lg" type="text" />
              <button className="ml-2 bg-orange-500 text-white px-4 py-2 rounded">Copy link</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button className="secondary" style={{ color: '#000', margin: 2, marginRight: 20, fontWeight: 'bold' }}>
            Hủy
          </Button>

          <Button type="submit" className="primary" style={{ margin: 2, marginLeft: 20, fontWeight: 'bold' }}>
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
