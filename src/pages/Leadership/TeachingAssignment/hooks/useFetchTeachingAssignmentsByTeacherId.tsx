import { useState, useEffect, useRef, useCallback } from "react";
import { getByTeacherId } from "../../../../services/Leadership/teachingAssignment/getByTeacherId";
import { TeachingAssignment, TeachingAssignmentsResponse } from "../../../../types";

import { useNavigate } from "react-router-dom";

const useFetchTeachingAssignmentsByTeacherId = (
    teacherId: number | null,
    page: number = 1,
    pageSize: number = 10
) => {
    const navigate = useNavigate();
    const cache = useRef<Map<string, TeachingAssignmentsResponse>>(new Map());

    const [data, setData] = useState<TeachingAssignmentsResponse["data"]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [currentPageSize, setCurrentPageSize] = useState<number>(pageSize);

    const fetchData = useCallback(
        async (bypassCache = false) => {
            if (teacherId === null) return;

            const cacheKey = `${teacherId}-${currentPage}-${currentPageSize}`;

            // Kiểm tra cache, trừ khi bỏ qua cache
            if (!bypassCache && cache.current.has(cacheKey)) {
                const cachedData = cache.current.get(cacheKey);
                if (cachedData) {
                    setData(cachedData.data);
                    setTotalPages(cachedData.totalPages);
                    setLoading(false);
                }
                return;
            }

            // Gọi API để lấy dữ liệu mới
            setLoading(true);
            try {
                const response = await getByTeacherId(teacherId, currentPage, currentPageSize);
                const filteredData = response.data.filter((item: TeachingAssignment) => item.active);
                setData(filteredData);
                setTotalPages(response.totalPages);


                cache.current.set(cacheKey, { ...response, data: filteredData });
            } catch (err) {
                setError("An error occurred while fetching the data.");
            } finally {
                setLoading(false);
            }
        },
        [teacherId, currentPage, currentPageSize]
    );

    const refetchData = useCallback(() => {
        fetchData(true);
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData, navigate]);

    const setPage = (page: number) => {
        setCurrentPage(page);
    };

    const setPageSize = (size: number) => {
        setCurrentPage(1);
        setCurrentPageSize(size);
    };

    return {
        data,
        loading,
        error,
        totalPages,
        page: currentPage,
        pageSize: currentPageSize,
        setPage,
        setPageSize,
        refetchData,
    };
};

export default useFetchTeachingAssignmentsByTeacherId;
