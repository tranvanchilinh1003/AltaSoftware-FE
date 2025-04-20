import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'đúng', value: 80 },
  { name: 'sai', value: 20 },
];

const GRADIENTS = [
  ['#2F80ED', '#56CCF2'],
  ['#FDC830', '#F37335'],
];

const ScoreCard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-orange-300 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-Mulish text-center mb-4 text-gray-800 mb-20" style={{fontSize: "28px"}}>Tổng điểm kiểm tra</h2>
      <div className="flex items-center w-full justify-between px-8">
        {/* Pie Chart */}
        <div className="w-36 h-36 relative">
          <PieChart width={180} height={180} className="bottom-[35px]">
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
        {/* Score Details */}
        <div className="grid grid-cols-4 gap-6 w-full text-center">
          <div>
            <p className="text-orange-500 text-2xl font-bold" style={{fontSize: "48px"}}>8.0/10</p>
            <p className="text-gray-800 font-semibold" style={{fontSize: "28px"}}>Tổng điểm</p>
          </div>
          <div className="border-l-2 border-orange-400 pl-4">
            <p className="text-orange-500 text-lg font-bold" style={{fontSize: "36px"}}>Tổng 20</p>
            <p className="text-gray-700" style={{fontSize: "18px"}}>Câu trắc nghiệm</p>
          </div>
          <div className="border-l-2 border-blue-400 pl-4">
            <p className="text-blue-500 text-lg font-bold" style={{fontSize: "36px"}}>16</p>
            <p className="text-gray-700" style={{fontSize: "18px"}}>Đáp án đúng</p>
          </div>
          <div className="border-l-2 border-orange-400 pl-4">
            <p className="text-orange-500 text-lg font-bold" style={{fontSize: "36px"}}>04</p>
            <p className="text-gray-700" style={{fontSize: "18px"}}>Đáp án sai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
