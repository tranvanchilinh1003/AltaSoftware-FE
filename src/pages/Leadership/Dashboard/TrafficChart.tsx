import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CalendarInput from '../../../components/CalendarInput';

const data = [
  { date: '31/01', visits: 5000 },
  { date: '01/02', visits: 8000 },
  { date: '02/02', visits: 4000 },
  { date: '03/02', visits: 7000 },
  { date: '04/02', visits: 8500 },
  { date: '05/02', visits: 4200 },
  { date: '06/02', visits: 9000 },
];

const TrafficChart: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date('2020-01-31'), end: new Date('2020-02-06') });

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-orange-600">Thống kê lượng truy cập</h2>
        <CalendarInput
          
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="visits" stroke="#CC5C00" fill="#FF7506" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;
