import { fetchInstance } from "../../../config";
import { TeachingAssignmentDetail } from "../../../types";

export const getDetailTeachingById = async (id: number): Promise<TeachingAssignmentDetail> => {
    try {
        const response = await fetchInstance.get(`/teaching-assignments/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch teaching assignment details");
    }
};
