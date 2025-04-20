import { Routes, Route } from 'react-router-dom';
import ClassroomInfomation from '../../pages/Teacher/ClassList/ClassroomInfomation';
import CombinedSidebarQAContact from '../../pages/Teacher/ClassList/ClassroomInfomation/ClassroomInfomationQA';
import ClassroomInfomationHistory from '../../pages/Teacher/ClassList/ClassroomInfomation/ClassroomInfomationHistory';
import AddTopic from '../../pages/Teacher/QA/AddTopic';
import TeacherScoring from '../../pages/Teacher/TeacherScoring';
import Transcript from '../../pages/Teacher/Transcript';
import MainLayout from '../../layouts/MainLayout';
import TeacherDashboard from '../../pages/Teacher/TeacherDashboard';
import ClassList from '../../pages/Teacher/ClassList';
import AddClass from '../../pages/Teacher/AddClass';
import JoinClass from '../../pages/Teacher/JoinClass';
import TestList from '../../pages/Teacher/TestList';
import AddTest from '../../pages/Teacher/AddTest';
import ExamSchedule from '../../pages/Teacher/ExamSchedule';
import Notifications from '../../pages/Teacher/Notifications';
import Help from '../../pages/Teacher/Help';
import ClassDetail from '../../pages/Teacher/ClassList/ClassDetail/ClassDeatail';
import ClassInformation from '../../pages/Teacher/ClassList/ClassInformation/ClassInformation';

import Classroom from '../../pages/Teacher/ClassList/Classroom/index';
import TestContent from '../../pages/Teacher/TestList/TestContent/TestContent';

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="teacher" />}>
        <Route index element={<TeacherDashboard />} />
        {/* Group-3 Class Detail */}
        <Route path="class-list" element={<ClassList />} />
        {/* <Route path="class-list/:id" element={<ClassDetail />} /> */}
        {/*  */}
        <Route path="add-class" element={<AddClass />} />
        <Route path="join-class" element={<JoinClass />} />
        <Route path="test-list" element={<TestList />} />
        <Route path="add-test" element={<AddTest />} />
        <Route path="test-list/test-content/:id" element={<TestContent />} />
        {/* <Route path="enter-scores" element={<EnterScores />} />
        <Route path="score-board" element={<ScoreBoard />} /> */}
        <Route path="exam-schedule" element={<ExamSchedule />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="help" element={<Help />} />
        <Route path="classroom" element={<Classroom />} />
        <Route path="classroom-information" element={<ClassroomInfomation />}>
          <Route path="history" element={<ClassroomInfomationHistory />} />
          <Route path="qa" element={<CombinedSidebarQAContact />} />
        </Route>
        <Route path="add-topic" element={<AddTopic />} />
        <Route path="enter-scores" element={<TeacherScoring />} />
        <Route path="score-board" element={<Transcript />} />
        <Route path="classroom-detail/:id" element={<ClassDetail />} /> {/*Huu Phuc - teaching quản lý lớp học cho Link tới Quản lý lớp học Thông tin lớp học Lịch sử */}
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
