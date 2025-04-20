import React, { useEffect, useRef, useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Card from '../../../components/Card';
import UserDefaultAVT from '../../../assets/images/people/leadership/user-default-avt.png';
import CameraEdit from '../../../assets/images/people/leadership/camera edit.png';
import { DropdownOption } from '../../../components/Dropdown/type';
import Button from '../../../components/Button';
import LeftForm from './LeftForm';
import RightForm from './RightForm';
import AddressForm from './AddressForm';
import FamilyForm from './FamilyForm';
import { useForm } from 'react-hook-form';
import './styles.css';
import createAxiosInstance from '../../../utils/axiosInstance';
import Loading from '../../../components/Loading';
import { toast } from 'react-toastify';
import { imageToBase64 } from '../../../utils/base64Encode';
import { handleCreateUser, handleUpdateUser } from './services';
import { useLocation, useNavigate } from 'react-router';
import { parseString } from '../../../utils/parseBoolean';
import StudyProcess from '../StudyProcess';

interface stdCUDProps {
  isUpdate?: boolean;
}
export type StudentDetail = {
  id: number;
  code: string;
  fullName: string;
  dob: string;
  gender: boolean;
  email: string;
  phoneNumber: string;
  placeBirth: string;
  nation: string;
  religion: string;
  enrollmentDate: string;
  roleId: number;
  academicYearId: number;
  userStatusId: number;
  classId: number;
  gradeLevelId: number;
  entryType: number;
  addressFull: string;
  street: string;
  active: boolean;
  avatarUrl: string;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  roleName: string;
};

const StudentCU = (props: stdCUDProps) => {
  const [loading, setLoading] = useState(false);
  const locotor = useLocation();

  const { studentId } = locotor?.state || {};
  const [sst, setSelectedStudent] = useState<StudentDetail>();

  const axiosTrue = createAxiosInstance(true);

  const getSelectedStudent = async () => {
    const response = await axiosTrue.get(`api/users/${studentId}`);
    if (response?.data && response?.data?.code === 0) {
      setSelectedStudent(response?.data?.data);
    }
  };
  // useEffect(() => {
  //   if (!studentId) return;
  //   getSelectedStudent();
  // }, [studentId]);
  useEffect(() => {
    if (sst) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const [classRes, districtRes, wardRes, familyRes] = await Promise.all([
            axiosTrue.get(`api/class/by-grade-academic?gradeLevelId=${sst?.gradeLevelId}&sortColumn=id&sortOrder=asc`),
            axiosTrue.get(`api/address/districts?provinceId=${sst?.provinceCode}`),
            axiosTrue.get(`api/address/wards?districtId=${sst?.districtCode}`),
            axiosTrue.get(`api/studentinfos/user/${sst?.id}`),
          ]);
          setClasses(classRes?.data?.data?.map((item: any) => ({ label: item.name, value: item.id })));
          setDistricts(districtRes?.data?.data?.map((item: any) => ({ label: item.districtName, value: item.districtId })));
          setWards(wardRes?.data?.data?.map((item: any) => ({ label: item.wardName, value: item.wardCode })));

          const familyArray = Array.isArray(familyRes.data.data) ? familyRes.data.data : [];

          const sortedFamily = [{}, {}, {}];
          familyArray.forEach((item: any) => {
            const role = parseInt(item.guardianRole, 10); // ép về số
            sortedFamily[role] = {
              guardianName: item.guardianName,
              guardianBornDate: item.guardianDob && item.guardianDob !== '0001-01-01T00:00:00' ? new Date(item.guardianDob) : null,
              guardianJob: item.guardianJob || '',
              guardianPhone: item.guardianPhone || '',
              guardianRole: role,
            };
          });
          const mappedFamily = sortedFamily.map((item) => item || {});

          reset({
            fullname: sst?.fullName,
            birthPlace: sst?.placeBirth,
            folk: sst?.nation,
            religion: sst?.religion,
            gender: sst?.gender ? { label: 'Nam', value: 'true' } : { label: 'Nữ', value: 'false' },
            birthday: new Date(sst?.dob),

            addressDetail: sst?.street,
            email: sst?.email,
            phone: sst?.phoneNumber,

            academicYear: courses.find((item) => item.value == parseString(sst?.academicYearId)),
            grade: grades.find((item) => item.value == parseString(sst?.gradeLevelId)),
            class: classRes?.data?.data
              ?.map((item: { id: number; name: string }) => ({
                label: item?.name,
                value: item?.id,
              }))
              ?.find((c: any) => c.value == sst?.classId),
            code: sst?.code,
            enrollmentDate: new Date(sst?.enrollmentDate),
            entry: entries.find((item) => item.value == parseString(sst?.entryType)),
            status: statuses.find((item) => item.value == parseString(sst?.userStatusId)),

            province: provinces.find((item) => item.value == parseString(sst?.provinceCode)),
            district: districtRes?.data?.data
              ?.map((item: any) => ({ label: item.districtName, value: item.districtId }))
              .find((d: any) => d.value == sst?.districtCode),
            ward: wardRes?.data?.data
              ?.map((item: any) => ({ label: item.wardName, value: item.wardCode }))
              .find((w: any) => w.value == sst?.wardCode),
            family: mappedFamily,
          });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [sst]);

  useEffect(() => {
    if (sst) {
      console.log(sst);
    }
  }, [sst]);

  type familyMembers = {
    guardianName: string;
    guardianRole: number;
    guardianBornDate: Date | null;
    guardianPhone: string;
    guardianJob: string;
  };
  type formType = {
    fullname: string;
    gender: DropdownOption | null;
    birthday: Date | null;
    birthPlace: string;
    folk: string;
    religion: string;

    academicYear: DropdownOption | null;
    grade: DropdownOption | null;
    class: DropdownOption | null;
    code: string;
    enrollmentDate: Date | null;
    status: DropdownOption | null;
    entry: DropdownOption | null;

    province: DropdownOption | null;
    district: DropdownOption | null;
    ward: DropdownOption | null;
    addressDetail: string;
    email: string;
    phone: string;

    birthdayString: string;

    family: familyMembers[] | null;
  };
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    clearErrors,
    reset,
  } = useForm<formType>({
    defaultValues: {
      fullname: '',
      gender: null,
      birthday: null,
      birthPlace: '',
      folk: '',
      religion: '',
      academicYear: null,
      grade: null,
      class: null,
      birthdayString: '',
      code: '',
      enrollmentDate: new Date(),
      status: null,
      entry: null,
      province: null,
      district: null,
      ward: null,
      addressDetail: '',
      email: '',
      phone: '',
      family: [{ guardianName: '', guardianRole: undefined, guardianBornDate: null, guardianJob: '', guardianPhone: '' }],
    },
  });

  const validTrigger = async () => {
    return await trigger([
      'fullname',
      'birthday',
      'gender',
      'birthPlace',
      'folk',
      'religion',
      'academicYear',
      'grade',
      'class',
      'code',
      'enrollmentDate',
      'status',
      'entry',
      'province',
      'district',
      'ward',
      'addressDetail',
      'email',
      'phone',
      'family',
    ]);
  };

  const addressList = [
    { linkName: 'Hồ sơ học viên', link: '/leadership/all-student-profiles' },
    { linkName: `${props.isUpdate ? sst?.fullName : 'Thêm học viên'}`, link: '/leadership/new-student' },
  ];

  const [selectedImage, setSelectedImage] = useState<string>(UserDefaultAVT);
  const cameraEditRef = useRef<HTMLInputElement>(null);

  const handleActiveCameraEdit = () => {
    if (cameraEditRef.current) {
      cameraEditRef.current.click();
    }
  };

  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await imageToBase64(file);
      setSelectedImage(base64);
    }
  };

  useEffect(() => {
    console.log('Selected image updated:', selectedImage);
  }, [selectedImage]);

  const [courses, setCourses] = useState<DropdownOption[]>([]);
  const [grades, setGrades] = useState<DropdownOption[]>([]);
  const [classes, setClasses] = useState<DropdownOption[]>([]);
  const [entries, setEntries] = useState<DropdownOption[]>([]);
  const [statuses, setStatuses] = useState<DropdownOption[]>([]);

  const [provinces, setProvinces] = useState<DropdownOption[]>([]);
  const [districts, setDistricts] = useState<DropdownOption[]>([]);
  const [wards, setWards] = useState<DropdownOption[]>([]);

  const [studentCount, setStudentCount] = useState<number>(0);

  // Niên khóa
  const handleGetAcademicYears = async () => {
    const response = await axiosTrue.get(`api/academic-years?sortColumn=id`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
    setCourses(data);
  };

  // Khối & lớp
  const handleGetGrades = async () => {
    const response = await axiosTrue.get(`api/grade-levels?page=1&pageSize=10&sortColumn=Id&sortOrder=asc`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id,
    }));
    setGrades(data);
  };
  const handleGetClasses = async (selectedGradeValue: any) => {
    const isValid = await trigger('grade');
    if (isValid) {
      const response = await axiosTrue.get(`api/class/by-grade-academic?gradeLevelId=${selectedGradeValue}&sortColumn=id&sortOrder=asc`);
      const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
        label: item?.name,
        value: item?.id,
      }));
      setClasses(data);
    }
  };

  // Hình thức nhập học
  const handleGetEntry = async () => {
    const response = await axiosTrue.get(`api/entrytype?page=1&sortColumn=Id&sortOrder=asc`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id,
    }));
    setEntries(data);
  };

  // Trạng thái nhập học
  const handleGetStatuses = async () => {
    const response = await axiosTrue.get(`api/user-statuses?page=1&sortColumn=Id&sortOrder=asc`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id,
    }));
    setStatuses(data);
  };

  // Tỉnh/thành phố
  const handleGetProvinces = async () => {
    const response = await axiosTrue.get(`api/address/provinces`);
    const data = response?.data?.data?.map((item: { provinceId: number; provinceName: string }) => ({
      label: item?.provinceName,
      value: item?.provinceId,
    }));
    setProvinces(data);
  };

  // Huyện/quận
  const handleGetDistricts = async (provinceId: any) => {
    const isValid = await trigger('province');
    if (isValid) {
      const response = await axiosTrue.get(`api/address/districts?provinceId=${provinceId}`);
      const data = response?.data?.data?.map((item: { districtId: number; districtName: string }) => ({
        label: item?.districtName,
        value: item?.districtId,
      }));
      setDistricts(data);
    }
  };

  // Xã/phường
  const handleGetWards = async (districtId: any) => {
    const isValid = await trigger('district');
    if (isValid) {
      const response = await axiosTrue.get(`api/address/wards?districtId=${districtId}`);
      const data = response?.data?.data?.map((item: { wardCode: number; wardName: string }) => ({
        label: item?.wardName,
        value: item?.wardCode,
      }));
      setWards(data);
    }
  };

  // Học viên
  const handleGetStudents = async () => {
    const response = await axiosTrue.post('api/users/GetQuantityUserByRoleId/3');
    const data = response?.data?.data;
    setStudentCount(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          handleGetAcademicYears(),
          handleGetGrades(),
          handleGetEntry(),
          handleGetStatuses(),
          handleGetProvinces(),
          handleGetStudents(),
          studentId && getSelectedStudent(),
        ]);
      } catch (error) {
        console.log(error);
        toast.error('Có lỗi khi lấy dữ liệu!');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedGrade = watch('grade');
  useEffect(() => {
    if (selectedGrade) {
      try {
        setLoading(true);
        handleGetClasses(selectedGrade?.value);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy danh sách lớp học');
      } finally {
        setLoading(false);
      }
    }
  }, [selectedGrade]);

  const selectedProvince = watch('province');
  useEffect(() => {
    if (selectedProvince) {
      handleGetDistricts(selectedProvince?.value);
    }
  }, [selectedProvince]);

  const selectedDistrict = watch('district');
  useEffect(() => {
    if (selectedDistrict) {
      handleGetWards(selectedDistrict?.value);
    }
  }, [selectedDistrict]);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckTuSinhMa = async () => {
    setIsChecked(!isChecked);
  };

  const generateStudentCode = (quantity: number) => {
    const nextNumber = quantity + 1;
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    const currentYear = new Date().getFullYear();

    return `${currentYear}-HS${formattedNumber}`;
  };

  useEffect(() => {
    if (isChecked && studentCount) {
      const code = generateStudentCode(studentCount);
      setValue('code', code);
      clearErrors('code');
    } else {
      setValue('code', '');
    }
  }, [isChecked]);

  const handleCreate = async () => {
    const isValid = await validTrigger();
    if (isValid) {
      const data = getValues();

      handleCreateUser({ data, isValid, selectedImage, UserDefaultAVT, setLoading, reset });
    } else {
      toast.error('Thông tin cần thiết còn thiếu !');
    }
  };

  const handleUpdate = async () => {
    const isValid = await validTrigger();
    if (isValid) {
      const data = getValues();

      handleUpdateUser({ data, isValid, selectedImage, UserDefaultAVT, setLoading, reset }, Number(sst?.id));
    } else {
      toast.error('Thông tin cần thiết còn thiếu !');
    }
  };

  const [isProcessPage, setProcessPage] = useState<boolean>(false);
  const backgroundTrue = isProcessPage ? 'bg-[#373839] text-white' : 'bg-[#DBDBDB] text-[#373839]';
  const backgroundFalse = !isProcessPage ? 'bg-[#373839] text-white' : 'bg-[#DBDBDB] text-[#373839]';

  const navigator = useNavigate();
  return (
    <div className="pr-20 pl-10 content">
      <Loading isLoading={loading} />
      <AddressList addressList={addressList} />
      {studentId && (
        <div className=" w-[300px] mb-3 flex justify-between">
          <div>
            <button className={`px-3 py-1 rounded-full ${backgroundFalse}`} onClick={() => setProcessPage(false)}>
              Hồ sơ học viên
            </button>
          </div>
          <div>
            <button className={`px-3 py-1 rounded-full ${backgroundTrue}`} onClick={() => setProcessPage(true)}>
              Quá trình học tập
            </button>
          </div>
        </div>
      )}

      {!isProcessPage ? (
        <div>
          <Card size="full" variant="dark-primary" className="shadow-xl mb-5 overflow-auto">
            <Card.Header className="py-2">
              <p className="px-8 text-2xl font-bold text-white pb-0">Thông tin chung</p>
            </Card.Header>
            <Card.Body>
              <div className="px-8 flex justify-between mb-5">
                <div className="w-[15%] flex justify-center items-center relative h-max" onClick={handleActiveCameraEdit}>
                  <img
                    src={`${sst?.avatarUrl && selectedImage === UserDefaultAVT ? `${sst.avatarUrl}` : selectedImage}`}
                    alt="default-avt"
                    className="w-[160px] h-[160px] object-cover rounded-full"
                  />
                  <input id="cameraEdit" type="file" accept="image/*" ref={cameraEditRef} hidden onChange={handleImageChange} />
                  <img src={CameraEdit} alt="camera-edit" className="absolute bottom-0 size-12 translate-y-1/2 cursor-pointer" />
                </div>
                <div className="w-[81%]">
                  <p className="font-bold text-[#CC5C00] mb-3">Thông tin học viên</p>
                  <div className=" w-full flex justify-between">
                    <LeftForm register={register} errors={errors} watch={watch} setValue={setValue} setError={setError} clearError={clearErrors} />

                    <RightForm
                      isChecked={isChecked}
                      handleCheckTuSinhMa={handleCheckTuSinhMa}
                      register={register}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      setError={setError}
                      clearError={clearErrors}
                      courses={courses}
                      filteredClasses={classes}
                      grades={grades}
                      selectedGrade={selectedGrade}
                      entries={entries}
                      statuses={statuses}
                      selectedCode={sst?.code}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
            <hr className="h-[12px] bg-[#F2F2F2] shadow-[0px_4px_8px_0px_rgba(154,202,245,0.15)_inset]" />
            <Card.Body>
              <div className="px-8 flex justify-end">
                <div className="w-[81%]">
                  <p className="font-bold text-[#CC5C00] mb-3">Địa chỉ liên hệ</p>
                  <AddressForm
                    register={register}
                    watch={watch}
                    errors={errors}
                    clearError={clearErrors}
                    setValue={setValue}
                    provineces={provinces}
                    selectedProvince={selectedProvince}
                    districts={districts}
                    selectedDistrict={selectedDistrict}
                    wards={wards}
                    selectedStudent={sst}
                  />
                </div>
              </div>
            </Card.Body>
            <Card.Header className="py-2 mt-[30px]">
              <p className="px-8 text-2xl font-bold text-white pb-0">Thông tin gia đình <span className='font-medium text-[20px]'>*</span></p>
            </Card.Header>
            <Card.Body>
              <div className="px-8">
                <FamilyForm register={register} watch={watch} errors={errors} clearError={clearErrors} setValue={setValue} />
              </div>
            </Card.Body>
          </Card>
          <div className="w-full flex justify-center mb-5">
            <div className="w-[220px] flex justify-between">
              <Button className="secondary" children={'Hủy'} size="mini" onClick={()=> navigator('/leadership/all-student-profiles')}/>
              <Button className="primary" children={'Lưu'} size="mini" onClick={props.isUpdate ? handleUpdate : handleCreate} />
            </div>
          </div>{' '}
        </div>
      ) : (
        <StudyProcess />
      )}
    </div>
  );
};

export default StudentCU;
