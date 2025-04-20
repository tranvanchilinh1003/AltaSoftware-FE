import React, { useState, useMemo } from 'react';
import './style.css';
import { CalendarInputProps } from './type';
import iconCalendar from '../../../src/assets/icons/icon-calendar.png';
import iconArrowLeft from '../../../src/assets/icons/icon-arrow-left.png';
import iconArrowRight from '../../../src/assets/icons/icon-arrow-right.png';
const CalendarInput: React.FC<CalendarInputProps> = ({
  placeholder = 'Chọn ngày',
  onDateChange,
  onMonthChange,
  onToggleCalendar,
  selectedDate,
  handleDateChoose,
  locale = 'vi-VN',
  dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  style,
  inputStyle,
  popupStyle,
  buttonStyle,
  selectedDayStyle,
  otherMonthDayStyle,
  disable
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const getCalendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const prevMonthDaysToShow = Array.from(
      { length: firstDayOfMonth },
      (_, i) => new Date(prevYear, prevMonth, daysInPrevMonth - firstDayOfMonth + 1 + i),
    );

    const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => new Date(currentYear, currentMonth, i + 1));

    const remainder = (prevMonthDaysToShow.length + currentMonthDays.length) % 7;
    const nextMonthDaysToShow = Array.from({ length: remainder === 0 ? 0 : 7 - remainder }, (_, i) => new Date(currentYear, currentMonth + 1, i + 1));

    return [...prevMonthDaysToShow, ...currentMonthDays, ...nextMonthDaysToShow];
  }, [currentMonth, currentYear]);

  // const handleChooseDate = () => {
  //   handleDateChoose?.();
  //   setIsCalendarOpen(false);
  //   onToggleCalendar?.(false);
  // };

  // Câp nhât fn chọn ngày
    const handleChooseDate = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!selectedDate) return;
      setIsCalendarOpen(false);
      onToggleCalendar?.(false);
    };

    const handleClick = (date: Date) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleDateClick(date);
    };

  const handleDateClick = (date: Date) => {
    onDateChange?.(date);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
    onToggleCalendar?.(!isCalendarOpen);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };
  

  return (
    <div className="calendar-container" style={style}>
      <div className="calendar-input-container" style={inputStyle}>
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString(locale) : ''}
          onClick={toggleCalendar}
          readOnly
          placeholder={placeholder}
          className="calendar-input"
          disabled={disable}
        />
        <button className="calendar-icon" onClick={toggleCalendar} style={buttonStyle} disabled={disable}>
          <img src={iconCalendar} alt="" />
        </button>
      </div>

      {isCalendarOpen && (
        <div className="calendar-popup open" style={popupStyle}>
          <div className="calendar-header">
            <button className="calendar-nav-button" onClick={handlePrevMonth}>
              <img src={iconArrowLeft} alt="" />
            </button>
            <span className="calendar-title">
              Tháng {currentMonth + 1}, {currentYear}
            </span>
            <button className="calendar-nav-button" onClick={handleNextMonth}>
              <img src={iconArrowRight} alt="" />
            </button>
          </div>

          <div className="calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {getCalendarDays.map((date, index) => (
              <button
                key={index}
                onClick={handleClick(date)}
                className={`calendar-day ${
                  selectedDate?.toDateString() === date.toDateString() ? 'selected' : date.getMonth() !== currentMonth ? 'other-month' : ''
                }`}
                style={
                  selectedDate?.toDateString() === date.toDateString()
                    ? selectedDayStyle
                    : date.getMonth() !== currentMonth
                    ? otherMonthDayStyle
                    : undefined
                }
              >
                {date.getDate()}
              </button>
            ))}
          </div>
          <div className="calendar-footer">
            <button className="calendar-choose-button" onClick={handleChooseDate}>
              Chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
