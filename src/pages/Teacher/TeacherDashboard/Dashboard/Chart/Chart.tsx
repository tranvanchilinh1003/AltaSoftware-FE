import React from 'react';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';
import '../index.css';
const GRADIENTS = [
  ['#2F80ED', '#56CCF2'],
  ['#FDC830', '#F37335'],
  ['#45B649', '#DCE35B'],
  ['#9CA3AF', '#D1D5DB'],
];

interface ChartProps {
  data: { name: string; value: number }[];
  totalClasses: number;
}

const Chart: React.FC<ChartProps> = ({ data, totalClasses }) => {
  return (
    <div className="flex justify-between h-48 mt-5">
      <div className="w-[45%] flex flex-col justify-center items-center">
        <PieChart width={180} height={180}>
          <svg width="0" height="0">
            <defs>
              {GRADIENTS.map((colors, index) => (
                <linearGradient key={index} id={`gradientColor${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors[0]} />
                  <stop offset="100%" stopColor={colors[1]} />
                </linearGradient>
              ))}
            </defs>
          </svg>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              if (percent === 0) return null;
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={600}>
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={80}
            stroke="#fff"
            strokeWidth={6}
            dataKey="value"
            startAngle={300}
            endAngle={-60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradientColor${index})`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="w-[50%] flex flex-col justify-center gap-y-4">
        <div className="custom-line">
          Tổng số lớp: <span className="font-bold">{totalClasses}</span>
        </div>
        {data.map((item, index) => (
          <div key={index} className="custom-line">
            {item.name}: <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Chart;
