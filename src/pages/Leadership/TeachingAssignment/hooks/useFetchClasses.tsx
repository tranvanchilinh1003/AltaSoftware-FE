import { useEffect, useState } from "react";
import { getClasses } from "../../../../services";
import { ClassData } from "../../../../types/Leadership/teachingAssignment/class.type";

const useFetchClasses = () => {
    const [data, setData] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await getClasses();
            if (result.code === 0) {
                setData(result.data);
            } else {
                throw new Error(result.message);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetchClasses;
