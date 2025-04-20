import { fetchInstance } from "../../../config";

export const deleteTeachingAssignment = async (ids: number[]) => {
    const idsParam = ids.map(id => `ids=${id}`).join("&"); 
    return await fetchInstance.delete(`/teaching-assignments?${idsParam}`);
};


