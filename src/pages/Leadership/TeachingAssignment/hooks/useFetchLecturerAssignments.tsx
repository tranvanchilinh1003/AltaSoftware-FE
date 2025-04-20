import { useEffect, useRef, useState, useCallback } from "react";
import { getLecturerAssignments } from "../../../../services";
import { TeachingAssignment } from "../../../../types/Leadership/teachingAssignment/teachingAssignment.types";

const useFetchLecturerAssignments = (page: number, pageSize: number, academicYearId?: number, subjectGroupId?: number) => {
    const cache = useRef<Map<string, TeachingAssignment[]>>(new Map());

    const [data, setData] = useState<TeachingAssignment[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [finalPageSize, setFinalPageSize] = useState<number>(pageSize ?? 10);

    const fetchData = useCallback(async () => {
        const cacheKey = `${page}-${pageSize}-${academicYearId}-${subjectGroupId ?? undefined}`;

        if (cache.current.has(cacheKey)) {
            setData(cache.current.get(cacheKey) || []);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const result = await getLecturerAssignments(page, pageSize, academicYearId, subjectGroupId);
            if (result.code === 0) {
              // Lọc active === true
              const activeLecturers = result.data.filter((lecturer: TeachingAssignment) => lecturer.active === true);

              // Loại bỏ các bản ghi trùng lặp dựa trên user.id
              // Chỉ trả về danh sách giảng viên hoạt động mà không loại bỏ trùng
                //  const uniqueLecturers = activeLecturers.filter(
                //    (lecturer, index, self) => index === self.findIndex((item) => item.user.id === lecturer.user.id),
                //  );

              const uniqueLecturers = activeLecturers;

              cache.current.set(cacheKey, uniqueLecturers);
              setData(uniqueLecturers); // Cập nhật danh sách đã lọc trùng
              setTotalPages(result.totalPages);
              setFinalPageSize(result.pageSize);
            } else {
                setData([]); // Xóa dữ liệu cũ nếu không có dữ liệu mới
                setError(result.message);
            }
        } catch (err: any) {
            setData([]); // Đảm bảo không giữ dữ liệu cũ khi có lỗi
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, academicYearId, subjectGroupId]);


    // Dùng useCallback để tránh thay đổi refetchData ở mỗi lần render
    const refetchData = useCallback(() => {
        cache.current.clear(); // Xóa cache để đảm bảo gọi API mới
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, totalPages, loading, error, pageSize: finalPageSize, refetchData };
};

export default useFetchLecturerAssignments;
