import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import iconCalendar from '../../../src/assets/icons/icon-calendar.png';

// Kích hoạt plugin để hỗ trợ định dạng tùy chỉnh
dayjs.extend(customParseFormat);

interface DateInputProps {
  value?: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, width = '200px', className = '', style = {} }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      showToday={false}
      className={`h-[40px] rounded-[6px] border border-gray-500 hover:border-orange-500 shadow-md ${className}`}
      value={value}
      onChange={(date) => {
        onChange(date);
        setOpen(false);
      }}
      format={(value) => value.format('D/M/YYYY')}
      locale={locale}
      placeholder="DD/MM/YYYY"
      open={open}
      onOpenChange={(status) => setOpen(status)}
      suffixIcon={
        <img className="w-[22px] h-[25px] border-gray-500 cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpen(!open)} />
      }
      dropdownClassName="custom-datepicker"
      renderExtraFooter={() => (
        <button
          className="bg-orange-500 ml-24 text-white px-6 mb-2 rounded-md  font-semibold hover:bg-orange-600 transition mt-4"
          onClick={() => setOpen(false)}
        >
          Chọn
        </button>
      )}
      style={{ width, ...style }}
    />
  );
};

export default DateInput;
