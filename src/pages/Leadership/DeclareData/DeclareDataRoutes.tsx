import { Routes, Route } from 'react-router-dom';
// import DeclareData from ".";
import BlockDepartment from './BlockDepartment/bockDepartment';
import EditDepartment from './BlockDepartment/edit';
import ClassListWrapper from './BlockDepartment/ClassListWrapper';
import SubjectSetup from './SubjectSettings/subjectedit';
import SectionList from './SectionList/SectionList';
import SubjectList from './SubjectList/subject';
import Departmentedit from './SetupDepartmentModal';
import Departmentlist from './DataList/Datalist';
const DeclareDataRoutes = () => {
  return (
    <Routes>
      <Route index element={<Departmentlist />} />
      <Route path="/block-department" element={<BlockDepartment />} />
      <Route path="/block-department/list" element={<ClassListWrapper />} />
      <Route path="/block-department/:id" element={<EditDepartment />} />
      <Route path="/department/list" element={<Departmentlist />} />
      <Route path="/department/edit" element={<Departmentedit />} />
      <Route path="/department/subject-list" element={<SubjectList />} />
      <Route path="/subject/list" element={<SectionList />} />
      <Route path="/subject/edit" element={<SubjectSetup />} />
    </Routes>
  );
};

export default DeclareDataRoutes;
