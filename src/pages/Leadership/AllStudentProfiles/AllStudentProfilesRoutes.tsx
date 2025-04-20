import { Routes, Route } from 'react-router-dom';
import ExemptionMethod from './table/bodyTable/ExemptionMethod';
import ReservationMethod from './table/bodyTable/ReservationMethod';
import ClassTransferMethod from './table/bodyTable/ClassTransferMethod';
import SchoolTransferMethod from './table/bodyTable/SchoolTransferMethod';
import DisciplinaryMethod from './table/bodyTable/DisciplinaryMethod';
import RewardMethod from './table/bodyTable/RewardMethod';
const DeclareDataRoutes = () => {
  return (
    <Routes>
      <Route path="class-transfer-method" element={<ClassTransferMethod />} />
      <Route path="exemption-method" element={<ExemptionMethod />} />
      <Route path="reservation-method" element={<ReservationMethod />} />
      <Route path="school-transfer-method" element={<SchoolTransferMethod />} />
      <Route path="disciplinary-method" element={<DisciplinaryMethod />} />
      <Route path="reward-method" element={<RewardMethod />} />
    </Routes>
  );
};

export default DeclareDataRoutes;
