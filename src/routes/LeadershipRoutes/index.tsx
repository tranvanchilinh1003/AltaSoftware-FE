import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Leadership/Dashboard';
import AllStudentProfiles from '../../pages/Leadership/AllStudentProfiles';
import ClassTransferMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ClassTransferMethod';
import ExemptionMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ExemptionMethod';
import ReservationMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ReservationMethod';
import SchoolTransferMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/SchoolTransferMethod';
import DisciplinaryMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/DisciplinaryMethod';
import RewardMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/RewardMethod';
import AllTeacherProfiles from '../../pages/Leadership/AllTeacherProfiles';
import TransferAcceptance from '../../pages/Leadership/TransferAcceptance';
import DeclareData from '../../pages/Leadership/DeclareData/DataList/Datalist';
import Exams from '../../pages/Leadership/Exams';
import ExamClassList from '../../pages/Leadership/Exams/ExamClassList/ExamClassList';
import ScoreBoard from '../../pages/Leadership/Exams/ScoreBoard/ScoreBoard';
import StudentRetention from '../../pages/Leadership/StudentRetention';
import SystemSettings from '../../pages/Leadership/SystemSettings';
import TeachingAssignment from '../../pages/Leadership/TeachingAssignment';
import SchoolYearAdd from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearAdd';
import SchoolYearEditPages from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages';
import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable';
// import SchoolYearAdd from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearAdd/main';
import MainSchoolYearAdd from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearAdd';
// import SchoolYearEditPages from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages/main';
import MainSchoolYearEditPages from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages';
// import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable/main';
import MainSchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable';
import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';
import DepartmentSettings from '../../pages/Leadership/DeclareData/SetupDepartmentModal';
import SubjectList from '../../pages/Leadership/DeclareData/SubjectList/subject';
import BlockDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/bockDepartment';
// import AddDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/add';
import ClassListWrapper from '../../pages/Leadership/DeclareData/BlockDepartment/ClassListWrapper';
import EditDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/edit';

import ScoreTypes from '../../pages/Leadership/DeclareData/ScoreTypes/ScoreTypes';
import EditGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/edit';
import AddGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/add';
// import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';

// import ScoreTypes from '../../pages/Leadership/DeclareData/ScoreTypes/ScoreTypes';
// import EditGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/edit';
// import AddGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/add';
// import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';

// import EditGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/edit';
// import AddGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/add';

import SectionList from '../../pages/Leadership/DeclareData/SectionList/SectionList';
import SubjectSetup from '../../pages/Leadership/DeclareData/SubjectSettings/subjectedit';
import NewClass from '../../pages/Leadership/DeclareData/ClassList/NewClass';
import UpdateClass from '../../pages/Leadership/DeclareData/ClassList/UpdateClass';

import TableClassList from '../../pages/Leadership/DeclareData/ClassList/TableClassList';
import ClassDetail from '../../pages/Leadership/DeclareData/ClassList/ClassDetail';
import Uploadfile from '../../pages/Leadership/DeclareData/ClassList/Uploadfile';
import ResignationForm from '../../pages/Leadership/AllTeacherProfiles/ResignationForm/ResignationForm';
import LeaveUpdateModal from '../../pages/Leadership/AllTeacherProfiles/UpdateLeave/UpdateLeave';
import RetirementUpdateModal from '../../pages/Leadership/AllTeacherProfiles/RetirementFrom/RetirementForm';
import StudentCU from '../../pages/Leadership/StudentCUD/StudentCU';
import StudyProcess from '../../pages/Leadership/StudyProcess';
import UpdateRewards from '../../pages/Leadership/StudyProcess/UpdateRewards';
import UpdateDiscipline from '../../pages/Leadership/StudyProcess/UpdateDiscipline';
import TestManagement from '../../pages/Leadership/Exams/TestManagement/TestManagement';
import DetailTestManagement from '../../pages/Leadership/Exams/TestManagement/DetailTestManagement';
import ExamDetailModal from '../../pages/Leadership/Exams/ExamsDeTai';
import EditExamSchedule from '../../pages/Leadership/Exams/EditExams/edit';
import ExamListTable from '../../pages/Leadership/Exams/ExamListTable';
import CreateExamSchedule from '../../pages/Leadership/Exams/CreateExamSchedule/CreateExamSchedule';

