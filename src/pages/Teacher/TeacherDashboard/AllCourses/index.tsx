import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import DynamicAccordion from '../../../../components/DynamicAccordion';
import { IconChevronBigRightOrange, IconChevronBigRightWhite } from '../../../../components/Icons';
import CourseList from './CourseList';
import { SemesterData } from '../AllCourses/types';

const API_URL = 'https://fivefood.shop/api/semesters/course?page=1&pageSize=1111&sortOrder=asc';

const AllCourses = () => {
  const [data, setData] = useState<SemesterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['accessToken']); // 🔹 Lấy token từ cookie

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.accessToken; // 🔹 Lấy token từ cookie
        if (!token) {
          throw new Error('Không tìm thấy token, vui lòng đăng nhập lại');
        }

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔹 Gửi token trong header
          },
          //   withCredentials: true,
        });

        console.log('Response API:', response);

        if (response.data.code === 0 && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item: any) => ({
            semester: item.semester,
            subjects: item.courses.map((course: any) => ({
              id: `${item.id}-${course.subject}`,
              title: course.subject,
              details: {
                class: course.class,
                schedule: course.schedule,
                dateRange: course.date,
                status: course.status,
              },
            })),
          }));
          setData(formattedData);
        } else {
          throw new Error('Dữ liệu API không đúng định dạng');
        }
      } catch (err: any) {
        console.error('Lỗi khi gọi API:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.accessToken]); // 🔹 Tự động gọi API khi token thay đổi

  return (
    <section>
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <DynamicAccordion
          items={data}
          getId={(item) => item.semester}
          multiple={false}
          renderHeader={(item, isOpen) => (
            <>
              {isOpen ? (
                <IconChevronBigRightWhite className="text-xs md:text-sm lg:text-base text-white" />
              ) : (
                <IconChevronBigRightOrange className="text-xs md:text-sm lg:text-base text-orange-text" />
              )}
              <span className="font-semibold text-start text-xs md:text-sm lg:text-base">{item.semester}</span>
            </>
          )}
          renderContent={(item) => <CourseList subjects={item.subjects || []} />}
        />
      )}
    </section>
  );
};

export default AllCourses;
