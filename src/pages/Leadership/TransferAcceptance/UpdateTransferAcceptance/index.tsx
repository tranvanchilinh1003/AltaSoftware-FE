import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import Button from '../../../../components/Button';
import attachIcon from '../../../../assets/icons/u_paperclip.png';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import { IconArrowCaretDown } from './../../../../components/Icons';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './../../../../redux/store';
import {
  fetchAllStudent,
  fetchProvince,
  fetchDistrict,
  fetchOneTransferSchool,
  updateTransferAcceptance,
} from '../../../../redux/reducers/Leadership/StudentProfile/TransferAcceptance/TransferAcceptance';
import { IProvince, IDistrict, Student } from '../AddTransferAcceptance/type';
import createAxiosInstance from '../../../../utils/axiosInstance';

const UpdateTransferAcceptance = () => {
  const { id } = useParams();
  const [cookies] = useCookies(['refreshToken']);
  const refreshToken = cookies.refreshToken;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, reset } = useForm();
  const [fileName, setFileName] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null | any>(null);
  const [listProvince, setListProvince] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict>();
  const [dataListStudent, setDataListStudent] = useState<Student[]>([]);
  const [GetOneStudent, setGetOneStudent] = useState<any | null>(null);

  const [userId, setUserId] = useState();
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [selectedStudentFullName, setSelectedStudentFullName] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<number | null>(null);

  const { fetchProvince: data } = useSelector((state: RootState) => state.transferAcceptance);
  const { fetchDistrict: dataDistrict } = useSelector((state: RootState) => state.transferAcceptance);
  const { StudentApiResponse, loading, error } = useSelector((state: RootState) => state.transferAcceptance);

  useEffect(() => {
    dispatch(fetchOneTransferSchool(id))
      .unwrap()
      .then((result) => {
        // console.log('Dữ liệu học sinh:', result);
        setGetOneStudent(result);
        setValue('selectedStudentId', result.studentId);
        setValue('studentCode', result.studentCode);
        setSelectedStudentFullName(result.fullName);
        setDate(dayjs(result.transferSchoolDate));
        setValue('fromSchool', result.transferToSchool);
        setValue('reason', result.reason);
        setValue('attachment', result.attachmentName);
        setValue('transferSemester', result.transferSemester);
        setSelectedProvinceCode(result.provinceCode);
        setSelectedDistrictCode(result.districtCode);
        setFileName(result.attachmentName);
      })
      .catch((error) => {
        console.error('Lỗi khi fetch:', error);
      });
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(fetchAllStudent(refreshToken));
  // }, [dispatch]);

  useEffect(() => {
    if (StudentApiResponse?.data) {
      setDataListStudent(StudentApiResponse?.data);
    }
  }, [StudentApiResponse]);
  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProvinceCode) {
      dispatch(fetchDistrict(selectedProvinceCode));
    }
  }, [selectedProvinceCode]);

  useEffect(() => {
    if (data) {
      setListProvince(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataDistrict) {
      setDistricts(dataDistrict);
    }
  }, [dataDistrict]);

  const axiosInstance = createAxiosInstance(true);
  useEffect(() => {
    axiosInstance
      .get('api/auth/verify-token')
      .then((response) => {
        setUserId(response?.data?.data?.id);
      })
      .catch(() => {
        toast.error('Có lỗi khi lấy thông tin người nhập!');
      });
  });
  // console.log('userId', userId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };

  const onSubmit = (data: any) => {
    const FormattedData = {
      studentId: data?.selectedStudentId,
      studentCode: data?.studentCode,
      fullName: null,
      transferSchoolDate: date ? dayjs(date).format('YYYY-MM-DD') : '',
      transferToSchool: data?.fromSchool,
      schoolAddress: '',
      reason: data.reason || '',
      provinceCode: selectedProvinceCode ?? 0,
      districtCode: selectedDistrictCode ?? 0,
      attachmentName: fileName,
      attachmentPath: '',
      semesterId: 1,
      userId: userId,
    };
    console.log(FormattedData);
    dispatch(updateTransferAcceptance({ updatedData: FormattedData, token: refreshToken }))
      .unwrap()
      .then((res) => {
        // console.log('Cập nhật thành công:', res);
        toast.success('Cập nhật chuyển trường thành công!');
        // dispatch(fetchAllStudent());
        // console.log(dataListStudent);
      })
      .catch((err) => {
        // console.error('Lỗi cập nhật:', err);
        toast.error(err);
      });
  };

  const handleCancel = () => {
    navigate(`/leadership/transfer-acceptance`);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md max-w-[800px] px-8 pb-2">
      <h2 className="text-2xl font-semibold text-center mb-2">Tiếp nhận chuyển trường</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Tên học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Tên học viên: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full md:w-[585px]">
            <input className="w-full p-2 bg-[#F2F2F2] rounded ..." defaultValue={selectedStudentFullName} type="text" disabled />
          </div>
        </div>

        {/* Mã học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Mã học viên: <span className="text-red-500">*</span>
          </label>
          <input
            {...register('studentCode')}
            placeholder="Mã học viên"
            disabled
            className="w-full md:w-[585px] p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
          />
        </div>

        {/* Ngày chuyển đến */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Ngày chuyển đến: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <DateInput value={date} onChange={setDate} width="250px" className="custom-class" style={{ borderColor: 'red' }} />
          </div>
        </div>

        {/* Học kỳ chuyển */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">Học kỳ chuyển:</label>
          <input
            {...register('transferSemester')}
            placeholder="Mã học viên"
            disabled
            className="w-full md:w-[585px] p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
          />
        </div>

        {/* Tỉnh/Thành */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">Tỉnh/Thành:</label>
          <div className="relative w-full md:w-[585px]">
            <select
              className="appearance-none w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none pr-10"
              onChange={(e) => {
                const selectedCode = Number(e.target.value);
                setSelectedProvinceCode(selectedCode);
              }}
            >
              <option value="">Chọn tỉnh/thành</option>
              {listProvince.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
              <IconArrowCaretDown />{' '}
            </div>
          </div>
        </div>

        {/* Quận/Huyện */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">Quận/Huyện:</label>
          <div className="relative w-full md:w-[585px]">
            <select
              className="appearance-none w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none pr-10"
              onChange={(e) => {
                const selectedCode = Number(e.target.value);
                setSelectedDistrictCode(selectedCode);
              }}
            >
              <option value="">Chọn quận/huyện</option>
              {districts?.districts?.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
              <IconArrowCaretDown />
            </div>
          </div>
        </div>

        {/* Chuyển từ */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Chuyển từ trường: <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fromSchool')}
            placeholder="Cần ZTho"
            className="w-full md:w-[585px] p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
          />
        </div>

        {/* Lý do */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <label className="block font-medium">Lý do:</label>
          <div className="w-full md:w-[585px]">
            <textarea
              {...register('reason')}
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
              rows={2}
              placeholder=""
            />
          </div>
        </div>

        {/* Tệp đính kèm */}
        <div className="flex flex-row items-center justify-between gap-4">
          <label className="font-medium">
            Tệp đính kèm: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px] flex items-center space-x-2">
            <div className="flex items-center border rounded px-3 bg-[#F2F2F2] h-10 flex-grow">
              <img src={attachIcon} alt="icon" className="w-7 h-5 pr-1 border-r-2 text-orange-500" />
              <span className="text-gray-500 ml-2">{fileName || ' '}</span>
            </div>
            <label className="cursor-pointer border border-orange-500 px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition h-10 flex items-center">
              Chọn tệp tải lên...
              <input type="file" {...register('attachment')} className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <p className="text-sm lg:ml-[150px] text-gray-500 font-thin italic">Kích thước tệp không vượt quá 250MB.</p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            className="secondary"
            type="button"
            size="mini"
            width="160px"
            height="48px"
            style={{ color: 'white', fontWeight: '600' }}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button className="primary" type="submit" size="mini" width="160px" height="48px" style={{ color: 'white', fontWeight: '600' }}>
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTransferAcceptance;
