import { useState, useEffect, useRef } from "react";
import { getDetailTeachingById } from "../../../../services";
import { TeachingAssignmentDetail } from "../../../../types";

const useFetchTeachingAssignmentDetail = (assignmentId: number | null) => {
    const cache = useRef<Map<string, TeachingAssignmentDetail>>(new Map());

    const [data, setData] = useState<TeachingAssignmentDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (assignmentId === null) return;

        const cacheKey = `${assignmentId}`;

        if (cache.current.has(cacheKey)) {
            const cachedData = cache.current.get(cacheKey);
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
            }
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getDetailTeachingById(assignmentId);
                setData(response);
                cache.current.set(cacheKey, response);
            } catch (err) {
                setError("An error occurred while fetching the teaching assignment details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [assignmentId]);

    return { data, loading, error };
};

export default useFetchTeachingAssignmentDetail;
