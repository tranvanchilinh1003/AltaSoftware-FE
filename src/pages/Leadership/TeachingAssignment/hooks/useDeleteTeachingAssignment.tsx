import { useState } from "react";
import { IconSuccessFilled, IconWarningFill } from "../../../../components/Icons";
import { deleteTeachingAssignment } from "../../../../services";



const useDeleteTeachingAssignment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error" | "warning" | "info";
        icon: React.ReactNode;
    } | null>(null);

    const deleteAssignment = async (ids: number[],
        refetchData?: () => void,
        onSuccess?: (msg: string) => void) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        setAlert(null);

        try {
            const response = await deleteTeachingAssignment(ids);
            if (response.code === 0) {
                const successMessage = "Đã xóa thành công";
                setMessage(successMessage);
                setAlert({
                    message: successMessage,
                    type: 'success',
                    icon: <IconSuccessFilled />,
                });
                onSuccess?.(successMessage);
                if (refetchData) {
                    console.log("Calling refetchData...");
                    refetchData();
                }
            } else {
                throw new Error(response.message || "Xóa thất bại!");
            }
        } catch (err: any) {
            setError(err.message || "Xóa thất bại!");
            setAlert({
                message: err.message || "Xóa thất bại!",
                type: 'error',
                icon: <IconWarningFill />,
            });
        } finally {
            setLoading(false);
        }
    };


    return { deleteAssignment, loading, error, message, alert };
};

export default useDeleteTeachingAssignment;
