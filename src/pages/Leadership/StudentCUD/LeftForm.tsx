import React from 'react';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import CalendarInput from '../../../components/CalendarInput';

export interface leftFormProps {
  register?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  setError?: any;
  clearError?: any;
}

const LeftForm: React.FC<leftFormProps> = ({ register, errors, setValue, watch, setError, clearError }) => {
  return (
    <div className="w-[47%]">
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Họ và tên <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <Input
          className="h-[40px] min-w-[270px]"
          placeholder="Nhập họ và tên"
          {...register('fullname', { required: 'Họ và tên không được bỏ trống !' })}
          onChange={(e) => {
            setValue('fullname', e.currentTarget.value);
            clearError('fullname');
          }}
          error={errors?.fullname?.message}
        />
      </div>
      <div className="flex items-center mb-2 justify-content-between">
        <p className="w-[118px]">Giới tính <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <div className='max-w-[115px]'>
          <Dropdown
            size="short"
            options={[
              { label: 'Nam', value: false },
              { label: 'Nữ', value: true },
            ]}
            selectedOption={watch('gender')}
            handleOptionClick={(e) => {
              setValue('gender', e);
              clearError('gender');
            }}
            {...register('gender', { required: 'Vui lòng chọn thông tin giới tính !' })}
            placeholder="Chọn giới tính"
            borderColor={errors?.gender && '#EF4444'}
          />
        </div>
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1">{errors?.gender?.message}</p>}
      <div className="flex items-center">
        <p className="w-[118px]">Ngày sinh <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <CalendarInput
          placeholder="Chọn ngày sinh"
          style={{ maxWidth: 300 }}
          inputStyle={{ border: `${errors?.birthday ? '2px solid #EF4444' : '1px solid #6b7280'}` }}
          selectedDate={watch('birthday')}
          onDateChange={(e) => {
            setValue('birthday', e);
            clearError('birthday');
          }}
          {...register('birthday', {
            required: 'Vui lòng chọn thông tin ngày sinh !',
            validate: (value: Date) => new Date(value) <= new Date() || 'Ngày sinh không được sau ngày hôm nay !',
          })}
        />
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.birthday?.message}</p>}
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Nơi sinh <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <Input
          className="h-[40px] min-w-[270px]"
          placeholder="Nhập nơi sinh"
          {...register('birthPlace', { required: 'Nơi sinh không được bỏ trống !' })}
          onChange={(e) => {
            setValue('birthPlace', e.currentTarget.value);
            clearError('birthPlace');
          }}
          error={errors?.birthPlace?.message}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Dân tộc <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <Input
          className="h-[40px] min-w-[270px]"
          placeholder="Nhập thông tin dân tộc"
          {...register('folk', { required: 'Thông tin dân tộc không được bỏ trống !' })}
          onChange={(e) => {
            setValue('folk', e.currentTarget.value);
            clearError('folk');
          }}
          error={errors?.folk?.message}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Tôn giáo <span className='text-red-500 font-medium text-[20px]'>*</span></p>
        <Input
          className="h-[40px] min-w-[270px]"
          placeholder="Nhập thông tin tôn giáo"
          {...register('religion', { required: 'Thông tin tôn giáo không được bỏ trống !' })}
          onChange={(e) => {
            setValue('religion', e.currentTarget.value);
            clearError('religion');
          }}
          error={errors?.religion?.message}
        />
      </div>
    </div>
  );
};

export default LeftForm;
