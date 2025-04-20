import React from 'react';
import TitleComponent from '../../../components/Title';
import AllCourses from './AllCourses';
import Dashboard from './Dashboard';

const TeacherDashboard = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] pr-4  xl:grid-cols-[1fr_2fr] xl:gap-4">
      <div className="col-span-full xl:col-auto">
        <TitleComponent text="Tổng quan" size={30} weight="extrabold" className="" />
        <Dashboard />
      </div>
{/*  */}
      <div className="col-span-full xl:col-auto">
        <TitleComponent text="Tấc cả khóa học" size={30} weight="extrabold" className="mb-5" />
        <AllCourses />
      </div>
    </div>
  );
};

export default TeacherDashboard;
