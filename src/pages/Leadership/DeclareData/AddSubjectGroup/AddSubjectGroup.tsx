import React, { useEffect, useState } from 'react';
import minus from '../../../../assets/icons/icon_minus.png';
import plus from '../../../../assets/icons/icon_plus.png';
import caretdown from '../../../../assets/icons/caret_down.png';
import { Link, useNavigate } from 'react-router-dom';
import AlertwithIcon from '../../../../components/AlertwithIcon';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { TeacherList } from './type';
import Loading from '../../../../components/Loading';

const axiosInstance = createAxiosInstance(true);
const API_URL = process.env.REACT_APP_API_URL;

const AddDepartmentSettings: React.FC = () => {
    const [subjectGroupName, setSubjectGroupName] = useState('');
    const [selectedTeacherId, setSelectedTeacherId] = useState('');
    const navigate = useNavigate();
    const [teacherList, setTeacherList] = useState<TeacherList[]>([]);
    const [hiddenSubjects, setHiddenSubjects] = useState<string[]>([]);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9999);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState<{ subjectGroupName?: string; selectedTeacherId?: string }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_URL}/teacherlists`, {
                    params: { page, pageSize: 9999, sortColumn, sortOrder, search },
                });
                setTeacherList(response.data.data);
                console.log("Teacher List:", response.data.data);
            } catch (error) {
                console.error('Error fetching department data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, [page, pageSize, sortColumn, sortOrder, search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { subjectGroupName?: string; selectedTeacherId?: string } = {};

        if (!subjectGroupName.trim()) {
            newErrors.subjectGroupName = 'Vui lòng nhập tên Tổ - Bộ môn';
        }

        if (!selectedTeacherId) {
            newErrors.selectedTeacherId = 'Vui lòng chọn Trưởng tổ - Bộ môn';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true); // ✅ Bắt đầu loading


        const data = {
            name: subjectGroupName,
            teacherId: Number(selectedTeacherId),
        };

        console.log("Sending data to API:", data);

        try {
            await axiosInstance.post(`${API_URL}/subject-groups`, data);
            console.log("Subject group created successfully:", data);
            setAlert({ message: 'Tạo tổ - bộ môn thành công!', type: 'success' });
            setTimeout(() => {
                navigate('/leadership/declare-data');
            }, 1000);

        } catch (error: any) {
            if (error.response) {
                console.error("Response error:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error config:", error.message);
            }
            setAlert({ message: 'Có lỗi xảy ra khi tạo tổ - bộ môn.', type: 'error' });
        } finally {
            setLoading(false); // ✅ Dừng loading
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <Loading isLoading={loading} />
            <div className="fixed top-10 right-5 flex justify-end z-[100]">
                {alert && (
                    <AlertwithIcon
                        message={alert.message}
                        type={alert.type}
                        icon=""
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-lg">
                <form className="w-full pt-3 px-6 md:px-[60px] pb-10" onSubmit={handleSubmit}>
                    <h2 className="text-black-text text-center text-2xl font-bold mb-5">Thêm Tổ - Bộ môn</h2>

                    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                        <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tên tổ - Bộ môn:</label>
                        <div className="w-full md:w-9/12">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg text-black-text"
                                value={subjectGroupName}
                                onChange={(e) => setSubjectGroupName(e.target.value)}
                                placeholder="Nhập tên tổ - bộ môn"
                            />
                            {errors.subjectGroupName && (
                                <p className="text-red-500 text-sm mt-1">{errors.subjectGroupName}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                        <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Trưởng tổ - Bộ môn:</label>
                        <div className="relative w-full md:w-9/12">
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg text-black-text appearance-none"
                                value={selectedTeacherId}
                                onChange={(e) => setSelectedTeacherId(e.target.value)}
                            >
                                <option value="" disabled>Chọn Trưởng tổ - Bộ môn</option>
                                {teacherList.map((teacher, index) => (
                                    <option key={index} value={teacher.userId}>
                                        {teacher.fullName}
                                    </option>
                                ))}
                            </select>
                            <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
                            {errors.selectedTeacherId && (
                                <p className="text-red-500 text-sm mt-1">{errors.selectedTeacherId}</p>
                            )}
                        </div>
                    </div>


                    <hr className="my-6 border-gray-300" />

                    {/* <div className="flex flex-col items-start w-full">
                        <p className="text-orange-text font-bold text-base mb-1">Danh sách môn học</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            {subjects.filter((subject) => !hiddenSubjects.includes(subject)).map((subject, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-lg text-sm">
                                    <img
                                        src={minus}
                                        alt="Remove"
                                        className="w-5 cursor-pointer"
                                        onClick={() => handleHideSubject(subject)}
                                    />
                                    <span>{subject}</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/leadership/declare-data/subject-list">
                            <button type="button" className="mt-4 text-blue-text font-bold flex items-center">
                                <img src={plus} alt="Add" className="w-5 mr-2" /> Thêm môn học mới
                            </button>
                        </Link>
                    </div> */}

                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                        <Link to="/leadership/declare-data">
                            <button type="button" className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg">Hủy</button>
                        </Link>
                        <button type="submit" className="w-full md:w-40 py-2 bg-orange-text text-white font-bold rounded-lg">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDepartmentSettings;
    