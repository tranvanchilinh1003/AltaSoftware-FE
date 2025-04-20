import React from 'react';

interface statusBarProps {
  status: number | null;

  width?: string;
  height?: string;
}
const StatusBar: React.FC<statusBarProps> = ({ status, height, width }) => {
  const color =
    status === 1 ? '#3CC13B' : status === 5 ? '#ED2025' : status === 2 ? '#0B80EC' : status === 3 ? '#0B80EC' : status === 4 ? '#373839' : '#ED2025';
  return (
    <div
      style={{ outlineStyle: 'solid' }}
      className={`flex items-center px-2 py-1 rounded-lg w-[${width ? width : '100px'}] h-[${
        height ? height : '100px'
      }] outline-1 outline-[${color}]`}
    >
      <div className="flex items-center space-x-2 font-medium pb-0">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[${color}] opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 bg-[${color}]`}></span>
        </span>
        <span className={`text-[${color}] font-medium`}>
          {status === 1
            ? 'Đang theo học'
            : status === 5
            ? 'Đã thôi học'
            : status === 2
            ? 'Đã tốt nghiệp'
            : status === 3
            ? 'Đã chuyển lớp'
            : status === 4
            ? 'Đã chuyển trường'
            : 'Đã thôi học'}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
