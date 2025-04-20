import React, { useEffect, useState } from 'react';
import caretdown from '../../../../assets/icons/caret_down.png';
import { Settings } from '../SetupDepartmentModal/type';
import { departmentData } from '../SetupDepartmentModal/data';
import { Link, useParams, useNavigate } from 'react-router-dom'; // sửa lại react-router
import axios from 'axios';
import { Subject, SubjectGroupList, subjectType } from './type';
import { subjects } from '../SubjectList/subjectListConfig';
import createAxiosInstance from '../../../../utils/axiosInstance';
import Loading from '../../../../components/Loading';
import AlertwithIcon from '../../../../components/AlertwithIcon';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance(true);

const SubjectSetup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [settings, setSettings] = useState<Settings>(departmentData);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroupList[]>([]);
  const [subjectTypeList, setSubjectTypeList] = useState<subjectType[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${API_URL}/subjects/${id}`);
        setSubject(response.data.data);
      } catch (error: any) {
        console.error('Lỗi khi tải môn học:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [typesRes, groupsRes] = await Promise.all([
          axiosInstance.get(`${API_URL}/subject-types`),
          axiosInstance.get(`${API_URL}/subject-groups`)
        ]);
        setSubjectTypeList(typesRes.data.data);
        setSubjectGroups(groupsRes.data.data);
      } catch (error: any) {
        console.error('Lỗi khi tải loại hoặc nhóm môn học:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!subject?.name) newErrors.name = 'Tên môn học không được để trống';
    if (!subject?.code) newErrors.code = 'Mã môn không được để trống';
    if (!subject?.subjectGroup?.id) newErrors.subjectGroup = 'Chọn tổ - bộ môn';
    if (!subject?.subjectType?.id) newErrors.subjectType = 'Chọn loại môn học';
    if (subject?.hoursSemester1 === undefined || subject?.hoursSemester1 === null) {
      newErrors.hoursSemester1 = 'Nhập số tiết học kì 1';
    } else if (isNaN(Number(subject.hoursSemester1))) {
      newErrors.hoursSemester1 = 'Số tiết học kì 1 phải là số hợp lệ';
    } else if (subject.hoursSemester1 < 0) {
      newErrors.hoursSemester1 = 'Số tiết học kì 1 không được âm';
    } else if (!Number.isInteger(subject.hoursSemester1)) {
      newErrors.hoursSemester1 = 'Số tiết học kì 1 phải là số nguyên';
    }

    if (subject?.hoursSemester2 === undefined || subject?.hoursSemester2 === null) {
      newErrors.hoursSemester2 = 'Nhập số tiết học kì 2';
    } else if (isNaN(Number(subject.hoursSemester2))) {
      newErrors.hoursSemester2 = 'Số tiết học kì 2 phải là số hợp lệ';
    } else if (subject.hoursSemester2 < 0) {
      newErrors.hoursSemester2 = 'Số tiết học kì 2 không được âm';
    } else if (!Number.isInteger(subject.hoursSemester2)) {
      newErrors.hoursSemester2 = 'Số tiết học kì 2 phải là số nguyên';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        code: subject?.code ?? "",
        name: subject?.name ?? "",
        hoursSemester1: subject?.hoursSemester1 ?? 0,
        hoursSemester2: subject?.hoursSemester2 ?? 0,
        subjectGroupId: subject?.subjectGroup?.id ?? 0,
        subjectTypeId: subject?.subjectType?.id ?? 0,
      };

      await axiosInstance.put(`${API_URL}/subjects/${id}`, payload);

      setAlert({ message: 'Cập nhật môn học thành công!', type: 'success' });
      setTimeout(() => {
        navigate('/leadership/declare-data/section-list');
      }, 1000);
    } catch (error: any) {
      console.error('Lỗi khi cập nhật môn học:', error);
      const message = 
        error?.response?.data?.message ||
        'Đã xảy ra lỗi khi cập nhật môn học. Vui lòng thử lại.';

      if (error.response?.data?.errors) {
        const serverErrors: { [key: string]: string } = {};
        for (const [field, messages] of Object.entries(error.response.data.errors)) {
          serverErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        }
        setErrors(serverErrors);
      }

      setAlert({ message, type: 'error' });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (field: keyof Subject, value: any) => {
    if (!subject) return;
    setSubject({
      ...subject,
      [field]: value,
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center'>
      <div className='absolute inset-0 bg-black bg-opacity-50 z-40'></div>

      <Loading isLoading={loading} />
      <div className="w-full z-50 max-w-[884px] mx-auto p-[20px_64px_40px] bg-white rounded-xl shadow-md">
        <div className="fixed top-10 right-5 flex justify-end">
          {alert && (
            <AlertwithIcon
              message={alert.message}
              type={alert.type}
              icon=""
            />
          )}
        </div>
        <h2 className="text-[28px] font-bold text-center text-black-text mb-4">Thiết lập môn học</h2>
        <div className="space-y-4">
          {/* Tổ - Bộ môn */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-black-text">Tổ - Bộ môn:</label>
            <div className="relative w-2/3">
              <select
                value={subject?.subjectGroup?.id ?? ""}
                onChange={(e) =>
                  handleChange("subjectGroup", { id: e.target.value })
                }
                className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
              >
                <option value="" disabled>Chọn tổ - bộ môn</option>
                {subjectGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              {errors.subjectGroup && <p className="text-red-500 text-sm mt-1">{errors.subjectGroup}</p>}
            </div>
          </div>

          {/* Tên môn học */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-black-text">Tên môn học:</label>
            <input
              type="text"
              value={subject?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-2/3 p-2 border border-background-gray rounded-md bg-white text-black-text"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm ml-[33%]">{errors.name}</p>}

          {/* Mã môn */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-black-text">Mã môn:</label>
            <input
              type="text"
              value={subject?.code || ''}
              onChange={(e) => handleChange('code', e.target.value)}
              className="w-2/3 p-2 border border-background-gray rounded-md bg-white text-black-text"
            />
          </div>
          {errors.code && <p className="text-red-500 text-sm ml-[33%]">{errors.code}</p>}

          {/* Loại môn học */}
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-medium text-black-text">Loại môn học:</label>
            <div className="relative w-2/3">
              <select
                value={subject?.subjectType?.id ?? ""}
                onChange={(e) =>
                  handleChange("subjectType", { id: e.target.value })
                }
                className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
              >
                <option value="" disabled>Chọn loại môn học</option>
                {subjectTypeList.filter((type) => type.status).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              {errors.subjectType && <p className="text-red-500 text-sm mt-1">{errors.subjectType}</p>}
            </div>
          </div>

          {/* Số tiết/Học kì */}
          <hr className="my-6 border-background-gray" />
          <div>
            <h3 className="font-bold text-orange-text mb-2">Số tiết/Học kì</h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="flex items-center gap-4">
                  <label className="w-1/3 font-medium text-black-text">Học kì 1:</label>
                  <input
                    type="number"
                    value={subject?.hoursSemester1 || ''}
                    onChange={(e) => handleChange("hoursSemester1", +e.target.value)}
                    className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
                  />
                </div>
                {errors.hoursSemester1 && <p className="text-red-500 text-sm mt-1 ml-[33%]">{errors.hoursSemester1}</p>}
              </div>

              <div className="flex items-center gap-4 w-1/2">
                <label className="w-1/3 font-medium text-black-text">Học kì 2:</label>
                <input
                  type="number"
                  value={subject?.hoursSemester2 || ''}
                  onChange={(e) => handleChange("hoursSemester2", +e.target.value)}
                  className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
                />
                {errors.hoursSemester2 && <p className="text-red-500 text-sm mt-1 ml-[33%]">{errors.hoursSemester2}</p>}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Link to="/leadership/declare-data/section-list">
              <button className="w-[160px] h-[52px] bg-[#F2F2F2] text-black-text font-bold rounded-md">Huỷ</button>
            </Link>

            <button
              onClick={handleSave}
              className="w-[160px] h-[52px] bg-background-orange-1 text-white font-bold rounded-md"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SubjectSetup;
