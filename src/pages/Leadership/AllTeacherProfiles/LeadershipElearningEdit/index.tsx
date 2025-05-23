import React, { useEffect, useState } from 'react';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import { DropdownOption } from '../../../../components/Dropdown/type';
import DateInput from '../../../../components/Date';
import { IUser, IProvince, ITeacherInfo } from './type';
import dayjs from 'dayjs';
import { Label } from 'recharts';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useTeacherContext } from '../InstructorProfile/TeacherContext';

const down = require('../../../../assets/icons/caret_down.png');
const defaultAvatar =
  'https://firebasestorage.googleapis.com/v0/b/podcast-ba34e.appspot.com/o/images%2F1710471698454-linhpc06747-anh_dai_dien.jpg?alt=media&token=70913785-c8be-49b6-99ae-34170aa9fbdf';

const gender = [
  { label: 'Nam', value: 'true' },
  { label: 'Nữ', value: 'false' },
];

const option_nation = [
  { label: 'Kinh', value: 'kinh' },
  { label: 'Mèo', value: 'meo' },
  { label: 'H-Mông', value: 'hmong' },
  { label: 'Tày', value: 'tay' },
];
const option_status = [
  { label: 'Đang giảng dạy', value: '6' },
  { label: 'Tạm nghỉ', value: '7' },
  { label: 'Đã thôi việc', value: '8' },
  { label: 'Nghỉ hưu', value: '9' },
];
const option_religion = [
  { label: 'Phật giáo', value: 'Phật giáo' },
  { label: 'Công giáo', value: 'Công giáo' },
  { label: 'Đạo hồi', value: 'Đạo hồi' },
  { label: 'Không có', value: 'Không' },
];
const allSubjects = ['Toán', 'Vật Lý', 'Tiếng Anh', 'Địa lý', 'Lịch sử', 'Ngữ Văn'];
const TeacherProfileEdit = () => {
  const [dataTeacherInfos, setDataTeacherInfos] = useState<ITeacherInfo>();
  const [dataUses, setDataUse] = useState<IUser>();
  const [urls, setUrls] = useState([
    { link: '/leadership/all-teacher-profiles', linkName: 'Hồ sơ giảng viên' },
    { link: '', linkName: 'Thêm thông tin giảng viên' },
  ]);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [selectedOptionGender, setSelectedOptionGender] = useState<DropdownOption | null>(null);
  const [option_subject, setOptionSubject] = useState([]);
  const [option_position, setPosition] = useState([]);
  const [selectedSubject, setSelectedsubject] = useState<DropdownOption | null>(null);
  const [selectedNation, setSelectedNation] = useState<DropdownOption | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
  const [selectedReligion, setSelectedReligion] = useState<DropdownOption | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Toán', 'Vật Lý']);
  const [activeTab, setActiveTab] = useState<string>('');
  const [Use, setUse] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { teacherData, teacherInfo, teacherFamily } = useTeacherContext();
  const {
    register,
    reset,
    setValue,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUser & ITeacherInfo>({
    mode: 'onChange',
    defaultValues: {
      issuedPlace: teacherInfo?.issuedPlace,
      avatarUrl: Use?.avatarUrl,
      fullName: teacherData?.fullName,
      position: teacherData?.position,
      cccd: teacherInfo?.cccd,

      unionDate: teacherInfo?.unionDate ? dayjs(teacherInfo?.unionDate) : null,
      placeBirth: Use.placeBirth,
      gender: teacherData.gender,
      dob: teacherData?.birthDate ? dayjs(teacherData.birthDate) : null,
      issuedDate: teacherInfo?.issuedDate ? dayjs(teacherInfo.issuedDate) : null,
      enrollmentDate: teacherFamily?.enrollmentDate ? dayjs(teacherFamily.enrollmentDate) : null,
    },
  });
  const [provinces, setProvinces] = useState<IProvince[]>([]); //tỉnh/huyện

  const [districts, setDistricts] = useState<IProvince[]>([]); // quận huyện
  const [wards, setWards] = useState<IProvince[]>([]); //xã/phường
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null); // có id tỉnh huyện chưa
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // có id huyện huyện xã
  // const [previewAvatar, setPreviewAvatar] = useState(defaultAvatar); // avata
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [isAutoGenerate, setIsAutoGenerate] = useState(false); // mã sinh tự động
  const [isPartyMember, setIsPartyMember] = useState(false); //check vào đảng
  const [isUnionPlace, setUsUnionPlace] = useState(false); //check vào đoàn
  const [years, setYears] = useState<any[]>([]); // Dữ liệu năm học
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const axiosInstance = createAxiosInstance(false);
  // const [cookies] = useCookies(['accessToken']);

  // const [useId, setUseId] = useState<number | null>(null);
  const navigate = useNavigate();
  // const token = cookies.accessToken;
  // const [cookies] = useCookies(['userId']);
  console.log(teacherData);

  const axios = createAxiosInstance();
  const fetchDataYear = async () => {
    try {
      const response = await axios.get('https://fivefood.shop/api/academic-years'); // Thay YOUR_API_URL bằng URL thật của bạn
      setYears(response.data.data); // Lưu dữ liệu năm học vào state
    } catch (err) {
      console.log('lỗi khi gọi api' + err);
    } finally {
      setLoading(false); // Kết thúc việc gọi API
    }
  };
  const fetchDataSubject = async () => {
    try {
      const response = await axios.get('https://fivefood.shop/api/subjects'); // Thay YOUR_API_URL bằng URL thật của bạn
      const filteredSubjects = response.data.data.map((subject: any) => ({
        label: subject.name,
        value: subject.id.toString(),
      }));
      setOptionSubject(filteredSubjects);
    } catch (err) {
      console.log('lỗi khi gọi api' + err);
    } finally {
      setLoading(false); // Kết thúc việc gọi API
    }
  };
  const fetchDataPosition = async () => {
    try {
      const response = await axios.get('https://fivefood.shop/api/work-process/getworkprocessnopaging');
      const filteredSubjects = response.data.data.map((subject: any) => ({
        label: subject.position,
        value: subject.id.toString(),
      }));
      setPosition(filteredSubjects);
    } catch (err) {
      console.log('lỗi khi gọi api' + err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (teacherData) {
      setValue('code', teacherData?.teacherCode);
    }
  }, [teacherData, setValue]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsAutoGenerate(isChecked); // Cập nhật trạng thái checkbox

    if (isChecked) {
      // Gán một mã tự động nào đó, ví dụ: random 5 ký tự
      const autoCode = `GV${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, '0')}-K1Y25`;
      setValue('code', autoCode); // Gán mã vào form
      clearErrors('code'); // Xóa lỗi nếu có
    } else {
      // Nếu bỏ chọn, xóa giá trị code để người dùng nhập tay
      setValue('code', '');
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Hiển thị ảnh mới
      const imageUrl = URL.createObjectURL(file);
      setPreviewAvatar(imageUrl);

      // Chuyển file thành Base64 để gửi lên
      const base64String = await convertFileToBase64(file);
      setValue('avatarUrl', base64String); // Lưu vào react-hook-form
    }
  };

  const selectedTeaching = (option: DropdownOption) => {
    setSelectedOption(option);
    setValue('position', option.label);
  };
  const selectedGender = (option: DropdownOption) => {
    setSelectedOptionGender(option);
    setValue('gender', option.value === 'true'); // Ép string => boolean
  };

  useEffect(() => {
    if (typeof teacherData?.gender === 'boolean') {
      const selected = gender.find((g) => g.value === String(teacherData.gender)); // Chuyển boolean => string để so sánh
      setSelectedOptionGender(selected ?? null);
      setValue('gender', teacherData.gender); // set boolean vào react-hook-form
    }
  }, [teacherData?.gender]);

  const selectedSubjectoption = (option: DropdownOption) => {
    setSelectedsubject(option);
    setValue('subjectId', Number(option.value));
  };
  const selectedNationoption = (option: DropdownOption) => {
    setSelectedNation(option);
    setValue('nation', option.value);
  };
  const selectedStatusoption = (option: DropdownOption) => {
    setSelectedStatus(option);
    setValue('userStatusId', Number(option.value));
  };
  const selectedReligionoption = (option: DropdownOption) => {
    setSelectedReligion(option);
    setValue('religion', option.value);
  };
  // const handleIssuedDate = (date: dayjs.Dayjs | null) => {
  //   setDataTeacherInfos((prev) => ({
  //     ...prev!,
  //     issuedDate: date, // Đảm bảo đúng kiểu dữ liệu
  //   }));
  //   setValue('issuedDate', date);
  // };
  const handleIssuedDate = (date: dayjs.Dayjs | null) => {
    setDataTeacherInfos((prev) => ({
      ...prev!,
      issuedDate: date,
    }));

    setValue('issuedDate', date, { shouldValidate: true });
  };
  const handlEnrollmentDate = (date: dayjs.Dayjs | null) => {
    setDataUse((prev) => ({
      ...prev!,
      enrollmentDate: date,
    }));
    setValue('enrollmentDate', date, { shouldValidate: true });
  };
  const handleUnionDate = (date: dayjs.Dayjs | null) => {
    setDataTeacherInfos((prev) => ({
      ...prev!,
      unionDate: date, // Đảm bảo đúng kiểu dữ liệu
    }));
    setValue('unionDate', date);
  };
  const handlePartyDate = (date: dayjs.Dayjs | null) => {
    setDataTeacherInfos((prev) => ({
      ...prev!,
      partyDate: date, // Đảm bảo đúng kiểu dữ liệu
    }));
    setValue('partyDate', date);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]));
  };
  const onSubmit = async (data: IUser & ITeacherInfo) => {
    console.log('Submit:', data);
    try {
      setIsSubmitting(true);
      setLoading(true);
      const valueUser = {
        // code: data.code,
        password: '123456',
        fullName: data.fullName,
        dob: data.dob?.toISOString(),
        gender: data.gender,
        email: data.email,
        phoneNumber: data.phoneNumber,
        placeBirth: data.placeBirth,
        nation: data.nation,
        religion: data.religion,
        enrollmentDate: data.enrollmentDate?.toISOString(),
        roleId: 2,
        academicYearId: data.academicYearId,
        userStatusId: data.userStatusId,
        classId: 7,
        entryType: 7,
        addressFull: data.addressFull,
        provinceCode: data.provinceCode,
        districtCode: data.districtCode,
        wardCode: data.wardCode,
        street: data.issuedPlace,
        active: true,
        avatarUrl: previewAvatar || data.avatarUrl || Use?.avatarUrl || defaultAvatar,
      };

      const userResponse = await axios.put(`api/users/${teacherData.userId}`, valueUser);
      if (userResponse.status === 200) {
        const userId = userResponse.data.data.id;
        const valueTeacher = {
          cccd: data.cccd ?? '',
          fullName: data.fullName,
          issuedDate: data.issuedDate?.toISOString(),
          issuedPlace: data.issuedPlace,
          unionMember: data.unionMember ?? false,
          unionDate: data.unionDate,
          unionPlace: data.unionPlace ?? '',
          partyMember: data.partyMember ?? false,
          partyDate: data.partyDate ? data.partyDate.toISOString() : '',
          userId: userId,
          addressFull: data.addressFull,
          provinceCode: data.provinceCode,
          districtCode: data.districtCode,
          wardCode: data.wardCode,
          active: true,
          subjectId: data.subjectId,
          position: data.position,
        };
        // setUseId(userId);
        // const teacherResponse = await axios.get(`https://fivefood.shop/api/teacherinfos/${id}`);

        const teacherResponse = await axios.put(`https://fivefood.shop/api/teacherinfos/${id}`, valueTeacher);

        if (teacherResponse.status === 200) {
          toast.success('Tạo giảng viên thành công');
          setActiveTab('general');
        } else {
          toast.error('Lỗi khi thêm giảng viên');
        }
      }

      // reset();
      // setTimeout(() => {
      //   navigate('/leadership/all-teacher-profiles');
      // }, 2000);
    } catch (err) {
      toast.error('Lỗi khi thêm');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const getUse = async () => {
      // const id = cookies.userId;

      try {
        const response = await axios.get(`https://fivefood.shop/api/users/${teacherData.userId}`);
        setUse(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user:', error);
      }
    };

    getUse();
  }, [id]);
  useEffect(() => {
    if (Use?.placeBirth) {
      reset((prev) => ({
        ...prev,
        placeBirth: Use.placeBirth,
      }));
    }
  }, [Use?.placeBirth]);
  useEffect(() => {
    if (teacherData?.birthDate) {
      reset((prev) => ({
        ...prev,
        dob: dayjs(teacherData.birthDate),
      }));
    }
  }, [teacherData?.birthDate]);
  useEffect(() => {
    if (teacherInfo?.issuedDate) {
      reset((prev) => ({
        ...prev,
        issuedDate: teacherInfo?.issuedDate ? dayjs(teacherInfo.issuedDate) : null,
      }));
    }
  }, [teacherInfo?.issuedDate]);
  useEffect(() => {
    if (teacherFamily?.enrollmentDate) {
      reset((prev) => ({
        ...prev,
        enrollmentDate: teacherFamily?.enrollmentDat ? dayjs(teacherFamily?.enrollmentDat) : null,
      }));
    }
  }, [teacherFamily?.enrollmentDat]);
  const getAddress = async () => {
    try {
      const response = await axios.get('https://fivefood.shop/api/address/provinces');
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict(null);

    setWards([]);
    setValue('provinceCode', Number(provinceId));
    // Gọi API lấy quận/huyện theo tỉnh đã chọn
    axios.get(`https://fivefood.shop/api/address/districts?provinceId=${provinceId}`).then((res) => {
      setDistricts(res.data.data);
    });
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    setValue('districtCode', Number(districtId));
    // Gọi API lấy xã/phường theo quận đã chọn
    axios.get(`https://fivefood.shop/api/address/wards?districtId=${districtId}`).then((res) => {
      setWards(res.data.data);
    });
  };
  const handleWardChange = (wardId: string) => {
    setValue('wardCode', Number(wardId));
  };

  useEffect(() => {
    getAddress();
    fetchDataSubject();
    fetchDataYear();
    fetchDataPosition();
  }, []);
  return (
    <div className="whitespace-nowrap">
      <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
        {/* <AddressList addressList={urls} /> */}

        <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-background-2 text-white p-4 font-bold text-lg">Thêm mới giáo viên</div>
            <div className="p-6 flex gap-x-8 items-start overflow-x-auto">
              {/* Avatar */}
              <div className="relative w-60 h-60 grid grid-cols-1 rounded-full object-cover">
                {/* Avatar */}
                {/* <img src={previewAvatar} alt="Avatar" className="w-60 h-60 rounded-full object-cover border-2 border-gray-300" /> */}
                <img
                  src={previewAvatar || Use?.avatarUrl || defaultAvatar}
                  alt="Avatar"
                  className="w-60 h-60 rounded-full object-cover border-2 border-gray-300"
                />

                {/* Button Upload */}
                <label className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                  </svg>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* Nội dung thông tin */}
              <div className="grid grid-cols-3 gap-x-8 min-w-[1250px]">
                {/* Cột 1 */}
                <div className="space-y-4">
                  <p>
                    <strong className="text-orange-text">Thông tin giảng viên</strong>
                  </p>

                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Mã giảng viên:</strong>
                    <div className="w-full">
                      <input
                        type="text"
                        id="code"
                        className="w-full border rounded-[8px] p-2"
                        {...register('code', { required: 'Mã giảng viên là bắt buộc' })}
                        readOnly={isAutoGenerate}
                        disabled
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1 p-0">{errors.code.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Tổ - Bộ môn:</strong>

                    <div className="relative w-full">
                      <Controller
                        name="subjectId"
                        control={control}
                        rules={{ required: true }} // Validation không được để trống
                        render={({ field }) => (
                          <Dropdown
                            options={option_subject}
                            selectedOption={selectedSubject}
                            placeholder="Tổ - Bộ môn"
                            showArrow={true}
                            handleOptionClick={selectedSubjectoption}
                            headerClassName="w-full"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Chức vụ:</strong>
                    <div className="relative w-full">
                      <Controller
                        name="position"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Dropdown
                            options={option_position}
                            selectedOption={selectedOption}
                            placeholder="Chọn Chức vụ:"
                            showArrow={true}
                            handleOptionClick={selectedTeaching}
                            headerClassName="w-full"
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-8">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Họ và tên:</strong>
                    <div className="w-full">
                      <input type="text" className="w-full border rounded-[8px] p-2" {...register('fullName', { required: 'Họ tên là bắt buộc' })} />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1 p-0">{errors.fullName.message}</p>}
                    </div>
                  </div> */}
                  <div className="flex items-center gap-8">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Họ và tên:</strong>
                    <div className="w-full">
                      <input type="text" className="w-full border rounded-[8px] p-2" {...register('fullName', { required: 'Họ tên là bắt buộc' })} />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1 p-0">{errors.fullName.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-9">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày sinh:</strong>
                    <div className="w-full">
                      <Controller
                        name="dob"
                        control={control}
                        rules={{
                          required: 'Ngày sinh là bắt buộc',
                          validate: (value) => {
                            // Kiểm tra xem giá trị có hợp lệ hay không
                            if (!value) {
                              return 'Ngày sinh là bắt buộc';
                            }

                            const birthDate = dayjs(value).toDate();
                            const today = new Date();
                            const age = today.getFullYear() - birthDate.getFullYear();
                            const monthDifference = today.getMonth() - birthDate.getMonth();
                            const dayDifference = today.getDate() - birthDate.getDate();
                            if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
                              return 'Bạn phải trên 18 tuổi';
                            }

                            return true;
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <div>
                            <DateInput
                              value={field.value} // Truyền giá trị từ form
                              onChange={(date) => {
                                field.onChange(date); // Cập nhật giá trị khi thay đổi
                              }}
                              width="100%"
                              className="border-gray-300"
                            />

                            {/* Hiển thị lỗi nếu có */}
                            {fieldState?.error && <p className="text-red-500 text-sm mt-1 p-0">{fieldState?.error.message}</p>}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-9">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Giới tính:</strong>
                    <div className="relative w-full">
                      <Controller
                        name="gender"
                        control={control}
                        rules={{
                          validate: (value) => (typeof value === 'boolean' ? true : 'Giới tính là bắt buộc'),
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <Dropdown
                              options={gender}
                              selectedOption={selectedOptionGender}
                              placeholder="Giới tính"
                              showArrow={true}
                              handleOptionClick={(option) => {
                                selectedGender(option); // update UI
                                field.onChange(option.value === 'true'); // update form
                              }}
                              headerClassName="w-full"
                            />
                            {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-9">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Dân tộc:</strong>
                    <div className="relative w-full">
                      <Controller
                        name="nation"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Dropdown
                            options={option_nation}
                            selectedOption={selectedNation}
                            placeholder="Dân tộc"
                            showArrow={true}
                            handleOptionClick={selectedNationoption}
                            headerClassName="w-full z-1000"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-32">Ngày vào trường:</strong>
                    <div className="w-full">
                      <Controller
                        name="enrollmentDate"
                        control={control}
                        render={({ field }) => (
                          <DateInput
                            value={field.value}
                            onChange={(date) => {
                              field.onChange(date);
                              handlEnrollmentDate?.(date);
                            }}
                            width="100%"
                            className="border-gray-300"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* Cột 2 */}
                <div className="space-y-4">
                  <p>
                    <strong className="text-white">Thông tin khác</strong>
                  </p>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Quốc tịch:</strong>
                    <div className="relative w-full">
                      <input type="text" className="w-full border rounded p-2 pr-10" value={'Việt nam'} />
                      <img src={down} alt="icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Tôn giáo:</strong>
                    <div className="relative w-full">
                      <Controller
                        name="religion"
                        control={control}
                        rules={{ required: true }} // Validation không được để trống
                        render={({ field }) => (
                          <Dropdown
                            options={option_religion}
                            selectedOption={selectedReligion}
                            placeholder="Tôn giáo"
                            showArrow={true}
                            handleOptionClick={selectedReligionoption}
                            headerClassName="w-full z-1000"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Trạng thái:</strong>
                    <div className="relative w-full">
                      <Controller
                        name="userStatusId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Dropdown
                            options={option_status}
                            selectedOption={selectedStatus}
                            placeholder="Trạng thái"
                            showArrow={true}
                            handleOptionClick={selectedStatusoption}
                            headerClassName="w-full z-1000"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-gray-500 whitespace-nowrap">Môn kiêm nhiệm:</strong>
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex flex-wrap gap-2">
                        {selectedSubjects.map((subject, index) => (
                          <span key={index} className="bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-full flex items-center gap-1">
                            {subject}
                            <button onClick={toggleSubject.bind(null, subject)} type="button" className="text-white font-bold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-x-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="w-full flex">
                        <button
                          onClick={setIsModalOpen.bind(null, true)}
                          type="button"
                          className="bg-blue-500 text-white px-3 py-1 rounded-full inline-flex items-center gap-2 mt-2"
                        >
                          Thêm
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-plus-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                      <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold">Thêm môn kiêm nhiệm</h2>
                        <div className="mt-4">
                          <p className="font-semibold text-orange-500">Danh sách môn học</p>
                          <div className="flex flex-wrap gap-2 mt-2 whitespace-nowrap">
                            {allSubjects.map((subject) => (
                              <button
                                key={subject}
                                type="button"
                                onClick={() => toggleSubject(subject)}
                                className={`px-3 py-1 rounded-full ${
                                  selectedSubjects.includes(subject) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                              >
                                {subject}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 flex justify-center gap-2">
                          <Button onClick={setIsModalOpen.bind(null, false)} className="secondary">
                            Hủy
                          </Button>
                          <Button onClick={setIsModalOpen.bind(null, false)} className="primary">
                            Lưu
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Bí danh:</strong>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                </div>

                {/* Cột 3 */}
                <div className="space-y-4">
                  <p>
                    <strong className="text-orange-text">Địa chỉ liên hệ</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Tỉnh/Thành:</strong>
                    <select
                      className="w-full w-[150px] border rounded p-2 whitespace-nowrap"
                      {...register('provinceCode', { required: 'Vui lòng chọn tỉnh/thành' })}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {provinces.map((p) => (
                        <option key={p.provinceId} value={p.provinceId}>
                          {p.provinceName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quận/Huyện */}
                  <div className="flex items-center gap-1">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Quận/Huyện:</strong>
                    <select
                      className="w-full border rounded p-2 whitespace-nowrap"
                      {...register('districtCode', { required: 'Vui lòng chọn quận/huyện' })}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!selectedProvince}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {Array.isArray(districts) && districts.length > 0 ? (
                        districts.map((d) => (
                          <option key={d.districtId} value={d.districtId}>
                            {d.districtName}
                          </option>
                        ))
                      ) : (
                        <option value="">Không có dữ liệu</option> // Hiển thị thông báo khi districts là rỗng hoặc không phải mảng
                      )}
                    </select>
                  </div>

                  {/* Xã/Phường */}
                  <div className="flex items-center gap-3">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Xã/Phường:</strong>
                    <select
                      className="w-full border rounded p-2 whitespace-nowrap"
                      {...register('wardCode', { required: 'Vui lòng chọn Xã/phường' })}
                      disabled={!selectedDistrict}
                      onChange={(e) => handleWardChange(e.target.value)}
                    >
                      <option value="">Chọn xã/phường</option>

                      {Array.isArray(wards) && wards.length > 0 ? (
                        wards.map((w) => (
                          <option key={w.wardCode} value={w.wardCode}>
                            {w.wardName}
                          </option>
                        ))
                      ) : (
                        <option value="null">Không có dữ liệu</option>
                      )}
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Địa chỉ</strong>
                    <div className="w-full">
                      <input type="text" className="w-full border rounded p-2" {...register('addressFull', { required: 'Địa chỉ là bắt buộc' })} />
                      {errors.addressFull && <p className="text-red-500 text-sm mt-1 p-0">{errors.addressFull.message}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Email:</strong>
                    <div className="w-full">
                      <input
                        type="text"
                        className="w-full border rounded p-2"
                        {...register('email', {
                          required: 'Email là bắt buộc',
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Email không hợp lệ',
                          },
                        })}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1 p-0">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">SĐT:</strong>

                    <div className="w-full">
                      <input
                        type="text"
                        className="w-full border rounded p-2"
                        {...register('phoneNumber', {
                          required: 'Số điện thoại là bắt buộc',
                          pattern: {
                            value: /^(0[3|5|7|8|9])[0-9]{8}$/,
                            message: 'Số điện thoại không hợp lệ',
                          },
                        })}
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-1 p-0">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="p-6 flex gap-x-8 items-start overflow-x-auto">
              {/* Avatar */}
              <div className="relative w-60 h-60 grid grid-cols-1 rounded-full object-cover"></div>

              {/* Nội dung thông tin */}
              <div className="grid grid-cols-3 gap-x-8 min-w-[1250px]">
                {/* Cột 1 */}
                <div className="space-y-4">
                  <p>
                    <strong className="text-orange-text">Thông tin cá nhân</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-500 whitespace-nowrap">Căn cước công dân:</strong>
                    <div className="w-full">
                      <input
                        type="text"
                        className="w-full border rounded p-2"
                        {...register('cccd', {
                          required: 'Căn cước công dân là bắt buộc',
                          pattern: {
                            value: /^[0-9]{12}$/,
                            message: 'Căn cước công dân phải có 12 số',
                          },
                        })}
                      />
                      {errors.cccd && <p className="text-red-500 text-sm mt-1 p-0">{errors.cccd.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày cấp căn cước:</strong>
                    <div className="w-full">
                      <Controller
                        name="issuedDate"
                        control={control}
                        render={({ field }) => (
                          <DateInput
                            value={field.value}
                            onChange={(date) => {
                              field.onChange(date); // cập nhật giá trị trong form
                              handleIssuedDate?.(date); // nếu bạn cần xử lý thêm ngoài form
                            }}
                            width="100%"
                            className="border-gray-300"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Nơi cấp căn cước:</strong>
                    <div className="w-full">
                      <input
                        type="text"
                        // value={teacherInfo?.issuedPlace ?? null}
                        className="w-full border rounded p-2"
                        {...register('issuedPlace', {
                          required: 'Nơi cấp không được để trống', // Bắt lỗi không để trống
                        })}
                      />
                      {errors.issuedPlace && <p className="text-red-500 text-sm mt-1 p-0">{errors.issuedPlace.message}</p>}
                    </div>
                  </div>
                </div>
                {/* Cột 2 */}
                <div className="space-y-4">
                  <p className="p-5"></p>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-5 w-5" onChange={setUsUnionPlace.bind(null, !isUnionPlace)} />
                    <span className="text-gray-500">Đoàn viên</span>
                  </div>
                  {/* 
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày cấp căn cước:</strong>
                    <div className="w-full">
                      <Controller
                        name="issuedDate"
                        control={control}
                        render={({ field }) => (
                          <DateInput
                            value={field.value}
                            onChange={(date) => {
                              field.onChange(date); // cập nhật giá trị trong form
                              handleIssuedDate?.(date); // nếu bạn cần xử lý thêm ngoài form
                            }}
                            width="100%"
                            className="border-gray-300"
                          />
                        )}
                      />
                    </div>
                  </div> */}

                  <div className="flex items-center gap-2 relative">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày vào đoàn:</strong>
                    <Controller
                      name="unionDate"
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={(date) => {
                            field.onChange(date); // cập nhật giá trị trong form
                            handleUnionDate?.(date); // nếu bạn cần xử lý thêm ngoài form
                          }}
                          width="100%"
                          className="border-gray-300"
                        />
                      )}
                    />
                    {/* <DateInput {...register('unionDate')} onChange={handleUnionDate} width="100%" className="border-gray-300" /> */}
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Nơi sinh:</strong>
                    <div className="relative w-full">
                      <input
                        // value={Use.placeBirth}
                        type="text"
                        className="w-full border rounded p-2 pr-10"
                        {...register('placeBirth', { required: 'Nơi sinh là bắt buộc' })}
                      />
                      {errors.placeBirth && <p className="text-red-500 text-sm mt-1 p-0">{errors.placeBirth.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Cột 3 */}

                <div className="space-y-4">
                  <p className="p-5"></p>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5" onChange={setIsPartyMember.bind(null, !isPartyMember)} />
                    <span className="text-gray-500">Đảng viên</span>
                  </div>

                  <div className="flex items-center gap-4 relative">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày vào đảng:</strong>
                    <Controller
                      name="partyDate"
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={(date) => {
                            field.onChange(date); // cập nhật giá trị trong form
                            handlePartyDate?.(date); // nếu bạn cần xử lý thêm ngoài form
                          }}
                          width="100%"
                          className="border-gray-300"
                        />
                      )}
                    />
                    {/* <DateInput
                      value={isPartyMember ? teacherInfo?.partyDate ?? null : null}
                      onChange={handlePartyDate}
                      width="100%"
                      className="border-gray-300"
                    /> */}
                  </div>
                </div>

                {/* <div className="space-y-4">
                  <p className="p-5"></p>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="partyMember"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="w-5 h-5" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                          <span className="text-gray-500">Đảng viên</span>
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex items-center gap-4 relative">
                    <strong className="text-gray-500 whitespace-nowrap w-40">Ngày vào đảng:</strong>
                    <DateInput
                      value={isPartyMember ? teacherInfo?.partyDate ?? null : null}
                      onChange={handlePartyDate}
                      width="100%"
                      className="border-gray-300"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherProfileEdit;
