import React from "react";
import { FilterState, AcademicYear, SubjectGroup } from "../../../../types";
import FilterAcademicYearsAndSubjects from "./filterAcademicYearsAndSubjects";

interface TeachingAssignmentFilterProps {
    filters: FilterState;
    onChange?: (newFilters: FilterState) => void;
    selectedLecturerName?: string | null; // filter cho id của giang viên
}

const TeachingAssignmentFilter: React.FC<TeachingAssignmentFilterProps> = ({ filters, onChange = () => { }, selectedLecturerName }) => {
    const handleAcademicYearChange = (selectedAcademicYear: AcademicYear | null) => {
      const newFilters: FilterState = { ...filters, academicYear: selectedAcademicYear };
      onChange(newFilters);
    };

    const handleSubjectChange = (selectedSubject: SubjectGroup | null) => {
      const newFilters: FilterState = { ...filters, subjectGroup: selectedSubject };
      onChange(newFilters);
    };


    return (
        <div>
            <FilterAcademicYearsAndSubjects
                filters={filters}
                onAcademicYearChange={handleAcademicYearChange}
                onSubjectChange={handleSubjectChange}
                selectedLecturerName={selectedLecturerName ?? undefined}
            />
        </div>
    );
};

export default TeachingAssignmentFilter;
