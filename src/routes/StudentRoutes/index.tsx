import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Student/Dashboard';
import ClassList from '../../pages/Student/ClassList';
import JoinClass from '../../pages/Student/JoinClass';
import TestList from '../../pages/Student/TestList';
import ScoreBoard from '../../pages/Student/ScoreBoard';
import ExamSchedule from '../../pages/Student/ExamSchedule';
import Notifications from '../../pages/Student/Notifications';
import Help from '../../pages/Student/Help';

import Login from '../../pages/Student/Login/Login';
import Questions from '../../pages/Student/Quiz/Questions';
import MyCourse from '../../pages/Student/MyCourse/Index';
import EssayPage from '../../pages/Student/TestList/essay';

import ExamInfo from '../../pages/Student/TestList/ExamInfo';
import HistoryClass from '../../pages/Student/ClassList/historyclass';
import AllScourses from '../../pages/Student/Dashboard/AllScourses';
import TestResults from '../../pages/Student/TestResults';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="student" />}>
        <Route index element={<Dashboard />} />
        <Route path="class-list" element={<ClassList />} />
        <Route path="join-class" element={<JoinClass />} />
        <Route path="test-list" element={<TestList />} />
        <Route path="score-board" element={<ScoreBoard />} />
        <Route path="score-board" element={<ScoreBoard />} />
        <Route path="exam-schedule" element={<ExamSchedule />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="class-history" element={<HistoryClass />} />
        <Route path="allScourses" element={<AllScourses />} />
        <Route path="help" element={<Help />} />
        <Route path="quiz" element={<Questions />} />
        <Route path="my-course" element={<MyCourse />} />
        <Route path="essay" element={<EssayPage />} />
        <Route path="test-results" element={<TestResults />} />
      </Route>
    </Routes>
  );
};
export default StudentRoutes;
