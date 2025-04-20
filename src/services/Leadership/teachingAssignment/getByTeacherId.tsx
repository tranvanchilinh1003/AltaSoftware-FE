import { fetchInstance } from "../../../config";

export const getByTeacherId = async (teacherId: number, page: number = 1, pageSize: number = 10) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortColumn: "Id",
        sortOrder: "asc",
        teacherId: teacherId.toString(),
    }).toString();

    return await fetchInstance.get(`/teaching-assignments/getByTeacherId?${queryParams}`);
};
