import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DropdownOption } from '../../../components/Dropdown/type';
import Dropdown from '../../../components/Dropdown';

const data = [
    { name: '6A1', Gioi: 30, Kha: 20, TrungBinh: 15, Yeu: 10 },
    { name: '6A2', Gioi: 25, Kha: 18, TrungBinh: 12, Yeu: 8 },
    { name: '6A3', Gioi: 28, Kha: 22, TrungBinh: 14, Yeu: 9 },
    { name: '6A4', Gioi: 26, Kha: 20, TrungBinh: 13, Yeu: 7 },
    { name: '6A5', Gioi: 30, Kha: 24, TrungBinh: 16, Yeu: 11 },
    { name: '6A6', Gioi: 22, Kha: 17, TrungBinh: 10, Yeu: 6 },
    { name: '6A7', Gioi: 29, Kha: 23, TrungBinh: 15, Yeu: 10 },
    { name: '6A8', Gioi: 24, Kha: 19, TrungBinh: 14, Yeu: 9 },
  ];
const StatisticsChart = () => {
    const [selectedBlock, setSelectedBlock] = useState<DropdownOption | null>(null);
    const blockOptions: DropdownOption[] = [
        { label: 'Khối 6', value: '6' },
        { label: 'Khối 7', value: '7' },
      ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Thống kê kết quả học tập</h2>
        <Dropdown
          placeholder="Chọn khối"
          size="short"
          options={blockOptions}
          selectedOption={selectedBlock}
          onSelect={(option) => setSelectedBlock(option)}
          handleOptionClick={(option) => setSelectedBlock(option)}
        />
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barSize={20}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Gioi" fill="#C83901" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Kha" fill="#FF7506" radius={[10, 10, 0, 0]} />
          <Bar dataKey="TrungBinh" fill="#FFA75E" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Yeu" fill="#FFD8B8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default StatisticsChart;
