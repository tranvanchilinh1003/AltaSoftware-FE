import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTeachingAssignments } from "../../../../services";
import { TeachingAssignment } from "../../../../types";
const useFetchTeachingAssignments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cache = useRef<Map<string, TeachingAssignment[]>>(new Map());

    const searchParams = new URLSearchParams(location.search);
    const initialPage = Number(searchParams.get("page")) || 1;
    const initialPageSize = Number(searchParams.get("pageSize")) || 8;

    const [data, setData] = useState<TeachingAssignment[]>([]);
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (page: number, pageSize: number, bypassCache = false) => {
        const cacheKey = `${page}-${pageSize}`;

        if (!bypassCache && cache.current.has(cacheKey)) {
            setData(cache.current.get(cacheKey) || []);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const result = await getTeachingAssignments(page, pageSize);
            console.log('Fetched data:', result.data);
            if (result.code === 0) {
                const filteredData = result.data.filter((item: TeachingAssignment) => item.active === true);
                cache.current.set(cacheKey, filteredData);
                console.log('Final filteredData:', filteredData);

                setData(filteredData);
                setTotalPages(result.totalPages);
            } else {
                throw new Error(result.message);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const refetchData = useCallback(() => {
        fetchData(page, pageSize, true);
    }, [page, pageSize]);
    useEffect(() => {
        fetchData(page, pageSize);
    }, [navigate, page, pageSize]);

    return { data, page, pageSize, totalPages, loading, error, setPage, setPageSize, refetchData };
};

export default useFetchTeachingAssignments;

