import { fetchInstance } from "../../../config";
import { TeachingAssignmentUpdate } from "../../../types";
export const updateTeachingAssignment = async (id: number, data: TeachingAssignmentUpdate) => {
    return await fetchInstance.put(`/teaching-assignments/${id}`, data);
};
