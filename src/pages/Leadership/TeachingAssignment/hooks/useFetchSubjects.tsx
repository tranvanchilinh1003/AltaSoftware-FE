import { useEffect, useState, useCallback } from "react";
import { getSubjects } from "../../../../services";
import { SubjectResponse } from "../../../../types/Leadership/teachingAssignment/subjects.types";

const useFetchSubjects = () => {
    const [data, setData] = useState<SubjectResponse["data"]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retry, setRetry] = useState(0);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getSubjects();
            if (result.code === 0 && result.data.length > 0) {
                setData(result.data);
                setError(null);
            } else {
                setError(result.message || "Dữ liệu không hợp lệ hoặc trống.");
                setData([]);
            }
        } catch (err: any) {
            setError(err.message || "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData, retry]);

    return { data, loading, error, refetch: () => setRetry((prev) => prev + 1) };
};

export default useFetchSubjects;
