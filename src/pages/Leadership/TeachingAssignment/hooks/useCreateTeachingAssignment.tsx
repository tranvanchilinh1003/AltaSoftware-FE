import { useState } from 'react';
import { createTeachingAssignment } from '../../../../services';
import { TeachingAssignmentAddRequest, TeachingAssignmentAddResponse } from '../../../../types';

const useCreateTeachingAssignment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [createdAssignment, setCreatedAssignment] = useState<TeachingAssignmentAddResponse | null>(null);

    const createAssignment = async (data: TeachingAssignmentAddRequest) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await createTeachingAssignment(data);
            setCreatedAssignment(response);
            setSuccess(true);
        } catch (err) {
            setError('Lỗi khi tạo lịch giảng dạy.');
        } finally {
            setLoading(false);
        }
    };

    return {
        createAssignment,
        createdAssignment,
        loading,
        error,
        success,
    };
};

export default useCreateTeachingAssignment;