import StudentRetensionUpdate from '../../pages/Leadership/StudentRetention/StudentRetensionUpdate';
import StudentRetentionAdd from '../../pages/Leadership/StudentRetention/StudentRetentionAdd';
import AddTransferAcceptance from '../../pages/Leadership/TransferAcceptance/AddTransferAcceptance';
import UpdateTransferAcceptance from '../../pages/Leadership/TransferAcceptance/UpdateTransferAcceptance';
import ListTopic from '../../pages/Leadership/TeachingAssignment/DsChiDe';
import Config from '../../pages/Leadership/SystemSettings/Config';
import SchoolInfo from '../../pages/Leadership/SystemSettings/SchoolInfomation';
import EditSchoolInFo from '../../pages/Leadership/SystemSettings/SchoolInfomation/EditInformation';

import TrainingLevelManagement from '../../pages/Leadership/SystemSettings/TrainingLevelManagement';
import AddForm from '../../pages/Leadership/SystemSettings/TrainingLevelManagement/addPeachLevel';
import UpdateForm from '../../pages/Leadership/SystemSettings/TrainingLevelManagement/updatePeachLevel';
import UserManagement from '../../pages/Leadership/SystemSettings/UserManagement';
import SettingForm from '../../pages/Leadership/SystemSettings/UserManagement/addSetting';
import SubjectManagement from '../../pages/Leadership/SystemSettings/SubjectManagement';
import ClassroomSettings from '../../pages/Leadership/ClassroomSettings/classroomsettings';
import AddWorkProcess from '../../pages/Leadership/AllTeacherProfiles/Workprocess/AddWorkProcess';
import AddTrainingProgram from '../../pages/Leadership/TrainingInfo/AddTraining';
import InstructorProfile from '../../pages/Leadership/AllTeacherProfiles/InstructorProfile';
import TestComponent from '../../pages/Leadership/TestComponent';
import MainNewClassForm from '../../pages/Leadership/DeclareData/ClassList/NewClass';
import MainUpdatelassForm from '../../pages/Leadership/DeclareData/ClassList/UpdateClass';
import MainClassList from '../../pages/Leadership/DeclareData/ClassList';
import MainBlockDepartment from '../../pages/Leadership/DeclareData/BlockDepartment';
import MainSectionList from '../../pages/Leadership/DeclareData/SectionList/SectionListData';
import MainSetupSubjectedit from '../../pages/Leadership/DeclareData/SubjectSettings/SubjecteditData';
import MainScoreType from '../../pages/Leadership/DeclareData/ScoreTypes';
import EditWorkProcess from '../../pages/Leadership/AllTeacherProfiles/Workprocess/EditWorkProcess';
import AddTeacher from '../../pages/Leadership/AllTeacherProfiles/AddTeacher/Addteacher';
import MainSetupDepartmentModal from '../../pages/Leadership/DeclareData/SetupDepartmentModal';
import AddDepartmentSettings from '../../pages/Leadership/DeclareData/AddSubjectGroup/AddSubjectGroup';
import MainAddSubjectGroup from '../../pages/Leadership/DeclareData/AddSubjectGroup';
import MainAddSubject from '../../pages/Leadership/DeclareData/AddSubject';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="leadership" />}>
        <Route index element={<Dashboard />} />
        <Route path="all-student-profiles" element={<AllStudentProfiles />} />
        {/*Group-3 All student */}
        <Route path="all-teacher-profiles" element={<AllTeacherProfiles />} />
        <Route path="all-teacher-profiles/resignation/:id" element={<ResignationForm />} />
        <Route path="all-teacher-profiles/stop-working/:id" element={<LeaveUpdateModal />} />
        <Route path="all-teacher-profiles/retirement/:id" element={<RetirementUpdateModal />} />
        <Route path="all-teacher-profiles/AddTeacher" element={<AddTeacher />} />
        {/*  */}
        {/*Group-3 All student */}
        <Route path="all-student-profiles" element={<AllStudentProfiles />} />
        {/*  */}
        {/*all-student-profiles*/}
        <Route path="all-student-profiles/*" element={<AllStudentProfiles />} />
        <Route path="all-student-profiles/class-transfer-method" element={<ClassTransferMethod />} />
        <Route path="all-student-profiles/exemption-method" element={<ExemptionMethod />} />
        <Route path="all-student-profiles/reservation-method" element={<ReservationMethod />} />
        <Route path="all-student-profiles/school-transfer-method" element={<SchoolTransferMethod />} />
        <Route path="all-student-profiles/disciplinary-method" element={<DisciplinaryMethod />} />
        <Route path="all-student-profiles/reward-method" element={<RewardMethod />} />
        {/*all-teacher-profiles*/}
        <Route path="all-teacher-profiles" element={<AllTeacherProfiles />} />
        <Route path="all-teacher-profiles/addworkprocess" element={<AddWorkProcess />} />
        <Route path="all-teacher-profiles/editWorkProcess/:id" element={<EditWorkProcess />} />
        <Route path="transfer-acceptance" element={<TransferAcceptance />} />
        <Route path="InstructorProfile/:id" element={<InstructorProfile />} />
        <Route path="InstructorProfile" element={<InstructorProfile />} />
        {/*route cho school-year - group-4*/}
        <Route path="declare-data/school-year" element={<MainSchoolYear />} /> {/* url table niên khóa */}
        <Route path="declare-data/school-year/edit-school-year/:id" element={<MainSchoolYearEditPages />} /> {/* url sửa niên khóa */}
        <Route path="declare-data/school-year/add-school-year" element={<MainSchoolYearAdd />} /> {/* url thêm niên khóa */}
        {/* route cho class-list - group-4 */}
        <Route path="declare-data/class-list/add-class-list" element={<MainNewClassForm />} /> {/* url thêm lớp học */}
        <Route path="declare-data/update-class" element={<MainUpdatelassForm />} /> {/* url thiết lập lớp học */}
        <Route path="declare-data/class-list" element={<MainClassList />} />
        <Route path="declare-data/class-detail" element={<ClassDetail />} /> {/* url bảng ds lớp học */}
        <Route path="declare-data/file-class" element={<Uploadfile />} /> {/* url xuât file lớp học */}
        {/* route cho tiếp nhận chuyển trường và hồ sơ bảo lưu - group 4 */}
        <Route path="update-student-retention/:id" element={<StudentRetensionUpdate />} />
        <Route path="add-student-retention" element={<StudentRetentionAdd />} />
        <Route path="add-transfer-acceptance" element={<AddTransferAcceptance />} />
        <Route path="update-transfer-acceptance/:id" element={<UpdateTransferAcceptance />} />

        {/* route cho phân công giảng dạy và ds chủ đề - group 4 */}
        <Route path="teaching-assignment" element={<TeachingAssignment />} /> {/* url phân công giảng */}
        <Route path="teaching-list-topic" element={<ListTopic />} /> {/* url ds chủ đề */}
        {/*  */}
        {/* <Route path="declare-data" element={<DeclareData />} /> */}
        {/* Route cho block-department */}
        <Route path="declare-data/block-department" element={<MainBlockDepartment />} />
        {/* <Route path="declare-data/block-department/add" element={<AddDepartment />} /> */}
        <Route path="declare-data/block-department/list" element={<ClassListWrapper />} />
        <Route path="declare-data/block-department/:id" element={<EditDepartment />} />
        {/*  */}
        <Route path="declare-data/score-types" element={<MainScoreType />} />
        <Route path="declare-data/score-types/:id" element={<EditGradeTypeModal />} />
        <Route path="declare-data/score-types/add-score-types" element={<AddGradeTypeModal />} />
        <Route path="declare-data/edit/:id" element={<DepartmentSettings />} />
        <Route path="declare-data/add-declare-data" element={<MainAddSubjectGroup />} />
        <Route path="declare-data/section-list/add-section-list" element={<MainAddSubject />} />
        {/* <Route path="declare-data/*" element={<DeclareDataRoutes />} /> */}
        {/* <Route path="declare-data" element={<DeclareData />} /> */}
        {/* <Route path="declare-data/edit" element={<DepartmentSettings />} /> */}
        {/* <Route path="declare-data/subject-list" element={<SubjectList />} /> */}
        {/* <Route path="section-list" element={<SectionList />} /> */}
        {/* <Route path="section-list/edit" element={<SubjectSetup />} /> */}
        {/*Group-3 TestManagement */}
        <Route path="exams/*" element={<Exams />} />
        <Route path="exams/:id" element={<ExamClassList />} />
        <Route path="exams/:examId/scoreboard/:scoreboardId" element={<ScoreBoard />} />
        <Route path="exams/test-management" element={<TestManagement />} />
        <Route path="exams/test-management/:id" element={<DetailTestManagement />} />
        <Route path="exams/edit/:id" element={<EditExamSchedule />} />
        <Route path="exams/detail/:id" element={<ExamDetailModal />} />
        {/* <Route path="exams/list" element={<ExamListTable />} /> */}
        <Route path="exams/create-exam-schedule" element={<CreateExamSchedule />} />
        {/*  */}
        <Route path="" element={<StudentRetention />} />
        <Route path="systemstudent-retention-settings" element={<SystemSettings />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
        {/* <Route path="declare-data/*" element={<DeclareDataRoutes />} /> */}
        <Route path="declare-data" element={<DeclareData />} />
        {/* <Route path="declare-data/edit" element={<DepartmentSettings />} /> */}
        {/* <Route path="declare-data/subject-list" element={<SubjectList />} /> */}
        <Route path="declare-data/section-list" element={<MainSectionList />} />
        <Route path="declare-data/section-list/edit/:id" element={<MainSetupSubjectedit />} />
        <Route path="exams" element={<Exams />} />
        <Route path="student-retention" element={<StudentRetention />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="system-settings/training-level-management" element={<TrainingLevelManagement />} />
        <Route path="system-settings/training-level-management/add" element={<AddForm />} />
        <Route path="system-settings/training-level-management/edit/:id" element={<UpdateForm />} />
        <Route path="system-settings/user-management" element={<UserManagement />} />
        <Route path="system-settings/user-management/settings" element={<SettingForm />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
        <Route path="training-info/add/:id" element={<AddTrainingProgram />} />
        {/* */}
        <Route path="study-process" element={<StudyProcess />} />
        <Route path="study-process/update-rewards" element={<UpdateRewards />} />
        <Route path="study-process/update-discipline" element={<UpdateDiscipline />} />
        <Route path="new-student" element={<StudentCU/>} />
        <Route path="student" element={<StudentCU isUpdate={true}/>} />
        <Route path="system-settings/config" element={<Config />} />
        {/* Thiết lập lớp học */}
        <Route path="system-settings/subject-management" element={<SubjectManagement />} />
        <Route path="system-settings/classroom-settings" element={<ClassroomSettings />} />
        {/*Group - 1 setting*/}
        <Route path="system-settings/school-info" element={<SchoolInfo />} />
        <Route path="system-settings/school-info/edit" element={<EditSchoolInFo />} />
        <Route path="system-settings/school-info" element={<SchoolInfo />} />
        <Route path="system-settings/school-info/edit" element={<EditSchoolInFo />} />
        <Route path="training-info/add" element={<AddTrainingProgram />} />
        <Route path="test-component" element={<TestComponent />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
