import { fetchInstance } from "../../../config";
import {
    TeachingAssignmentAddRequest,
    TeachingAssignmentAddResponse,
} from "../../../types";

export const createTeachingAssignment = async (data: TeachingAssignmentAddRequest): Promise<TeachingAssignmentAddResponse> => {
    const response = await fetchInstance.post(
        "/teaching-assignments",
        data
    );
    return response.data;

};
