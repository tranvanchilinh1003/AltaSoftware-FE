import React, { useCallback, useEffect, useState } from 'react';
import caretdown from '../../../../assets/icons/caret_down.png';
import { Link, useNavigate } from 'react-router-dom';
import { Settings } from '../SetupDepartmentModal/type';
import { departmentData } from '../SetupDepartmentModal/data';
import { Subject, SubjectGroupList, subjectType } from './type';
import createAxiosInstance from '../../../../utils/axiosInstance';
import Loading from '../../../../components/Loading';
import AlertwithIcon from '../../../../components/AlertwithIcon';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance(true);

const AddSubject: React.FC = () => {
    const [settings] = useState<Settings>(departmentData);
    const [subjectGroups, setSubjectGroups] = useState<SubjectGroupList[]>([]);
    const [subjectTypeList, setSubjectTypeList] = useState<subjectType[]>([]);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [subjectGroupId, setSubjectGroupId] = useState(0);
    const [subjectTypeId, setSubjectTypeId] = useState(0);
    const [hoursSemester1, setHoursSemester1] = useState('');
    const [hoursSemester2, setHoursSemester2] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesRes, groupsRes] = await Promise.all([
                    axiosInstance.get(`${API_URL}/subject-types`),
                    axiosInstance.get(`${API_URL}/subject-groups`)
                ]);
                setSubjectTypeList(typesRes.data.data);
                setSubjectGroups(groupsRes.data.data);
            } catch (error: any) {
                console.error('Lỗi khi tải loại hoặc nhóm môn học:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!subjectGroupId) newErrors.subjectGroup = 'Vui lòng chọn tổ - bộ môn';
        if (!name.trim()) newErrors.name = 'Vui lòng nhập tên môn học';
        if (!subjectTypeId) newErrors.subjectType = 'Vui lòng chọn loại môn học';
        if (!hoursSemester1) newErrors.hoursSemester1 = 'Nhập số tiết học kỳ 1';
        if (!hoursSemester2) newErrors.hoursSemester2 = 'Nhập số tiết học kỳ 2';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const data = {
                name: name.trim(),
                code: code.trim() !== '' ? code.trim().toUpperCase() : name.trim().toUpperCase().slice(0, 5),
                subjectGroupId,
                subjectTypeId,
                hoursSemester1: Number(hoursSemester1),
                hoursSemester2: Number(hoursSemester2),
            };

            try {
                setLoading(true); // 🔁 Bắt đầu loading
                const res = await axiosInstance.post(`${API_URL}/subjects`, data);
                console.log('Môn học đã tạo:', res.data);

                setAlert({ message: 'Thêm môn học thành công!', type: 'success' });
                setTimeout(() => {
                    navigate('/leadership/declare-data/section-list');
                }, 1000);
            } catch (error: any) {
                console.error('Lỗi khi tạo môn học:', error);
                setAlert({ message: 'Đã xảy ra lỗi khi tạo môn học.', type: 'error' });
            } finally {
                setLoading(false); // ✅ Kết thúc loading
                setTimeout(() => setAlert(null), 3000); // ⏱️ Tự động ẩn alert sau 3s
            }
        }
    };


    const FormRow = ({ label, children, error }: { label: string, children: React.ReactNode, error?: string }) => (
        <>
            <div className="flex items-center gap-4">
                <label className="font-bold w-[180px] text-black-text">{label}</label>
                <div className="flex-1">{children}</div>
            </div>
            {error && <p className="text-red-500 text-sm ml-[180px] mt-1">{error}</p>}
        </>
    );

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }, []);

    const TextInputRow = React.memo(({
        label,
        value,
        onChange,
        error,
        placeholder,
    }: {
        label: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
        placeholder?: string;
    }) => (
        <>
            <div className="flex items-center gap-4">
                <label className="font-bold w-[180px] text-black-text">{label}</label>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="flex-1 p-2 border border-background-gray rounded-md bg-white text-black-text"
                    placeholder={placeholder}
                />
            </div>
            {error && <p className="text-red-500 text-sm ml-[180px] mt-1">{error}</p>}
        </>
    ));

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
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
            <div className='absolute inset-0 bg-black bg-opacity-50 z-40'></div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[884px] mx-auto p-[20px_64px_40px] bg-white z-50 rounded-xl shadow-md space-y-4"
            >
                <h2 className="text-[28px] font-bold text-center text-black-text mb-4">Thêm môn học</h2>

                <FormRow label="Tổ - Bộ môn:" error={errors.subjectGroup}>
                    <div className="relative">
                        <select
                            value={subjectGroupId}
                            onChange={(e) => setSubjectGroupId(Number(e.target.value))}
                            className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
                        >
                            <option value="">Chọn tổ - bộ môn</option>
                            {subjectGroups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                        <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                </FormRow>

                <div className="flex items-center gap-4">
                    <label className="font-bold w-[180px] text-black-text">Tên môn học:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder='Nhập tên môn học'
                        className="flex-1 p-2 border border-background-gray rounded-md bg-white text-black-text"
                    />
                </div>
                {errors.name && <p className="text-red-500 text-sm ml-[33%]">{errors.name}</p>}

                <div className="flex items-center gap-4">
                    <label className="font-bold w-[180px] text-black-text">Mã môn:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder='Nhập mã môn học'
                        className="flex-1 p-2 border border-background-gray rounded-md bg-white text-black-text"
                    />
                </div>
                {errors.code && <p className="text-red-500 text-sm ml-[33%]">{errors.code}</p>}
                <FormRow label="Loại môn học:" error={errors.subjectType}>
                    <div className="relative">
                        <select
                            value={subjectTypeId}
                            onChange={(e) => setSubjectTypeId(Number(e.target.value))}
                            className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
                        >
                            <option value="">Vui lòng chọn loại môn học</option>
                            {subjectTypeList.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                </FormRow>

                <hr className="my-6 border-background-gray" />
                <div className='mb-4'>
                    <h3 className="font-bold text-orange-text mb-2">Số tiết/Học kì</h3>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <div className="flex items-center gap-4">
                                <label className="w-1/3 font-bold text-black-text">Học kì 1:</label>
                                <input
                                    type="number"
                                    value={hoursSemester1}
                                    onChange={(e) => setHoursSemester1(e.target.value)}
                                    placeholder='Nhập số tiết học kỳ 1'
                                    className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
                                />
                            </div>
                            {errors.hoursSemester1 && <p className="text-red-500 text-sm mt-1 ml-[33%]">{errors.hoursSemester1}</p>}
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center gap-4">
                                <label className="w-1/3 font-bold text-black-text">Học kì 2:</label>
                                <input
                                    type="number"
                                    value={hoursSemester2}
                                    onChange={(e) => setHoursSemester2(e.target.value)}
                                    placeholder='Nhập số tiết học kỳ 2'
                                    className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
                                />
                            </div>
                            {errors.hoursSemester2 && <p className="text-red-500 text-sm mt-1 ml-[33%]">{errors.hoursSemester2}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <Link to="/leadership/declare-data/section-list">
                        <button type="button" className="w-[160px] h-[52px] bg-[#F2F2F2] text-black-text font-bold rounded-md">
                            Huỷ
                        </button>
                    </Link>
                    <button type="submit" className="w-[160px] h-[52px] bg-background-orange-1 text-white font-bold rounded-md">
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSubject;
