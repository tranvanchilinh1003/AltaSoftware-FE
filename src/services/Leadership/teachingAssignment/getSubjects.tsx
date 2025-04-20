import { fetchInstance } from "../../../config";
import { SubjectResponse } from "../../../types/Leadership/teachingAssignment/subjects.types";

export const getSubjects = async (): Promise<SubjectResponse> => {
    try {
        const response = await fetchInstance.get("/subject-groups");
        const data = response.data;
        if (Array.isArray(data)) {
            return { code: 0, message: "Success", data, totalItems: data.length };
        }
    } catch (error: any) {
        return {
            code: -1,
            message: error.message || "Lỗi không xác định",
            data: [],
            totalItems: 0
        };
    }

    // Trả về mặc định nếu dữ liệu không hợp lệ
    return { code: -2, message: "Invalid data format", data: [], totalItems: 0 };
};

