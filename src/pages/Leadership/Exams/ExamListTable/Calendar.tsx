import React from 'react';
import { IExam } from './type';

interface CalendarProps {
  exams: IExam[];
  setSelectedDate: (date: string | null) => void;
}

const Calendar = ({ exams, setSelectedDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('month');
  const today = new Date();

  const handleMonthChange = (newMonth: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
  };

  const handleYearChange = (newYear: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newYear);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  const renderWeekDays = () => {
    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return (
      <div className="grid grid-cols-7 border-t border-l border-orange-500 bg-white rounded-lg text-sm sm:text-base">
        {weekDays.map((day, index) => (
          <div key={index} className="border-r border-b border-orange-500 p-2 sm:p-3 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    return (
      <div className="grid grid-cols-7 border-l border-orange-500 bg-white rounded-b-lg text-xs sm:text-sm">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

          const dayExams = exams.filter((exam) => exam.date === formattedDate);
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={day}
              className="border-r border-b border-orange-500 min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 cursor-pointer flex flex-col items-center bg-white"
              onClick={() => {
                setSelectedDate(formattedDate);
              }}
            >
              <div
                className={`text-gray-600 text-center w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full leading-none ${
                  isToday ? 'bg-[#8B4513] text-white font-bold' : ''
                }`}
              >
                {day}
              </div>
              {dayExams.length > 0 && (
                <div className={`mt-1 p-1 text-white text-xs rounded bg-orange-500`}>
                  {dayExams.map((exam) => (
                    <p key={exam.id} className="text-center">
                      {exam.subject} - {exam.duration}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-2 sm:p-4 rounded-2xl">
      <div className="rounded-lg overflow-hidden">
        <div className="bg-black text-white flex flex-wrap items-center px-2 sm:px-4 py-2 sm:py-3 rounded-t-lg text-xs sm:text-base">
          <button className="text-lg" onClick={() => handleMonthChange(currentDate.getMonth() - 1)}>
            {'<'}
          </button>
          <select
            className="mx-1 sm:mx-2 bg-black text-white text-xs sm:text-sm"
            value={currentDate.getMonth()}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
          <select
            className="mx-1 sm:mx-2 bg-black text-white text-xs sm:text-sm"
            value={currentDate.getFullYear()}
            onChange={(e) => handleYearChange(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => {
              const year = today.getFullYear() - 10 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <button className="text-lg" onClick={() => handleMonthChange(currentDate.getMonth() + 1)}>
            {'>'}
          </button>
          <div className="ml-auto flex gap-1 sm:gap-2">
            <button
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${
                viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('month')}
            >
              Tháng
            </button>
            <button
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${
                viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('week')}
            >
              Tuần
            </button>
          </div>
          <button className="ml-2 sm:ml-4 bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded" onClick={goToToday}>
            Hôm nay
          </button>
        </div>
        {renderWeekDays()}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
