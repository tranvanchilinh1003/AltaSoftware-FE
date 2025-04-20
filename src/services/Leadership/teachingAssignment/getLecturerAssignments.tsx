import { fetchInstance } from "../../../config";
import { TeachingAssignmentsResponse } from "../../../types/Leadership/teachingAssignment/teachingAssignment.types";

export const getLecturerAssignments = async (
    page: number,
    pageSize: number,
    academicYearId?: number,
    subjectGroupId?: number
): Promise<TeachingAssignmentsResponse> => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    if (academicYearId) {
        queryParams.append("academicYearId", academicYearId.toString());
    }
    if (subjectGroupId) {
        queryParams.append("subjectGroupId", subjectGroupId.toString());
    }

    const response = await fetchInstance.get(
        `/teaching-assignments/getTeacherByAcademicYear-SubjectGroup?${queryParams}`
    );

    const data = response.data;
    if (Array.isArray(data)) {
        return {
            code: 0,
            message: "Success",
            data,
            totalItems: data.length,
            page,          
            pageSize,
            totalPages: Math.ceil(data.length / pageSize) // Thêm `totalPages`
        };
    }

    return data as TeachingAssignmentsResponse;
};
