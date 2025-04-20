import React, { useEffect, useState } from 'react';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import AddressList from '../../../../components/AddressUrlStack/Index';
import DateInput from '../../../../components/Date';
import dayjs, { Dayjs } from 'dayjs';
import { ClassItem, TestFormData } from './type';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import { Controller, useForm } from 'react-hook-form';
import Spinner from '../../../../components/Spinner';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import DropdownTimeSelection from '../../../../components/DropdownTimeSelection/DropdownTimeSelection';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
const labels = [
  { link: "", linkName: "Bài kiểm tra" },
  { link: "", linkName: "Thêm bài kiểm tra mới" },
];


const option_hours = ['0', '1', '2', '3'];
const option_minutes = ['00', '10', '15', '30', '45'];

const option_selectType = [
  { label: 'Kiểm tra 15p', value: '0' },
  { label: 'Giữa kỳ I', value: '1' },
  { label: 'Cuối Học kỳ I', value: '2' },
  { label: 'Giữa kỳ II', value: '3' },
  { label: 'Cuối Học kỳ II', value: '4' },
];

type FileType = "doc" | "ppt" | "xlsx" | "jpeg";
const AddTest: React.FC = () => {
  const defaultPayload: TestFormData = {
    id: 0,
    name: "",
    type: 0,
    durationTime: 0,
    startTime: null,
    endTime: null,
    file: '',
    description: "",
    classIds: "",
    fileSubmit: false,
    gradeLevelsId: 0,
    subjectId: 0,
    teacherId: 0,
    classify: 0
  };
  const [formData, setFormData] = useState<TestFormData>(defaultPayload);
  const { register, reset, setError, setValue, control, clearErrors, handleSubmit, formState: { errors, isValid } } = useForm<TestFormData>();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [option_gradeLevel, setOptionGradeLevel] = useState([]);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [selectedMinute, setSelectedMinute] = useState<DropdownOption | null>(null);
  const [selectClassIfy, setSelectClassIfy] = useState<DropdownOption | null>(null);
  const [selectedGredeLevel, setSelectedGredeLevel] = useState<DropdownOption | null>(null);
  const [selectedHour, setSelectedHour] = useState<DropdownOption | null>(null);
  const [classOptions, setClassOptions] = useState<ClassItem[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<ClassItem[]>([]);

  const [cookies] = useCookies(["accessToken", "userId"]);

  const token = cookies.accessToken;
  const teacherId = cookies.userId;
  const axiosInstance = createAxiosInstance();
  const [checkedFiles, setCheckedFiles] = useState<Record<FileType, boolean>>({
    doc: false,
    ppt: false,
    xlsx: false,
    jpeg: false,
  });

  const fetchDataGradeLevel = async () => {
    try {
      const response = await axios.get('https://fivefood.shop/api/grade-levels');
      const filteredSubjects = response.data.data.map((subject: any) => ({
        label: subject.name,
        value: subject.id.toString()
      }));

      setOptionGradeLevel(filteredSubjects);
    } catch (err) {
      console.log('lỗi khi gọi api' + err);

    } finally {
      setLoading(false);  // Kết thúc việc gọi API
    }
  };

  const selectedGredeLeveloption = async (option: { label: string; value: string }) => {
    setSelectedGredeLevel(option);
    setValue('gradeLevelsId', Number(option.value))
    try {
      const response = await axios.get('https://fivefood.shop/api/class/by-grade-academic', {
        params: {
          page: 1,
          pageSize: 100,
          gradeLevelId: option.value,
          sortColumn: 'Id',
          sortOrder: 'asc'
        }
      });

      setClassOptions(response.data.data);

    } catch (err) {
      console.log("Lỗi khi gọi API lớp:", err);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setSelectedClasses(checked ? classOptions : []);
  };

  const toggleClass = (selectedClass: any) => {
    setSelectedClasses((prev) => {
      const exists = prev.find((cls) => cls.id === selectedClass.id);
      if (exists) {
        return prev.filter((cls) => cls.id !== selectedClass.id);
      } else {
        return [...prev, selectedClass];
      }
    });
  };

  // Xử lý khi chọn ngày
  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    setValue('startTime', date)
    clearErrors('startTime')
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    setValue('endTime', date)
    clearErrors('endTime')
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filess = event.target.files?.[0];
    if (filess) {
      setFormData((prev) => ({
        ...prev,
        file: filess,
      }));
      setValue('file', filess)
      setValue('fileSubmit', true)
    }
  };



  const handleToggleAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };
  const selectedClassIfyoption = (option: DropdownOption) => {
    setSelectClassIfy(option)
    setValue('classify', Number(option.value))
  }

  const handleCheckboxSettingChange = (id: FileType) => {
    setCheckedFiles((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  useEffect(() => {
    const h = Number(selectedHour?.value || 0);
    const m = Number(selectedMinute?.value || 0);
    setValue('durationTime', h * 60 + m, { shouldValidate: true });
  }, [selectedHour, selectedMinute, setValue])


  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const combineDateAndTime = (date: Date | null, time: string): Date | null => {
    if (!date) return null;
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const handleTimeStartChange = (newTime: string) => {
    setStartTime(newTime);
  };

  const handleTimeEndChange = (newTime: string) => {
    setEndTime(newTime);
  };

  const mergeDateAndTime = (date: dayjs.Dayjs, timeStr: string) => {
    const [hour, minute] = timeStr.split(':').map(Number);

    const localDate = dayjs.tz(date, 'Asia/Ho_Chi_Minh'); // convert về giờ VN

    const fullDateTime = localDate
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0);


    return fullDateTime.format('YYYY-MM-DDTHH:mm:ss'); // sẽ ra đúng giờ khi gửi lên backend
  };



  const onSubmit = async (data: TestFormData) => {
    try {
      const startDateTime = combineDateAndTime(startDate?.toDate() ?? null, startTime);
      const endDateTime = combineDateAndTime(endDate?.toDate() ?? null, endTime);
      if (!startDateTime || !endDateTime) {
        setError('startTime', {
          type: 'manual',
          message: 'Vui lòng chọn ngày và giờ bắt đầu/kết thúc',
        });
        return;
      }

      if (endDateTime > endDateTime) {
        setError('endTime', {
          type: 'manual',
          message: 'Ngày kết thúc phải sau ngày bắt đầu',
        });
        return;
      }

      const base64File = data.file
        ? await convertFileToBase64(data.file as File)
        : null;


      const valueTest = {
        name: data.name,
        type: Number(data.type),
        durationTime: data.durationTime,
        startTime: mergeDateAndTime(startDate as dayjs.Dayjs, startTime),
        endTime: mergeDateAndTime(endDate as dayjs.Dayjs, endTime),
        file: base64File,
        description: data.description,
        classIds: selectedClasses.map((cls) => cls.id).join(','),
        fileSubmit: data.file !== null ? true : false,
        gradeLevelsId: data.gradeLevelsId,
        subjectId: selectedClasses[0]?.subjectQuantity ?? null,
        teacherId: Number(teacherId),
        classify: data.classify
      };

      const response = await axiosInstance.post('api/test', valueTest);
      if (response.status === 200) {
        toast.success('Thêm bài kiểm tra thành công!');
        reset();
      }

    } catch (err) {
      toast.error('Thêm bài kiểm tra thất bại!');
      console.log("Lỗi gửi form:", err);

    }
  };

  useEffect(() => {
    fetchDataGradeLevel()
  }, [startTime, endTime]);
  return (
    <div className="p-3">
      <AddressList addressList={labels} />
      <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
        <div className="relative bg-white rounded-[16px] shadow-md w-full mt-2 min-full">
          {/* header */}
          <div className="flex items-center pb-4 bg-white rounded-[16px] p-6">
            <div className="flex-1 grid grid-cols-[auto-2fr] gap-x-4 gap-y-4 ml-4">
              <div className="grid grid-cols-3 items-center full-w">
                <label className="font-semibold w-1/2 ml-auto">Chủ đề</label>
                <input type="text" placeholder="Nhập chủ đề..." className="col-span-2 border border-gray-300 p-2 rounded-md col-span-2 w-2/3" {...register('name', { required: 'Không để trống' })} />
              </div>

              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold w-1/2 ml-auto">Hình thức</label>


                <div className="col-span-2 flex space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className='w-[20px] h-[20px]'
                      value="0"
                      {...register('type', { required: 'Chọn hình thức', valueAsNumber: true })}
                    />
                    <span>Trắc nghiệm</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className='w-[20px] h-[20px]'
                      value="1"
                      {...register('type', { required: 'Chọn hình thức', valueAsNumber: true })}
                    />
                    <span>Tự luận</span>
                  </label>
                </div>

              </div>

              {/* Chọn khối */}
              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold w-1/2 ml-auto">Khối</label>
                <div className="col-span-2 flex space-x-4">
                  <div className='w-1/6'><Controller
                    name="gradeLevelsId"
                    control={control}
                    rules={{ required: true }} // Validation không được để trống
                    render={({ field }) => (
                      <Dropdown
                        options={option_gradeLevel}
                        selectedOption={selectedGredeLevel}
                        placeholder="Chọn khối"
                        showArrow={true}
                        handleOptionClick={selectedGredeLeveloption}
                        headerClassName='w-full py-2'
                      />
                    )}
                  /></div>

                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={isChecked} onChange={handleCheckboxChange} />
                    <span>Chọn tất cả các lớp</span>
                  </label>
                </div>
              </div>

              {/* Chọn lớp */}

              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold"></label>
                <div className="col-span-2 flex flex-wrap gap-2">
                  {classOptions.map((classItem) => (
                    <button
                      key={classItem.id}
                      type="button"
                      onClick={() => toggleClass(classItem)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedClasses.some((cls) => cls.id === classItem.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                        }`}
                    >
                      {classItem.name}
                    </button>
                  ))}

                </div>
              </div>
            </div>
          </div>

          {/* Phần bg-gray */}
          <div className='bg-[#F0F3F6] flex items-center pb-4 p-6'>
            <div className="flex-1 grid grid-cols-[auto-2fr] gap-x-4 gap-y-4 ml-4">
              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold w-1/2 ml-auto">Thời lượng</label>
                <div className="flex items-center ">
                  <div className="flex items-center">
                    <Controller
                      name="durationTime"
                      control={control}
                      rules={{ required: true }}
                      render={() => (
                        <>
                          <Dropdown
                            options={option_hours.map(item => ({ label: item, value: item }))}
                            selectedOption={selectedHour}
                            placeholder="Giờ"
                            showArrow
                            handleOptionClick={opt => setSelectedHour(opt)}
                            headerClassName="w-full"
                          />
                          <label className="italic ms-2 ">Giờ</label>
                        </>
                      )}
                    />
                  </div>
                  <div className="flex items-center">
                    <Controller
                      name="durationTime"
                      control={control}
                      rules={{ required: true }}
                      render={() => (
                        <>
                          <Dropdown
                            options={option_minutes.map(item => ({ label: item, value: item }))}
                            selectedOption={selectedMinute}
                            placeholder="Phút"
                            showArrow
                            handleOptionClick={opt => setSelectedMinute(opt)}
                            headerClassName="w-full ms-12"
                          />
                          <label className="italic ms-2">Phút</label>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center">
                <label className="italic  w-1/2 ml-auto">Phân loại</label>
                <Controller
                  name="classify"
                  control={control}
                  rules={{ required: true }} // Validation không được để trống
                  render={({ field }) => (
                    <Dropdown
                      options={option_selectType}
                      selectedOption={selectClassIfy}
                      placeholder="Phân loại"
                      showArrow={true}
                      handleOptionClick={selectedClassIfyoption}
                      headerClassName='w-1/2 z-1000'
                    />
                  )}
                />
              </div>


              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold w-1/2 ml-auto">Ngày bắt đầu</label>
                <div className="col-span-2 flex space-x-4">
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <DateInput value={startDate} onChange={handleStartDateChange} width="180px" className="border-gray-300" />
                    )}
                  />
                  <DropdownTimeSelection
                    value={startTime}
                    onChange={handleTimeStartChange}
                    className='w-[150px]'
                  />

                </div>

              </div>
              {errors.startTime && (
                <p className="text-red-500 text-sm">{errors.startTime.message}</p>
              )}
              <div className="grid grid-cols-3 items-center">
                <label className="font-semibold w-1/2 ml-auto">Ngày kết thúc</label>
                <div className="col-span-2 flex space-x-4">
                  <Controller
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                      <DateInput value={endDate} onChange={handleEndDateChange} width="180px" className="border-gray-300" />
                    )}
                  />
                  <DropdownTimeSelection
                    value={endTime}
                    onChange={handleTimeEndChange}
                    className='w-[150px]'
                  />
                  {errors.endTime && (
                    <p className="text-red-500 text-sm">{errors.endTime.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="flex items-center pb-4 bg-white rounded-[16px] p-6">
            <div className="flex-1 grid grid-cols-[auto-2fr] gap-x-4 gap-y-4 ml-4">
              <div className="grid grid-cols-3 items-center gap-x-4">
                <label className="font-semibold  w-1/2 ml-auto">Mô tả</label>
                <textarea
                  className="border bg-white p-2 rounded-md col-span-2 w-2/3"
                  rows={5}
                  placeholder="Nhập mô tả..."
                  {...register('description', { required: 'Không để trống' })}
                ></textarea>
              </div>

              <div className="grid grid-cols-3 items-center">
                <label className="italic  w-1/2 ml-auto"></label>
                <div className='flex items-center'>
                  <label className='italic mr-[24px] whitespace-nowrap'>Tệp đính kèm</label>
                  <div className="relative flex-1">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-full">
                      <label className=" cursor-pointer">
                        <input type="file" onChange={handleFileChange} accept=".pdf,.jpeg,.jpg,.png,.xls,.xlsx" className="hidden" />
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M15.0667 10.3503L9.91672 15.5087C9.24156 16.1087 8.36267 16.4281 7.45982 16.4015C6.55697 16.3749 5.69839 16.0044 5.0597 15.3657C4.42101 14.727 4.05048 13.8684 4.0239 12.9656C3.99732 12.0627 4.3167 11.1838 4.91672 10.5087L11.5834 3.84201C11.9814 3.46392 12.5094 3.25311 13.0584 3.25311C13.6074 3.25311 14.1354 3.46392 14.5334 3.84201C14.9212 4.235 15.1386 4.7649 15.1386 5.31701C15.1386 5.86912 14.9212 6.39901 14.5334 6.79201L8.78338 12.5337C8.72648 12.595 8.65806 12.6444 8.58203 12.6793C8.50601 12.7141 8.42386 12.7336 8.34029 12.7367C8.25672 12.7398 8.17335 12.7264 8.09496 12.6973C8.01656 12.6682 7.94467 12.6239 7.88339 12.567C7.8221 12.5101 7.77263 12.4417 7.73779 12.3657C7.70294 12.2896 7.68342 12.2075 7.68032 12.1239C7.67723 12.0403 7.69062 11.957 7.71974 11.8786C7.74887 11.8002 7.79315 11.7283 7.85005 11.667L12.1251 7.40034C12.282 7.24342 12.3701 7.03059 12.3701 6.80867C12.3701 6.58675 12.282 6.37393 12.1251 6.21701C11.9681 6.06009 11.7553 5.97193 11.5334 5.97193C11.3115 5.97193 11.0986 6.06009 10.9417 6.21701L6.66672 10.5003C6.45281 10.7126 6.28302 10.9651 6.16716 11.2433C6.0513 11.5215 5.99165 11.8198 5.99165 12.1212C5.99165 12.4225 6.0513 12.7209 6.16716 12.9991C6.28302 13.2773 6.45281 13.5298 6.66672 13.742C7.1037 14.1582 7.68406 14.3904 8.28755 14.3904C8.89104 14.3904 9.47141 14.1582 9.90839 13.742L15.6501 7.99201C16.3125 7.28113 16.6731 6.3409 16.6559 5.36939C16.6388 4.39789 16.2452 3.47096 15.5582 2.7839C14.8711 2.09683 13.9442 1.70327 12.9727 1.68613C12.0012 1.66899 11.0609 2.02961 10.3501 2.69201L3.68339 9.35867C2.78438 10.3544 2.30424 11.6585 2.343 12.9995C2.38175 14.3404 2.93641 15.6147 3.89142 16.5568C4.84642 17.4989 6.12812 18.0362 7.46946 18.0567C8.8108 18.0773 10.1083 17.5795 11.0917 16.667L16.2501 11.517C16.3278 11.4393 16.3894 11.3471 16.4314 11.2455C16.4735 11.144 16.4951 11.0352 16.4951 10.9253C16.4951 10.8155 16.4735 10.7066 16.4314 10.6051C16.3894 10.5036 16.3278 10.4114 16.2501 10.3337C16.1724 10.256 16.0801 10.1943 15.9786 10.1523C15.8771 10.1102 15.7683 10.0886 15.6584 10.0886C15.5485 10.0886 15.4397 10.1102 15.3382 10.1523C15.2367 10.1943 15.1444 10.256 15.0667 10.3337V10.3503Z"
                            fill="#FF7506"
                          />
                        </svg>
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full bg-gray-100  border border-gray-300 rounded-md pl-8 pr-2 py-2 outline-none"
                      value={formData.file instanceof File ? formData.file.name : formData.file || ''}
                      {...register('file')}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Cài đặt khác */}
                <div className="grid grid-cols-3 items-center">
                  <label className="font-semibold w-1/2 ml-auto">Cài đặt khác</label>
                  <div>
                    <input type="checkbox" className="mr-2" onClick={handleToggleAdvancedSettings} />
                    <label>Yêu cầu học viên đính kèm tệp</label>
                  </div>
                </div>

                {/* Quy định nộp bài */}
                {showAdvancedSettings && (
                  <div className="grid grid-cols-3 items-start gap-x-4">
                    <label className="font-semibold w-1/2 ml-auto">Quy định nộp bài</label>

                    <div className="col-span-2">
                      {/* Header */}
                      <div className="grid grid-cols-[150px_repeat(4,1fr)] gap-4 mb-2 items-center">
                        <label className="italic">Định dạng</label>
                        {["10MB", "20MB", "30MB", "40MB"].map((size) => (
                          <label key={size} className="text-center">{size}</label>
                        ))}
                      </div>

                      {/* File Type Selection */}
                      {[
                        { label: "Doc, Docx", id: "doc" },
                        { label: "Power Point", id: "ppt" },
                        { label: "Xlsx", id: "xlsx" },
                        { label: "Jpeg", id: "jpeg" },
                      ].map((file) => (
                        <div
                          key={file.id}
                          className="grid grid-cols-[150px_repeat(4,1fr)] gap-4 items-center"
                        >
                          {/* Checkbox */}
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-blue-500"
                              checked={checkedFiles[file.id as FileType]}
                              onChange={handleCheckboxSettingChange.bind(null, file.id as FileType)}
                            />
                            <span>{file.label}</span>
                          </label>

                          {/* Radio Buttons */}
                          {["10MB", "20MB", "30MB", "40MB"].map((size) => (
                            <div key={size} className="flex justify-center">
                              <input
                                type="radio"
                                name={file.id}
                                className="w-5 h-5 accent-blue-500"
                                disabled={!checkedFiles[file.id as FileType]}
                              />
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* Lưu ý */}
                      <p className="text-sm text-right text-orange-500 mt-2 mr-5 italic">
                        *Lưu ý: Tổng dung lượng tối đa là 50MB
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

        <div className='flex justify-center items-center my-4'>
          <Button className='secondary mr-2'>hủy</Button>
          <Button className={`${isValid ? 'primary' : 'secondary'}`} type='submit' disabled={!isValid} >{isLoading ? <Spinner /> : 'Lưu'}</Button>
        </div>

      </form >
    </div >
  );
};

export default AddTest;
