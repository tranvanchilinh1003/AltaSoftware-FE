import { useState } from 'react';
import Dropdown from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/Dropdown/type';
import './style.css';
import StudentCount from './StudentCount';
import StatisticsChart from './StatisticsChart';
import SummaryCard from './SummaryCard';
import TrafficChart from './TrafficChart';

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const options: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-black-text">Tổng quan</h1>
      <div className="grid grid-cols-4 gap-4 mb-6 mt-3 mr-[30px]">
        <div className="relative flex justify-center items-center">
          <div className="col-span-1 flex items-center gap-2">
            <h6 className="text-sm font-medium text-gray-700">Niên khóa</h6>
            <Dropdown
              placeholder="Niên khóa"
              size="short"
              options={options}
              selectedOption={selectedOption}
              onSelect={(option) => setSelectedOption(option)}
              handleOptionClick={(option) => setSelectedOption(option)}
            />
          </div>
        </div>
        <SummaryCard title="Học viên" count={5000} className="card-student" />
        <SummaryCard title="Giảng viên" count={1500} className="card-teacher" />
        <SummaryCard title="Lớp học" count={55} className="card-class" />
      </div>
      <div className="flex gap-4 p-6">
        <div className="w-3/4 h-96 p-4 bg-white rounded-lg shadow-lg">
          <StatisticsChart />
        </div>
        <div className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
          <StudentCount />
        </div>
      </div>
      <div className="gap-1 p-6">
        <TrafficChart />
      </div>
      
    </>
  );
};

export default Dashboard;
