import React from 'react';

interface ScoreRow {
  subject: string;
  scores: number[];
  average: number;
}

interface SemesterScoreTableProps {
  data: ScoreRow[];
}

const SemesterScoreTable: React.FC<SemesterScoreTableProps> = ({ data }) => {
  return (
    <table className="w-full mt-4 border-collapse shadow-custom rounded-lg">
      <thead>
        <tr className="bg-icon-color text-white">
          <th className="border rounded-tl-lg p-2 font-Mulish text-Mulish-4">Môn học</th>
          <th className="p-2 font-Mulish text-Mulish-4">Chuyên cần</th>
          <th className="p-2 font-Mulish text-Mulish-4">Kiểm tra đầu giờ</th>
          <th className="p-2 font-Mulish text-Mulish-4">15 phút</th>
          <th className="p-2 font-Mulish text-Mulish-4">45 phút</th>
          <th className="p-2 font-Mulish text-Mulish-4">Cuối kỳ</th>
          <th className="border rounded-tr-lg p-2 font-Mulish text-Mulish-4">Điểm trung bình</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="text-center">
            <td className="border-r border-b-0 p-3 font-Source-Sans-Pro">{row.subject}</td>
            {row.scores.map((score, idx) => (
              <td key={idx} className="border-b-0 p-3 font-Source-Sans-Pro">
                {score}
              </td>
            ))}
            <td className={`border-l border-b-0 p-3 font-Source-Sans-Pro ${row.average >= 7 ? 'text-green-500' : 'text-red-500'}`}>{row.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SemesterScoreTable;
