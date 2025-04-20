import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Dropdown from '../../../../components/Dropdown';
import CalendarInput from '../../../../components/CalendarInput';
import Button from '../../../../components/Button';
import { DropdownOption } from '../../../../components/Dropdown/type';
import { Link } from 'react-router';
import createAxiosInstance from '../../../../utils/axiosInstance';
import axios from 'axios'; // Add this import
import ErrorBoundary from '../../../../components/ErrorBoundary';

interface Option {
  value: string;
  label: string;
}
interface FormData {
  image: File | null;
  schoolName: string;
  code: string;
  city: string;
  ward: string;
  district: string;
  headquarters: string;
  schoolType: string;
  phoneNumber: string;
  fax: string;
  email: string;
  establishedDate: string;
  educationModel: string;
  website: string;
  principal: string;
  principalPhone: string;
}

const data = [
  {
    img: 'https://s3-alpha-sig.figma.com/img/daf2/566e/e5dba64f0a04620e6e9082c0d7ac14e3?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Dj4cDkPommH2YiTrzTZAFi2DZ6aiXTnY7cGSJKxcR~ZRIyX4kYoH-v09~fPWeebSfQoFcaTY2eDZ5eOIuqav-rfUYDpP9T3D-2jbdLkr3tSB8w2PLPgNWMa0mnESGp3fUKU8i8sBlrTRvwLbqDfQsrM4sv~x9eEIEarcWXBgsniaULOqsMzFKcpI-GFpwae5gP8nYPd8od1pPo5KSl0F1ZciOQfSr6sLt8-bNT0~BsTowEnC~rFVL7z6KXp~hasug3v-Ga-c9pTYxzTBPdN7phVxJ1WEvQF43p85EiGbFi3Jdo-AlYY2K1OKNsPTuLUw9CgIWQMlt041lRLKpyNMSg__',
    coso: 'Trung học cơ sở Tự Lập Cơ Sở A',
    email: 'nguyesssss@gmail.com',
    ngphutrach: 'Nguyễn Văn A',
    address: '12 Nguyễn Văn A, phường 12 Quận 6, Tp. Hồ Chí Minh',
    mobile: '098998666',
    phoneSchoolNumber: '0998899988',
  },
  {
    img: 'https://s3-alpha-sig.figma.com/img/daf2/566e/e5dba64f0a04620e6e9082c0d7ac14e3?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Dj4cDkPommH2YiTrzTZAFi2DZ6aiXTnY7cGSJKxcR~ZRIyX4kYoH-v09~fPWeebSfQoFcaTY2eDZ5eOIuqav-rfUYDpP9T3D-2jbdLkr3tSB8w2PLPgNWMa0mnESGp3fUKU8i8sBlrTRvwLbqDfQsrM4sv~x9eEIEarcWXBgsniaULOqsMzFKcpI-GFpwae5gP8nYPd8od1pPo5KSl0F1ZciOQfSr6sLt8-bNT0~BsTowEnC~rFVL7z6KXp~hasug3v-Ga-c9pTYxzTBPdN7phVxJ1WEvQF43p85EiGbFi3Jdo-AlYY2K1OKNsPTuLUw9CgIWQMlt041lRLKpyNMSg__',
    coso: 'Trung học cơ sở Tự Lập Cơ Sở B',
    email: 'nguyesssss4@gmail.com',
    ngphutrach: 'Nguyễn Văn B',
    address: '12 Nguyễn Văn B, phường 11 Quận 3, Tp. Hồ Chí Minh',
    mobile: '0989921166',
    phoneSchoolNumber: '0998894458',
  },
];

