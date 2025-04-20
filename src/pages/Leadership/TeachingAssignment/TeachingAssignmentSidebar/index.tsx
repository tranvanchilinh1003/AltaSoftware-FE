import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { FilterState } from "../../../../types";
import useFetchLecturerAssignments from "../hooks/useFetchLecturerAssignments";
import TeachingAssignmentFilter from "../TeachingAssignmentFilter/teachingAssignmentFilter";
import TeachingAssignmentSidebarLoadingSkeleton from "../TeachingAssignmentList/TeachingLoadingSkeleton/teachingAssignmentSidebarLoadingSkeleton";
import NoData from "../TeachingAssignmentNoData/NoDataLecturerAssgnmemnts";

const TeachingAssignmentSidebar = ({ onChange }: { onChange: (lecturerId: number | null) => void }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const [filters, setFilters] = useState<FilterState>({
        academicYear: queryParams.academicYear
            ? {
                id: Number(queryParams.academicYear),
                name: null,
                startTime: '',
                endTime: '',
                semesters: null
            }
            : null,
        subjectGroup: queryParams.subjectGroup
            ? {
                id: Number(queryParams.subjectGroup),
                name: '',
                teacherId: 0,
                teacher: null
            }
            : null,
    });

    useEffect(() => {
        const newFilters: FilterState = {
            academicYear: queryParams.academicYear
                ? {
                    id: Number(queryParams.academicYear),
                    name: null,
                    startTime: '',
                    endTime: '',
                    semesters: null
                }
                : null,
            subjectGroup: queryParams.subjectGroup
                ? {
                    id: Number(queryParams.subjectGroup),
                    name: '',
                    teacherId: 0,
                    teacher: null
                }
                : null,
        };
        setFilters(newFilters);
    }, [location.search, queryParams.academicYear, queryParams.subjectGroup]);

    const academicYearId = filters.academicYear?.id ? Number(filters.academicYear.id) : undefined;
    const subjectGroupId = filters.subjectGroup?.id ? Number(filters.subjectGroup.id) : undefined;
    const shouldFetch = !!(academicYearId && subjectGroupId);

    const { data: lecturers, loading, pageSize, refetchData } = useFetchLecturerAssignments(
        1,
        10,
        shouldFetch ? academicYearId : undefined,
        shouldFetch ? subjectGroupId : undefined
    );
    useEffect(() => {
        if (shouldFetch) {
            refetchData();
        }
    }, [shouldFetch, refetchData]);

    const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);
    const [selectedLecturerName, setSelectedLecturerName] = useState<string | null>(null);

    useEffect(() => {
        const newQueryParams: any = {};
        if (filters.academicYear?.id) newQueryParams.academicYear = filters.academicYear.id;
        if (filters.subjectGroup?.id) newQueryParams.subjectGroup = filters.subjectGroup.id;

        navigate({
            pathname: window.location.pathname,
            search: queryString.stringify(newQueryParams),
        });
    }, [filters, navigate]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleSelectLecturer = (lecturerId: number) => {
        setSelectedLecturerId(lecturerId);
        const selectedLecturer = lecturers.find((lecturer) => lecturer.id === lecturerId);
        setSelectedLecturerName(selectedLecturer ? selectedLecturer.user.fullName : null);
        onChange(lecturerId);
    };

    return (
        <aside className="text-white bg-white">
            <TeachingAssignmentFilter filters={filters} onChange={handleFiltersChange} selectedLecturerName={selectedLecturerName} />
            {loading ? (
                <TeachingAssignmentSidebarLoadingSkeleton pageSize={pageSize ?? 10} />
            ) : (
                Array.isArray(lecturers) && lecturers.length > 0 ? (
                    lecturers.map((lecturer) => (
                        <button
                            key={lecturer.id}
                            className={`block w-full text-left p-3 mt-2 text-black rounded-lg border
                                ${selectedLecturerId === lecturer.id
                                    ? "bg-orange-500 text-white border-orange-700"
                                    : "bg-orange-50 border-orange-500"}`}
                            onClick={() => handleSelectLecturer(lecturer.id)}
                        >
                            {lecturer.user.fullName}
                        </button>
                    ))
                ) : (
                            <NoData message="Không có giảng viên nào phù hợp." />
                )
            )}
        </aside>
    );
};

export default TeachingAssignmentSidebar;
