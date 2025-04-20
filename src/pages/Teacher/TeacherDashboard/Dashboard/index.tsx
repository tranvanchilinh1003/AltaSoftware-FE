import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Chart from './Chart/Chart';
import './index.css';
const Dashboard = () => {
  const [cookies] = useCookies(['accessToken']);
  const [data, setData] = useState({
    totalCourses: 0,
    totalOnlineClasses: 0,
    totalPendingTests: 0,
    totalQA: 0,
  });

  // 👉 Thêm state để lưu dữ liệu của Chart
  const [chartData, setChartData] = useState([
    { name: 'Tổng số học sinh giỏi', value: 0 },
    { name: 'Tổng số học sinh khá', value: 0 },
    { name: 'Tổng số học sinh trung bình', value: 0 },
    { name: 'Yếu', value: 0 },
  ]);
  const [totalClasses, setTotalClasses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.accessToken;
        if (!token) {
          console.error('Không tìm thấy accessToken');
          return;
        }

        // 📌 Gọi API `overview`
        const overviewRes = await fetch('https://fivefood.shop/api/dashboard/overview', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!overviewRes.ok) throw new Error('Không thể lấy dữ liệu từ API overview');
        const overviewResult = await overviewRes.json();
        setData(overviewResult.data);

        // 📌 Gọi API `student-statistics`
        const statsRes = await fetch('https://fivefood.shop/api/dashboard/student-statistics', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!statsRes.ok) throw new Error('Không thể lấy dữ liệu từ API student-statistics');
        const statsResult = await statsRes.json();

        setTotalClasses(statsResult.data.totalClasses);
        setChartData([
          { name: 'Tổng số học sinh giỏi', value: statsResult.data.excellentStudents },
          { name: 'Tổng số học sinh khá', value: statsResult.data.goodStudents },
          { name: 'Tổng số học sinh trung bình', value: statsResult.data.averageStudents },
          { name: 'Yếu', value: statsResult.data.weakStudents },
        ]);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  return (
    <div>
      <div className="font-bold w-full rounded-xl p-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="custom-css-gird from-background-1 to-background-2">
            <h3 className="custom-text-title">Khóa học của tôi</h3>
            <p className="custom-text-data">{data.totalCourses}</p>
          </div>
          <div className="custom-css-gird from-background-6 to-background-blue-2">
            <h3 className="custom-text-title">Lớp học Online</h3>
            <p className="custom-text-data">{data.totalOnlineClasses}</p>
          </div>
          <div className="custom-css-gird from-background-4 to-background-3">
            <h3 className="custom-text-title">Bài kiểm tra chưa chấm</h3>
            <p className="custom-text-data">{data.totalPendingTests}</p>
          </div>
          <div className="custom-css-gird from-background-6 to-background-5">
            <h3 className="custom-text-title">Hỏi đáp Q & A</h3>
            <p className="custom-text-data">{data.totalQA}</p>
          </div>
        </div>
      </div>

      <h2 className="shadow-boxShadow text-xl font-semibold mb-0.5">Thống kê kết quả học tập của học viên</h2>
      <div className="bg-white w-full rounded-xl shadow-md p-4">
        {/* 📌 Truyền dữ liệu cho Chart */}
        <Chart data={chartData} totalClasses={totalClasses} />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-blue-500 to-blue-400"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh giỏi</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh khá</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-green-500 to-green-300"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh trung bình</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
