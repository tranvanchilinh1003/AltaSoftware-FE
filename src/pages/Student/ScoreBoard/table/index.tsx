import TableBody from './bodyTable';
import { DropdownOption } from '../../../../components/Dropdown/type';
import Dropdown from '../../../../components/Dropdown';
import { useState } from 'react';
import './styleTable.css';

const TableStudentRetention: React.FC = () => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<DropdownOption | null>(null);
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<DropdownOption | null>(null);
  const yearOptions: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];
  const gradeOptions: DropdownOption[] = [
    { label: 'Khối 10', value: 'grade-1' },
    { label: 'Khối 11', value: 'grade-2' },
    { label: 'Khối 12', value: 'grade-3' },
  ];

  const block: DropdownOption[] = [
    { label: 'Học kì 1', value: 'block-1' },
    { label: 'học kì 2', value: 'block-2' },
  ];
  return (
    <>
      <div className="flex justify-end gap-4 items-end mr-7 pr-7 pb-8">
        {/* Chọn niên khóa */}
        <div className="flex flex-col">
          <span className="mb-1 font-medium">Chọn niên khóa</span>
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)}
          />
        </div>

        {/* Chọn khối */}
        <div className="flex flex-col">
          <span className="mb-1 font-medium">Chọn khối</span>
          <Dropdown
            placeholder="Chọn khối"
            size="short"
            options={gradeOptions}
            selectedOption={selectedGradeOption}
            onSelect={(option) => setSelectedGradeOption(option)}
            handleOptionClick={(option) => setSelectedGradeOption(option)}
          />
        </div>

        {/* Chọn học kì */}
        <div className="flex flex-col">
          <span className="mb-1 font-medium">Chọn học kì</span>
          <Dropdown
            placeholder="Học kì"
            size="short"
            options={block}
            selectedOption={selectedBlock}
            onSelect={(option) => setSelectedBlock(option)}
            handleOptionClick={(option) => setSelectedBlock(option)}
          />
        </div>

        {/* Nút tìm kiếm - Cùng hàng với Dropdown */}
        <button className="w-[130px] h-[41px] bg-[#FF7506] text-white rounded-md hover:bg-[#e66905] transition">Tìm kiếm</button>
      </div>
      <div className="TableStudentRetentionsBoder">
        <div className="TableStudentRetentions">
          <div className="TableStudentRetention-Body">
            <TableBody />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableStudentRetention;
