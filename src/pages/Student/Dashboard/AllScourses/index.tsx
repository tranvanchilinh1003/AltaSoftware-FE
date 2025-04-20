import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import createAxiosInstance from '../../../../utils/axiosInstance';

const union = require('../../../../assets/icons/Union.png');

interface Course {
  name: string;
  class: string;
  day: string;
  time: string;
  duration: string;
  status: string;
}

interface Semester {
  name: string;
  courses: Course[];
}

const AllScourses = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get('https://fivefood.shop/api/semesters?page=1&pageSize=10&sortColumn=Id&sortOrder=asc');
        setSemesters(response.data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchSemesters();
  }, []);

  return (
    <div className="p-4">
      {semesters.map((semester, idx) => (
        <div key={idx} className="mb-6">
          <div className="p-3 font-bold rounded-md mb-2 bg-br-gradient-right-or text-white">{semester.name}</div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <tbody>
                {(semester.courses || []).map((course, index) => (
                  <tr key={index} className="border even:bg-gray-100">
                    <td className="p-2 h-16 text-black-text font-semibold">{course.name}</td>
                    <td className="p-2 h-12 text-gray-800">{course.class}</td>
                    <td className="p-2 h-12 text-gray-800">
                      {course.day} - {course.time}
                    </td>
                    <td className="p-2 h-12 text-gray-800">{course.duration}</td>
                    <td className={`p-2 h-12 italic ${course.status === 'Chưa hoàn thành' ? 'text-red-500' : 'text-green-500'}`}>{course.status}</td>
                    <td className="p-2 h-12">
                      <Link to="class-history">
                        <img className="w-6 h-6" src={union} alt="icon" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllScourses;
