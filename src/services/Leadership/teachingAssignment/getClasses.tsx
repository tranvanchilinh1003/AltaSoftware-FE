import { fetchInstance } from "../../../config";

export const getClasses = async () => {
    return await fetchInstance.get(`/class`);
};
