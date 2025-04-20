import React, { useEffect, useState } from 'react';

import calendar from '../../../../assets/icons/icon-calendar.png';
import paper from '../../../../assets/icons/u_paperclip.png';
import plus from '../../../../assets/icons/icon-plus-blue.png';
import minus from '../../../../assets/icons/icon_minus.png';
import CheckboxComponent from '../../../../components/CheckBox';
import Button from '../../../../components/Button';
import './style.css';
import { DropdownOption } from '../../../../components/Dropdown/type';
import { options } from './data';
import axios from 'axios';
import { Major, SchoolFacilitie } from '../TrainingList/type';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { data, useNavigate } from 'react-router';
import { Teacher, TrainingProgramForm } from './type';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import AlertwithIcon from '../../../../components/AlertwithIcon';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance(true);

const AddTrainingProgram: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingProgramForm>({
    name: '',
    institution: 0,
    major: 0,
    startDate: '',
    endDate: '',
    filename: '',
    method: '',
    degree: '',
    attachment: null,
  });
  const [trainingPrograms, setTrainingPrograms] = useState<DropdownOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [schoolList, setSchoolList] = useState<SchoolFacilitie[]>([]);
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [errors, setErrors] = useState({
    institution: '',
    major: '',
    startDate: '',
    endDate: '',
    method: '',
    degree: '',
    name: '',
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const removeProgram = (index: number) => {
    setTrainingPrograms(trainingPrograms.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === 'file' && files) {
      const file = files[0];
      if (file) {
        setForm((prev) => ({
          ...prev,
          attachment: file
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };


  useEffect(() => {
    axiosInstance.get(`${API_URL}/teacherlists/${id}`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setTeacher(data);
      }).catch((error) => {
        console.error('Error fetching teacher data:', error);
      })
  }, [id])
  useEffect(() => {
    axiosInstance.get(`${API_URL}/schools`, {
      params: {
        sortColumn: 'name',
        sortOrder: 'asc',
      },
    })
      .then((response) => {
        const data = response.data.data;
        setSchoolList(data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
  }, []);

  useEffect(() => {
    axiosInstance.get(`${API_URL}/major`, {
      params: {
        sortColumn: 'name',
        sortOrder: 'asc',
      },
    })
      .then((response) => {
        const data = response.data.data;
        console.log(data);

        setMajorList(data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {
      institution: '',
      major: '',
      startDate: '',
      endDate: '',
      method: '',
      degree: '',
      name: '',
    };
    if (!form.name) newErrors.name = 'Vui lòng nhập tên chương trình đào tạo';
    if (!form.institution) newErrors.institution = 'Vui lòng chọn cơ sở đào tạo';
    if (!form.major) newErrors.major = 'Vui lòng chọn chuyên ngành';
    if (!form.startDate) newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    if (!form.endDate) {
      newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
    } else if (form.startDate && form.endDate < form.startDate) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    if (!form.method) newErrors.method = 'Vui lòng nhập hình thức đào tạo';
    if (!form.degree) newErrors.degree = 'Vui lòng nhập văn bằng/chứng chỉ';
    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === '');

  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setAlert(null);

    let fileName = form.attachment?.name || '';
    let filePath = fileName;

    const payload = {
      name: form.name,
      majorId: Number(form.major),
      schoolFacilitiesId: Number(form.institution),
      startDate: form.startDate,
      endDate: form.endDate,
      degree: form.degree,
      trainingForm: form.method,
      fileName,
      filePath,
      teacherId: Number(id),
    };

    console.log(payload);

    try {
      await axiosInstance.post(`${API_URL}/training-program`, payload);
      setAlert({ message: 'Thêm chương trình đào tạo thành công!', type: 'success' });
      setTimeout(() => {
        navigate(`leadership/InstructorProfile/${id}`);
      }, 1000);
      setAlert({ message: 'Có lỗi xảy ra khi gửi biểu mẫu.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };




  const isFormEnabled = form.startDate && form.endDate;

  return (
    <div className='flex justify-center items-center min-h-screen'>\
      <Loading isLoading={loading} />
      {alert && (
        <AlertwithIcon
          message={alert.message}
          type={alert.type}
          icon=""
        />
      )}
      <div className='bg-white rounded-2xl p-6 w-full max-w-[884px] shadow-lg'>
        <div className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-2xl font-bold text-center mb-4 uppercase text-black-text">Thêm mới chương trình đào tạo</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">Giảng viên:</label>
              <input type="text" value={teacher?.fullName || ''} disabled className="w-2/3 p-2 border rounded bg-gray-200" />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Tên đào tạo: <span className="text-orange-text">*</span>
              </label>
              <input
                name='name'
                className={`w-2/3 p-2 border rounded`}
                onChange={handleChange}
                value={form.name || ''}
                placeholder="Nhập tên chương trình đào tạo"
              />
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Cơ sở đào tạo: <span className="text-orange-text">*</span>
              </label>
              <select
                name="institution"
                className={`w-2/3 p-2 border rounded ${errors.institution ? 'border-red-500' : ''}`}
                onChange={handleChange}
                value={form.institution || ''}
              >
                <option value="">Lựa chọn</option>
                {schoolList.map((school) => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Chuyên ngành: <span className="text-orange-text">*</span>
              </label>
              <select
                name="major"
                className={`w-2/3 p-2 border rounded ${errors.major ? 'border-red-500' : ''}`}
                onChange={handleChange}
                value={form.major || ''}
              >
                <option value="">Lựa chọn</option>
                {majorList.map((major) => (
                  <option key={major.id} value={major.id}>{major.name}</option>
                ))}
              </select>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.major && <p className="text-red-500 text-sm">{errors.major}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Ngày bắt đầu: <span className="text-orange-text">*</span>
              </label>
              <div className="relative w-2/3">
                <input
                  type="date"
                  name="startDate"
                  className={`w-full p-2 border rounded pr-10 ${errors.startDate ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                />
                <img src={calendar} alt="calendar icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Ngày kết thúc: <span className="text-orange-text">*</span>
              </label>
              <div className="relative w-2/3">
                <input
                  type="date"
                  name="endDate"
                  className={`w-full p-2 border rounded pr-10 ${errors.endDate ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                />
                <img src={calendar} alt="calendar icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Hình thức: <span className="text-orange-text">*</span>
              </label>
              <input
                name='method'
                className={`w-2/3 p-2 border rounded ${!isFormEnabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                onChange={handleChange}
                disabled={!isFormEnabled}
                value={form.method || ''}
                placeholder="Nhập tên hình thức đào tạo"
              />
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.method && <p className="text-red-500 text-sm">{errors.method}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">
                Văn bằng/Chứng chỉ: <span className="text-orange-text">*</span>
              </label>
              <input
                name='degree'
                className={`w-2/3 p-2 border rounded ${!isFormEnabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                onChange={handleChange}
                value={form.degree || ''}
                disabled={!isFormEnabled}
                placeholder="Nhập tên văn bằng/chứng chỉ"
              />
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-1/3'></div>
              <div className='w-2/3'>
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3 font-bold">Tệp đính kèm:</label>
              <div className="relative w-2/3">
                <input type="file" name="attachment" className="hidden" id="fileInput" onChange={handleChange} disabled={!isFormEnabled} />
                <div className="flex items-center">
                  <div className="w-2/3 bg-gray-200 p-2 rounded flex items-center h-10">
                    <span className="mr-2 text-gray-500 flex items-center">
                      <img src={paper} alt="" className="w-6 h-6 inline-block" /> |
                    </span>
                    <input
                      type="text"
                      value={form.attachment ? form.attachment.name : ''}
                      disabled
                      className="flex-grow bg-gray-200 text-gray-500 border-none h-full"
                    />
                  </div>
                  <label
                    htmlFor="fileInput"
                    className={`w-1/3 ml-2 px-4 border border-orange-500 bg-orange-200 text-black-text cursor-pointer rounded flex items-center justify-center h-10 whitespace-nowrap text-center flex-shrink-0 ${!isFormEnabled ? 'cursor-not-allowed' : ''
                      }`}
                  >
                    Chọn tệp tải lên...
                  </label>
                </div>

                <p className="text-sm text-gray-500 italic mt-1">Kiểu file .pdf, .jpeg, .jpg. Dung lượng tối đa 100MB.</p>
              </div>
            </div>
            <hr className="my-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {trainingPrograms.map((program, index) => (
                <div key={index} className="flex">
                  <button onClick={() => removeProgram(index)} className="text-red-500">
                    <img src={minus} alt="Remove" className="w-6 h-6" />
                  </button>
                  <span className="flex-grow ml-3">{program.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="secondary"
              style={{ color: '#000', margin: 2, fontWeight: 'bold' }}
              onClick={() => navigate(`/leadership/InstructorProfile/${id}`)}
            >
              Hủy
            </Button>

            <Button
              className={isFormEnabled ? 'primary' : 'secondary'}
              style={{ margin: 2, fontWeight: 'bold' }}
              disabled={!isFormEnabled}
              onClick={() => {
                if (validateForm()) {
                  handleSubmit();
                }
              }}
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingProgram;
  