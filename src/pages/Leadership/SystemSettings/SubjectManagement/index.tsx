import { useState } from 'react';
import SubjectManagementHeader from './header';
import SubjectManagementTable from './table';
import { DropdownOption } from '../../../../components/Dropdown/type';

const SubjectManagement: React.FC = () => {
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleAddedSubject = () => {
    setReloadTrigger((prev) => !prev); // Trigger reload
  };

  return (
    <div className="student-retention">
      <SubjectManagementHeader
        selectedYearOption={selectedYearOption}
        setSelectedYearOption={setSelectedYearOption}
        onSubjectAdded={handleAddedSubject}
      />

      <div className="content">
        <SubjectManagementTable selectedYearOption={selectedYearOption} reloadTrigger={reloadTrigger} />
      </div>
    </div>
  );
};

export default SubjectManagement;
