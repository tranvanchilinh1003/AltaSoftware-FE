import { useState } from "react";
import Dropdown from "../../../components/Dropdown";
import { DropdownOption } from "../../../components/Dropdown/type";

const StudentCount = () => {
    const [selectedGrant, setSelectedGrant] = useState<DropdownOption | null>(null);
    const grantOptions: DropdownOption[] = [
        { label: 'THCS', value: '1' },
        { label: 'THPT', value: '2' },
        { label: 'CH', value: '3' },
      ];
      const studentCounts = [
        { grade: 'Khối 6', count: 2000 },
        { grade: 'Khối 7', count: 1800 },
        { grade: 'Khối 8', count: 1900 },
        { grade: 'Khối 9', count: 1700 },
      ];
      
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Số lượng học viên</h2>
          <Dropdown
              placeholder="THCS"
              size="short"
              options={grantOptions}
              selectedOption={selectedGrant}
              onSelect={(option) => setSelectedGrant(option)}
              handleOptionClick={(option) => setSelectedGrant(option)}
            />
        </div>
        {studentCounts.map((item) => (
          <div key={item.grade} className="mb-3">
            <div className="flex justify-between">
              <p className="text-sm font-medium" style={{ color: "#373839" }}>{item.grade}</p>
              <p className="text-sm font-medium" style={{ color: "#C9C4C0" }}>{item.count}</p>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: `${(item.count / 2000) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default StudentCount;