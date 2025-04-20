import { fetchInstance } from "../../../config";

export const getTeachingAssignments = async (page: number, pageSize: number) => {
    return await fetchInstance.get(`/teaching-assignments/class-not-expired?page=${page}&pageSize=${pageSize}`);
};

