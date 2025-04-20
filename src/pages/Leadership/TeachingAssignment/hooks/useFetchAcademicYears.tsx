import { useEffect, useState } from "react";
import { getAcademicYears } from "../../../../services";
import { AcademicYearResponse } from "../../../../types/Leadership/teachingAssignment/academicYears.types";

const useFetchAcademicYears = () => {
    const [data, setData] = useState<AcademicYearResponse["data"]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getAcademicYears();
            if (result.code === 0) {
                setData(result.data);
            } else {
                throw new Error(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetchAcademicYears;
