import { fetchInstance } from "../../../config";
import { AcademicYearResponse } from "../../../types/Leadership/teachingAssignment/academicYears.types";

export const getAcademicYears = async (): Promise<AcademicYearResponse> => {
    try {
        const response = await fetchInstance.get("/academic-years");
        const data = response.data;
        if (Array.isArray(data)) {
            return { code: 0, message: "Success", data, totalItems: data.length };
        }
        return data as AcademicYearResponse;
    } catch (error: any) {
        console.error("Error fetching academic years:", error);
        return {
            code: -1,
            message: error.message || "Lỗi không xác định",
            data: [],
            totalItems: 0
        };
    }
};