const EditSchoolInFo: React.FC = () => {
  const { register, handleSubmit, control, setValue, watch } = useForm<FormData>();
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [schoolData, setSchoolData] = useState<any>(null);
  const axiosInstance = createAxiosInstance();
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const options: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];

  useEffect(() => {
    // Fetch school data
    axiosInstance
      .get('https://fivefood.shop/api/schools?page=1&pageSize=5&sortColumn=id&sortOrder=asc')
      .then((response) => {
        const school = response.data.data[0]; // Assuming the first school is being edited
        setSchoolData(school);

        // Populate form fields
        setValue('schoolName', school.name);
        setValue('code', school.code);
        setValue('city', school.provinceId.toString());
        setValue('district', school.districtId.toString());
        setValue('ward', school.wardId.toString());
        setValue('headquarters', school.headOffice ? 'Có' : 'Không');
        setValue('schoolType', school.schoolType);
        setValue('phoneNumber', school.phoneNumber);
        setValue('fax', '');
        setValue('email', school.email);
        setValue('establishedDate', school.establishedDate);
        setValue('educationModel', school.trainingModel);
        setValue('website', school.websiteUrl);
        setValue('principal', school.user.fullName);
        setValue('principalPhone', school.user.phoneNumber);
      })
      .catch((error) => {
        console.error('Failed to fetch school data:', error);
      });
  }, [setValue]);

  useEffect(() => {
    // Fetch provinces
    axios.get('https://provinces.open-api.vn/api/?depth=1')
      .then((res) => {
        setProvinces(res.data.map((p: any) => ({ value: p.code, label: p.name })));
      })
      .catch((error) => console.error('Failed to fetch provinces:', error));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // Fetch districts based on selected city
      axios.get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts.map((d: any) => ({ value: d.code, label: d.name })));
          setValue('district', ''); // Reset district
          setWards([]); // Reset wards
        })
        .catch((error) => console.error('Failed to fetch districts:', error));
    }
  }, [selectedCity, setValue]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch wards based on selected district
      axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => {
          setWards(res.data.wards.map((w: any) => ({ value: w.code, label: w.name })));
          setValue('ward', ''); // Reset ward
        })
        .catch((error) => console.error('Failed to fetch wards:', error));
    }
  }, [selectedDistrict, setValue]);

  useEffect(() => {
    // Fetch campus data
    axiosInstance.get('https://fivefood.shop/api/campuses?page=1&pageSize=5&sortColumn=id&sortOrder=asc')
      .then((response) => {
        setSchoolData(response.data.data); // Set campus data
      })
      .catch((error) => console.error('Failed to fetch campus data:', error));
  }, []);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [...schoolData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setSchoolData(updatedData);
  };
  const handleSubmitData = (data: FormData) => {
    console.log('Dữ liệu form:', data);
    console.log(schoolData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue('image', file);
    }
  };
  const handleImageCSChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setSchoolData((prevData: typeof data) =>
          prevData.map((item: (typeof data)[0], i: number) => (i === index ? { ...item, img: newImage } : item)),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ErrorBoundary>
      <div className="edit-information">
        <h1 className="text-3xl font-bold ml-6 text-black-text">Thông Tin Nhà Trường</h1>
        <div className="grid grid-cols-2 gap-2 mb-4 mt-9">
          <div className="col-span-1 flex items-center gap-2 ml-10">
            <Dropdown
              placeholder="Niên khóa"
              size="short"
              options={options}
              selectedOption={selectedOption}
              onSelect={(option) => setSelectedOption(option)}
              handleOptionClick={(option) => setSelectedOption(option)}
            />
          </div>
          <div className="col-span-1 flex justify-end gap-2 ml-10">
            <div className="flex mx-7">
              <Link to="/leadership/system-settings/school-info">
                <Button className="outline-secondary" size="mini" style={{ marginRight: '10px' }}>
                  Hủy
                </Button>
              </Link>
              <Button className="outline-primary" size="mini" onClick={handleSubmit(handleSubmitData)}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className="min-h-screen p-6">
          <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {/* Thông tin chung */}
            <div className="bg-orange-600 text-white p-3 font-semibold">
              <span>Thông tin chung</span>
            </div>
            <div className="p-6 flex items-start gap-4">
              <div className="relative w-[232px] h-[232px]">
                <label className="cursor-pointer block relative">
                  <img
                    src={
                      watch('image')
                        ? URL.createObjectURL(watch('image')!)
                        : 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Th%C3%A1i_Nguy%C3%AAn.svg'
                    }
                    alt="Preview"
                    className="object-contain col-span-1"
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#C9C4C0] p-2 rounded-full shadow mb-[-26px]">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#C9C4C0" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 22.6154C17.8627 22.6154 22.6154 17.8627 22.6154 12C22.6154 6.13729 17.8627 1.38462 12 1.38462C6.13729 1.38462 1.38462 6.13729 1.38462 12C1.38462 17.8627 6.13729 22.6154 12 22.6154ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="#C9C4C0"
                      />
                      <path
                        d="M16.5228 8.41056H15.6958L15.489 7.76089C15.355 7.37968 15.1063 7.04983 14.7776 6.81702C14.4488 6.58422 14.0561 6.45999 13.654 6.46155H10.3457C9.93967 6.46231 9.54409 6.59128 9.21484 6.83024C8.88559 7.0692 8.63929 7.4061 8.5107 7.79338L8.30393 8.44305H7.47687C6.96277 8.44305 6.46973 8.64839 6.1062 9.0139C5.74268 9.37941 5.53845 9.87515 5.53845 10.3921V15.5894C5.53845 16.1063 5.74268 16.6021 6.1062 16.9676C6.46973 17.3331 6.96277 17.5385 7.47687 17.5385H16.5228C17.0369 17.5385 17.53 17.3331 17.8935 16.9676C18.257 16.6021 18.4613 16.1063 18.4613 15.5894V10.3921C18.4655 10.1334 18.4186 9.87646 18.3231 9.63623C18.2276 9.396 18.0855 9.17729 17.9051 8.99285C17.7246 8.80842 17.5095 8.66194 17.2722 8.56197C17.0349 8.462 16.7801 8.41053 16.5228 8.41056ZM17.169 15.557C17.169 15.7293 17.1009 15.8945 16.9797 16.0163C16.8586 16.1382 16.6942 16.2066 16.5228 16.2066H7.47687C7.30551 16.2066 7.14116 16.1382 7.01998 16.0163C6.89881 15.8945 6.83073 15.7293 6.83073 15.557V10.3596C6.83073 10.1873 6.89881 10.022 7.01998 9.90019C7.14116 9.77835 7.30551 9.70991 7.47687 9.70991H8.76915C8.91006 9.7173 9.04949 9.67812 9.16617 9.59835C9.28284 9.51858 9.37034 9.4026 9.41529 9.26813L9.76421 8.20267C9.80756 8.07363 9.89014 7.96155 10.0003 7.88228C10.1104 7.803 10.2426 7.76054 10.378 7.76089H13.6863C13.8217 7.76054 13.9539 7.803 14.064 7.88228C14.1742 7.96155 14.2568 8.07363 14.3001 8.20267L14.649 9.26813C14.6905 9.39205 14.7682 9.50051 14.8719 9.57933C14.9757 9.65815 15.1007 9.70366 15.2306 9.70991H16.5228C16.6942 9.70991 16.8586 9.77835 16.9797 9.90019C17.1009 10.022 17.169 10.1873 17.169 10.3596V15.557ZM11.9999 9.70991C11.4887 9.70991 10.989 9.86232 10.564 10.1479C10.1389 10.4334 9.80765 10.8393 9.61203 11.3141C9.41641 11.789 9.36523 12.3115 9.46496 12.8156C9.56468 13.3197 9.81084 13.7827 10.1723 14.1461C10.5338 14.5096 10.9943 14.7571 11.4956 14.8574C11.997 14.9576 12.5167 14.9062 12.9889 14.7095C13.4612 14.5128 13.8648 14.1797 14.1488 13.7523C14.4328 13.325 14.5844 12.8226 14.5844 12.3086C14.5844 11.6194 14.3121 10.9584 13.8274 10.471C13.3427 9.9837 12.6853 9.70991 11.9999 9.70991ZM11.9999 13.6079C11.7443 13.6079 11.4944 13.5317 11.2819 13.389C11.0694 13.2462 10.9038 13.0433 10.8059 12.8058C10.7081 12.5684 10.6825 12.3072 10.7324 12.0551C10.7823 11.8031 10.9053 11.5715 11.0861 11.3898C11.2668 11.2081 11.4971 11.0844 11.7477 11.0342C11.9984 10.9841 12.2583 11.0098 12.4944 11.1082C12.7305 11.2065 12.9324 11.373 13.0743 11.5867C13.2163 11.8004 13.2921 12.0516 13.2921 12.3086C13.2921 12.6532 13.156 12.9837 12.9136 13.2274C12.6713 13.471 12.3426 13.6079 11.9999 13.6079Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled />
                </label>
              </div>
              <div className="text-sm w-[100%] ml-[40px]">
                <p className="font-semibold text-orange-600">Trung học cơ sở Tự Lập</p>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">Tên trường:</p>
                      <input {...register('schoolName')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Tên trường" />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Mã chuẩn:</p>
                      <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Mã chuẩn"
                            selectedOption={field.value ? { value: field.value, label: field.value } : null}
                            handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                            options={[
                              { value: '25609886', label: '25609886' },
                              { value: '43223456', label: '43223456' },
                            ]}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Tỉnh/Thành phố:</p>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Chọn tỉnh/thành"
                            selectedOption={field.value ? provinces.find((p) => p.value === field.value) ?? null : null}
                            handleOptionClick={(selectedOption) => {
                              field.onChange(selectedOption.value);
                              setSelectedCity(selectedOption.value);
                            }}
                            options={provinces}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Quận/Huyện:</p>
                      <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Chọn quận/huyện"
                            selectedOption={field.value ? districts.find((d) => d.value === field.value) ?? null : null}
                            handleOptionClick={(selectedOption) => {
                              field.onChange(selectedOption.value);
                              setSelectedDistrict(selectedOption.value);
                            }}
                            options={districts}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Xã/Phường:</p>
                      <Controller
                        name="ward"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Chọn xã/phường"
                            selectedOption={field.value ? wards.find((w) => w.value === field.value) ?? null : null}
                            handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                            options={wards}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Trụ sở chính:</p>
                      <input {...register('headquarters')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Trụ sở chính" />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Loại trường:</p>
                      <Controller
                        name="schoolType"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Loại trường"
                            selectedOption={field.value ? { value: field.value, label: field.value } : null}
                            handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                            options={[
                              { value: 'Tiểu học', label: 'Tiểu học' },
                              { value: 'Trung học cơ sở', label: 'Trung học cơ sở' },
                              { value: 'Trung học phổ thông', label: 'Trung học phổ thông' },
                            ]}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Số điện thoại:</p>
                      <input {...register('phoneNumber')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Số điện thoại" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">Fax:</p>
                      <input {...register('fax')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Fax" />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Email:</p>
                      <input {...register('email')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Email" />
                    </div>
                    <div className="flex justify-between calendar">
                      <p className="font-semibold">Ngày thành lập:</p>
                      <Controller
                        name="establishedDate"
                        control={control}
                        render={({ field }) => (
                          <CalendarInput selectedDate={field.value ? new Date(field.value) : null} onDateChange={field.onChange} />
                        )}
                      />
                    </div>
                    <div className="flex justify-between dropdown">
                      <p className="font-semibold">Mô hình đào tạo:</p>
                      <Controller
                        name="educationModel"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            placeholder="Loại trường"
                            selectedOption={field.value ? { value: field.value, label: field.value } : null}
                            handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                            options={[
                              { value: 'Công lập', label: 'Công lập' },
                              { value: 'Tư lập', label: 'Tư lập' },
                              { value: 'Dân lập', label: 'Dân lập' },
                            ]}
                            onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Website:</p>
                      <input {...register('website')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="website" />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Hiệu trưởng:</p>
                      <input {...register('principal')} className="border border-gray-300 p-2 rounded-[8px] w-2/3" placeholder="Hiệu trưởng" />
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Số hiệu trưởng:</p>
                      <input
                        {...register('principalPhone')}
                        className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                        placeholder="Số hiệu trưởng"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Danh sách cơ sở */}
            <div className="bg-orange-600 text-white font-semibold p-3 flex justify-between items-center">
              <span>Danh sách cơ sở</span>
            </div>
            <div className="bg-gray-200">
              {schoolData && schoolData.length > 0 ? (
                schoolData.map((item: any, index: number) => (
                  <div className="p-6 flex items-start gap-4 mb-3 bg-white" key={index}>
                    <div className="relative w-[232px] h-[232px]">
                      <label className="cursor-pointer block relative">
                        <img
                          src={
                            schoolData[index].img ||
                            'https://upload.wikimedia.org/wikipedia/vi/9/9f/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Th%C3%A1i_Nguy%C3%AAn.svg'
                          }
                          alt="Preview"
                          className="object-contain col-span-1"
                        />
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#CC5C00] p-2 rounded-full shadow mb-[-26px]">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#CC5C00" />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12 22.6154C17.8627 22.6154 22.6154 17.8627 22.6154 12C22.6154 6.13729 17.8627 1.38462 12 1.38462C6.13729 1.38462 1.38462 6.13729 1.38462 12C1.38462 17.8627 6.13729 22.6154 12 22.6154ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                              fill="#CC5C00"
                            />
                            <path
                              d="M16.5228 8.41056H15.6958L15.489 7.76089C15.355 7.37968 15.1063 7.04983 14.7776 6.81702C14.4488 6.58422 14.0561 6.45999 13.654 6.46155H10.3457C9.93967 6.46231 9.54409 6.59128 9.21484 6.83024C8.88559 7.0692 8.63929 7.4061 8.5107 7.79338L8.30393 8.44305H7.47687C6.96277 8.44305 6.46973 8.64839 6.1062 9.0139C5.74268 9.37941 5.53845 9.87515 5.53845 10.3921V15.5894C5.53845 16.1063 5.74268 16.6021 6.1062 16.9676C6.46973 17.3331 6.96277 17.5385 7.47687 17.5385H16.5228C17.0369 17.5385 17.53 17.3331 17.8935 16.9676C18.257 16.6021 18.4613 16.1063 18.4613 15.5894V10.3921C18.4655 10.1334 18.4186 9.87646 18.3231 9.63623C18.2276 9.396 18.0855 9.17729 17.9051 8.99285C17.7246 8.80842 17.5095 8.66194 17.2722 8.56197C17.0349 8.462 16.7801 8.41053 16.5228 8.41056ZM17.169 15.557C17.169 15.7293 17.1009 15.8945 16.9797 16.0163C16.8586 16.1382 16.6942 16.2066 16.5228 16.2066H7.47687C7.30551 16.2066 7.14116 16.1382 7.01998 16.0163C6.89881 15.8945 6.83073 15.7293 6.83073 15.557V10.3596C6.83073 10.1873 6.89881 10.022 7.01998 9.90019C7.14116 9.77835 7.30551 9.70991 7.47687 9.70991H8.76915C8.91006 9.7173 9.04949 9.67812 9.16617 9.59835C9.28284 9.51858 9.37034 9.4026 9.41529 9.26813L9.76421 8.20267C9.80756 8.07363 9.89014 7.96155 10.0003 7.88228C10.1104 7.803 10.2426 7.76054 10.378 7.76089H13.6863C13.8217 7.76054 13.9539 7.803 14.064 7.88228C14.1742 7.96155 14.2568 8.07363 14.3001 8.20267L14.649 9.26813C14.6905 9.39205 14.7682 9.50051 14.8719 9.57933C14.9757 9.65815 15.1007 9.70366 15.2306 9.70991H16.5228C16.6942 9.70991 16.8586 9.77835 16.9797 9.90019C17.1009 10.022 17.169 10.1873 17.169 10.3596V15.557ZM11.9999 9.70991C11.4887 9.70991 10.989 9.86232 10.564 10.1479C10.1389 10.4334 9.80765 10.8393 9.61203 11.3141C9.41641 11.789 9.36523 12.3115 9.46496 12.8156C9.56468 13.3197 9.81084 13.7827 10.1723 14.1461C10.5338 14.5096 10.9943 14.7571 11.4956 14.8574C11.997 14.9576 12.5167 14.9062 12.9889 14.7095C13.4612 14.5128 13.8648 14.1797 14.1488 13.7523C14.4328 13.325 14.5844 12.8226 14.5844 12.3086C14.5844 11.6194 14.3121 10.9584 13.8274 10.471C13.3427 9.9837 12.6853 9.70991 11.9999 9.70991ZM11.9999 13.6079C11.7443 13.6079 11.4944 13.5317 11.2819 13.389C11.0694 13.2462 10.9038 13.0433 10.8059 12.8058C10.7081 12.5684 10.6825 12.3072 10.7324 12.0551C10.7823 11.8031 10.9053 11.5715 11.0861 11.3898C11.2668 11.2081 11.4971 11.0844 11.7477 11.0342C11.9984 10.9841 12.2583 11.0098 12.4944 11.1082C12.7305 11.2065 12.9324 11.373 13.0743 11.5867C13.2163 11.8004 13.2921 12.0516 13.2921 12.3086C13.2921 12.6532 13.156 12.9837 12.9136 13.2274C12.6713 13.471 12.3426 13.6079 11.9999 13.6079Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageCSChange(index, e)} />
                      </label>
                    </div>
                    <div className="text-sm w-[100%] ml-[40px]">
                      <p className="font-semibold text-orange-600">{item.coso}</p>
                      <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <p className="font-semibold">Email: </p>
                            <input
                              className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                              placeholder="Email"
                              value={schoolData[index].email}
                              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between">
                            <p className="font-semibold">SDT trường: </p>
                            <input
                              className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                              placeholder="Số điện thoại trường"
                              value={schoolData[index].phoneSchoolNumber}
                              onChange={(e) => handleInputChange(index, 'phoneSchoolNumber', e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between">
                            <p className="font-semibold">Địa chỉ: </p>
                            <input
                              className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                              placeholder="Địa chỉ"
                              value={schoolData[index].address}
                              onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <p className="font-semibold">Người phụ trách: </p>
                            <input
                              className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                              placeholder="Người phụ trách"
                              value={schoolData[index].ngphutrach}
                              onChange={(e) => handleInputChange(index, 'ngphutrach', e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between">
                            <p className="font-semibold">Di động: </p>
                            <input
                              className="border border-gray-300 p-2 rounded-[8px] w-2/3"
                              placeholder="Di động"
                              value={schoolData[index].mobile}
                              onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Không có dữ liệu cơ sở.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditSchoolInFo;
