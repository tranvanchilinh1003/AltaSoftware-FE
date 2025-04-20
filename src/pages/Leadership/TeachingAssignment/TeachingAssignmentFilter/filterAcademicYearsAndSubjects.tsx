import React, { useState, useEffect } from 'react';
import { AcademicYear, FilterState, SubjectGroup } from '../../../../types';
import useFetchAcademicYears from '../hooks/useFetchAcademicYears';
import useFetchSubjects from '../hooks/useFetchSubjects';
import SelectDropdown from '../../../../components/SelectDropdown';

interface FilterAcademicYearsAndSubjectsProps {
  filters: FilterState;
  onAcademicYearChange?: (selectedAcademicYear: AcademicYear | null) => void;  // Cho phép null
  onSubjectChange?: (selectedSubject: SubjectGroup | null) => void;  
  selectedLecturerName?: string | null;
}

const FilterAcademicYearsAndSubjects: React.FC<FilterAcademicYearsAndSubjectsProps> = ({
  filters,
  onAcademicYearChange,
  onSubjectChange,
  selectedLecturerName,
}) => {
  const { data: academicYears = [] } = useFetchAcademicYears();
  const { data: subjectsGroup = [] } = useFetchSubjects();

  const initialAcademicYearId = filters.academicYear && 'id' in filters.academicYear ? filters.academicYear.id : null;
  const initialSubjectId = filters.subjectGroup && 'id' in filters.subjectGroup ? filters.subjectGroup.id : null;

  const [selectedAcademicYear, setSelectedAcademicYear] = useState<number | null>(initialAcademicYearId);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(initialSubjectId);

useEffect(() => {
    if (filters.academicYear && 'id' in filters.academicYear) {
      setSelectedAcademicYear(filters.academicYear.id);
    }
    if (filters.subjectGroup && 'id' in filters.subjectGroup) {
      setSelectedSubject(filters.subjectGroup.id);
    }
  }, [filters]);

  const handleAcademicYearChange = (newValue: string) => {
    const academicYear = academicYears.find((year) => year.id.toString() === newValue);
    if (academicYear) {
      setSelectedAcademicYear(academicYear.id);
      onAcademicYearChange?.(academicYear);
    } else {
      setSelectedAcademicYear(null); // Reset giá trị nếu không có lựa chọn
      onAcademicYearChange?.(null);  // Trigger clear action
    }
  };

  const handleSubjectChange = (newValue: string) => {
    const subject = subjectsGroup.find((sb) => sb.id.toString() === newValue);
    if (subject) {
      setSelectedSubject(subject.id);
      onSubjectChange?.(subject);
    } else {
      setSelectedSubject(null); // Reset giá trị nếu không có lựa chọn
      onSubjectChange?.(null);  // Trigger clear action
    }
  };


  return (
    <div className="bg-gray-900 p-4 rounded-t-lg">
      <h2 className="text-lg font-bold text-white">{selectedLecturerName ? `Giảng viên: ${selectedLecturerName}` : 'Chọn giảng viên'}</h2>
      <div className="mt-4">
        <label className="block text-sm text-white mb-2">Niên khóa</label>
        <SelectDropdown
          value={selectedAcademicYear?.toString() || ''}
          onChange={handleAcademicYearChange}
          placeholder="Chọn niên khóa"
          options={academicYears.map((ady) => ({ label: ady.name, value: ady.id.toString() }))}
          variant="flat"
          color="primary"
          radius="xs"
          clearIcon={!!selectedAcademicYear} // Set clearIcon to true if there's a value
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-white mb-2">Bộ Môn</label>
        <SelectDropdown
          value={selectedSubject?.toString() || ''}
          onChange={handleSubjectChange}
          placeholder="Chọn bộ môn"
          options={subjectsGroup.map((sb) => ({ label: sb.name, value: sb.id.toString() }))}
          variant="flat"
          color="primary"
          radius="xs"
          clearIcon={!!selectedSubject} // Set clearIcon to true if there's a value
        />
      </div>
    </div>
  );
};

export default FilterAcademicYearsAndSubjects;
