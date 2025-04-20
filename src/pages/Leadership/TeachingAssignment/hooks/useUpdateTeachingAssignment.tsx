import { useState } from "react";
import { updateTeachingAssignment } from "../../../../services";

import { TeachingAssignmentUpdate } from "../../../../types";

const useUpdateTeachingAssignment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateAssignment = async (id: number, data: TeachingAssignmentUpdate) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await updateTeachingAssignment(id, data);
            setSuccess(true);
        } catch (err) {
            setError("Lỗi khi cập nhật lịch giảng dạy.");
        } finally {
            setLoading(false);
        }
    };

    return { updateAssignment, loading, error, success };
};

export default useUpdateTeachingAssignment;
