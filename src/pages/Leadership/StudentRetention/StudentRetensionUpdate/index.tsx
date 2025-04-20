import Button from '../../../../components/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import tep from '../../../../assets/icons/u_paperclip.png';
import './index.css';
import DateInput from './../../../../components/Date';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOneStudentRetention,
  fetchClassEdit,
  updateStudentRetention,
} from './../../../../redux/reducers/Leadership/StudentProfile/StudentRetention/StudentRetention';
import { RootState, AppDispatch } from './../../../../redux/store';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { SchoolClass } from './type';
const StudentRetentionUpdate = () => {
  const { id } = useParams();
  const [cookies] = useCookies(['refreshToken']);
  const navigate = useNavigate();
  const refreshToken = cookies.refreshToken;
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, setValue } = useForm();
  const [fileName, setFileName] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null | any>(null);
  const { selectedStudentRetention, loading, error } = useSelector((state: RootState) => state.studentRetention);
  const { fetchClassEdit: dataEdit } = useSelector((state: any) => state.studentRetention);

  const [userId, setUserId] = useState();
  const [studenId, setStudenId] = useState();
  const [classId, setClassId] = useState();
  const [listClass, setListClass] = useState<SchoolClass[]>([]);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [FullName, setFullName] = useState('');

  // console.log('refreshToken', refreshToken);

  useEffect(() => {
    dispatch(fetchClassEdit({ page: 1, pageSize: 1000, sortColumn: 'id', sortOrder: 'asc' }) as any);
    setListClass(dataEdit?.data);
  }, [dispatch]);

  useEffect(() => {
    if (dataEdit?.data) {
      setListClass(dataEdit.data);
    }
  }, [dataEdit]);

  useEffect(() => {
    if (listClass && selectedStudentRetention) {
      const defaultClass = listClass?.find((cls) => cls.name === selectedStudentRetention?.className);
      console.log('defaultClass', defaultClass);
      // console.log('listClass', listClass);

      if (defaultClass) {
        setValue('className', defaultClass.id.toString());

        const matchedStudent = defaultClass.student.find((stu) => stu.fullName === selectedStudentRetention?.fullName);
        console.log('matchedStudent', matchedStudent);

        if (matchedStudent) {
          setFullName(matchedStudent?.fullName);
          setValue('studentName', matchedStudent?.id);
        }
        setStudentOptions(defaultClass.student);
      }
    }
  }, [listClass, selectedStudentRetention, setValue]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneStudentRetention(id));
    }
  }, [dispatch, id]);
  // console.log('selectedStudentRetention', selectedStudentRetention);

  useEffect(() => {
    if (selectedStudentRetention) {
      const data = selectedStudentRetention as any;
      setValue('className', data?.className || '');
      // setValue('studentName', `Học viên ${data?.fullName || ''}`);
      setValue('semesterId', data?.semester?.id || '');
      setValue('reason', data?.reason || '');
      setValue('retentionPeriod', data?.retentionPeriod || '');
      setDate(data?.reserveDate ? dayjs(data.reserveDate) : null);
      setFileName(data?.file ? data?.file.split('/').pop() : '');
      setStudenId(data?.student?.id);
      setClassId(data?.class?.id);
    }
  }, [selectedStudentRetention, setValue]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  // if (error) return <p>Lỗi: {error}</p>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };

  const onSubmit = (data: any) => {
    const formattedData = {
      id: Number(id),
      studentId: data.studentName,
      reserveDate: date ? dayjs(date).toISOString() : null,
      retentionPeriod: data.retentionPeriod,
      reason: data.reason?.trim() || '',
      file: fileName || '',
      classId: data.className,
      semesterId: data.semesterId,
    };
    dispatch(updateStudentRetention({ updatedData: formattedData, token: refreshToken }))
      .unwrap()
      .then((res) => {
        // console.log('Cập nhật thành công:', res);
        toast.success('Cập nhật bảo lưu thành công!');
      })
      .catch((err) => {
        // console.error('Lỗi cập nhật:', err);
        toast.error('Lỗi cập nhật! Vui lòng kiểm tra lại dữ liệu trước khi cập nhật!');
      });
  };

  const handleCancel = () => {
    navigate(`/leadership/student-retention`);
  };

  return (
    <div className="w-full mx-auto bg-white  rounded-lg shadow-md max-w-3xl mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Cập nhật bảo lưu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Lớp hiện tại */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium mb-1 md:mb-0">Lớp hiện tại:</label>
          <div className="relative w-full md:w-[585px]">
            <select
              {...register('className')}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedClassId = Number(event.target.value);
                const selectedClass = listClass?.find((cls) => cls?.id === selectedClassId);
                if (selectedClass) {
                  setStudentOptions(selectedClass?.student);
                } else {
                  setStudentOptions([]);
                }
              }}
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            >
              <option value="">Chọn lớp</option>
              {listClass?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tên học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium mb-1 md:mb-0">
            Tên học viên: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full md:w-[585px]">
            <select
              {...register('studentName')}
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            >
              <option selected value="">
                {FullName}
              </option>
              {studentOptions.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ngày bảo lưu và Học kỳ */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5">
          <div className="flex items-center w-full md:w-[585px]">
            <label className="font-medium md:mr-5 w-[150px]">
              Ngày bảo lưu: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full custom-input">
              <DateInput value={date} onChange={setDate} width="250px" className="custom-class" style={{ borderColor: 'red' }} />
            </div>
          </div>

          <div className="flex items-center bg-gray-200 px-3 py-2 rounded w-full md:w-auto">
            <select {...register('semesterId')} className="bg-transparent focus:outline-none w-full">
              <option value="1">Học kỳ I</option>
              <option value="2">Học kỳ II</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start">
          <label className="block font-medium mb-1 md:mb-0">Thời gian bảo lưu</label>
          <div className="w-full md:w-[585px]">
            <input
              {...register('retentionPeriod')}
              className="w-full p-2 bg-[#F2F2F2]   rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
          </div>
        </div>

        {/* Lý do bảo lưu */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <label className="block font-medium mb-1 md:mb-0">
            Lý do bảo lưu: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <textarea
              {...register('reason')}
              placeholder=""
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            <p className="text-sm text-gray-500 font-thin italic">Kết quả học tập của viên sẽ được bảo lưu trong hồ sơ học viên.</p>
          </div>
        </div>

        {/* Tệp đính kèm */}
        <div className="flex flex-row items-center justify-between gap-4">
          <label className="font-medium">
            Tệp đính kèm: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px] flex items-center space-x-2">
            <div className="flex items-center border rounded px-3 bg-[#F2F2F2] h-10 flex-grow">
              <img src={tep} alt="icon" className="w-7 h-5 border-r-2 pr-2 text-orange-500" />
              <span className="text-gray-500 ml-2">{fileName || ' '}</span>
            </div>
            <label className="cursor-pointer border border-orange-500 px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition h-10 flex items-center">
              Chọn tệp tải lên...
              <input type="file" {...register('attachment')} className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <p className="text-sm lg:ml-[135px] text-gray-500 font-thin italic">Kích thước tệp không vượt quá 250MB.</p>

        {/* Button */}
        <div className="flex justify-center space-x-4">
          <Button
            children="Hủy"
            type="button"
            className="secondary"
            size="mini"
            width="160px"
            height="48px"
            style={{ color: 'black', fontWeight: '600' }}
            onClick={handleCancel}
          />
          <Button
            children="Lưu"
            type="submit"
            className="primary"
            size="mini"
            width="160px"
            height="48px"
            style={{ color: 'white', fontWeight: '600' }}
          />
        </div>
      </form>
    </div>
  );
};

export default StudentRetentionUpdate;
