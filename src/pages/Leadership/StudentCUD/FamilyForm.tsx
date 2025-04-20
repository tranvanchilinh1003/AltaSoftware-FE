import React from 'react';
import Input from '../../../components/Input';
import CalendarInput from '../../../components/CalendarInput';

interface formProps {
  register?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  clearError?: any;
}

const FamilyForm: React.FC<formProps> = ({ register, errors, setValue, watch, clearError }) => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="w-[30%] max-w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px] pb-0">Họ tên cha</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập họ và tên cha"
              {...register('family[0].guardianName')}
              onChange={(e) => {
                setValue('family[0].guardianName', e.currentTarget.value);
                setValue('family[0].guardianRole', 0);
                clearError('family[0].guardianName');
              }}
              error={errors?.family && errors?.family[0].guardianName?.message}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px] pb-0">Họ tên mẹ</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập họ tên mẹ"
              {...register('family[1].guardianName')}
              onChange={(e) => {
                setValue('family[1].guardianName', e.currentTarget.value);
                setValue('family[1].guardianRole', 1);
                clearError('family[1].guardianName');
              }}
              error={errors?.family && errors?.family[1].guardianName?.message}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px] pb-0">Người giám hộ</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập họ tên NGH"
              {...register('family[2].guardianName')}
              onChange={(e) => {
                setValue('family[2].guardianName', e.currentTarget.value);
                setValue('family[2].guardianRole', 2);
                clearError('family[2].guardianName');
              }}
              error={errors?.family && errors?.family[2].guardianName?.message}
            />
          </div>
        </div>
        <div className="w-[30%] max-w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px] pb-0">Năm sinh cha</p>
            <CalendarInput
              placeholder="Chọn ngày sinh"
              style={{ maxWidth: 300 }}
              inputStyle={{ border: `${errors?.family && errors?.family[0] ? '2px solid #EF4444' : '1px solid #6b7280'}` }}
              selectedDate={watch('family[0].guardianBornDate')}
              onDateChange={(e) => {
                setValue('family[0].guardianBornDate', e);
                clearError('family[0].guardianBornDate');
              }}
              {...register('family[0].guardianBornDate')}
              disable={!watch('family[0].guardianName')}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px] pb-0">Năm sinh mẹ</p>
            <CalendarInput
              placeholder="Chọn ngày sinh"
              style={{ maxWidth: 300 }}
              inputStyle={{ border: `${errors?.family && errors?.family[1] ? '2px solid #EF4444' : '1px solid #6b7280'}` }}
              selectedDate={watch('family[1].guardianBornDate')}
              onDateChange={(e) => {
                setValue('family[1].guardianBornDate', e);
                clearError('family[1].guardianBornDate');
              }}
              {...register('family[1].guardianBornDate')}
              disable={!watch('family[1].guardianName')}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Năm sinh NGH</p>
            <CalendarInput
              placeholder="Chọn ngày sinh"
              style={{ maxWidth: 300 }}
              inputStyle={{ border: `${errors?.family && errors?.family[2] ? '2px solid #EF4444' : '1px solid #6b7280'}` }}
              selectedDate={watch('family[2].guardianBornDate')}
              onDateChange={(e) => {
                setValue('family[2].guardianBornDate', e);
                clearError('family[2].guardianBornDate');
              }}
              {...register('family[2].guardianBornDate')}
              disable={!watch('family[2].guardianName')}
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp cha</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập nghề nghiệp cha"
              {...register('family[0].guardianJob')}
              onChange={(e) => {
                setValue('family[0].guardianJob', e.currentTarget.value);
                clearError('family[0].guardianJob');
              }}
              error={errors?.family && errors?.family[0].guardianJob?.message}
              disabled={!watch('family[0].guardianName')}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp mẹ</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập nghề nghiệp mẹ"
              {...register('family[1].guardianJob')}
              onChange={(e) => {
                setValue('family[1].guardianJob', e.currentTarget.value);
                clearError('family[1].guardianJob');
              }}
              error={errors?.family && errors?.family[1].guardianJob?.message}
              disabled={!watch('family[1].guardianName')}
            />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp NGH</p>
            <Input
              className="max-h-[40px] min-w-[200px]"
              placeholder="Nhập nghề nghiệp NGH"
              {...register('family[2].guardianJob')}
              onChange={(e) => {
                setValue('family[2].guardianJob', e.currentTarget.value);
                clearError('family[2].guardianJob');
              }}
              error={errors?.family && errors?.family[2].guardianJob?.message}
              disabled={!watch('family[2].guardianName')}
            />
          </div>
        </div>
      </div>
      <p className="font-bold text-[#CC5C00] mt-3 mb-3">Liên lạc gia đình</p>
      <div className="w-full flex justify-between">
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại cha</p>
            <Input
              className="max-h-[40px]"
              placeholder="Điện thoại cha"
              {...register('family[0].guardianPhone')}
              onChange={(e) => {
                setValue('family[0].guardianPhone', e.currentTarget.value);
                clearError('family[0].guardianPhone');
              }}
              error={errors?.family && errors?.family[0].guardianPhone?.message}
              disabled={!watch('family[0].guardianName')}
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại mẹ</p>
            <Input
              className="max-h-[40px]"
              placeholder="Điện thoại mẹ"
              {...register('family[1].guardianPhone')}
              onChange={(e) => {
                setValue('family[1].guardianPhone', e.currentTarget.value);
                clearError('family[1].guardianPhone');
              }}
              error={errors?.family && errors?.family[1].guardianPhone?.message}
              disabled={!watch('family[1].guardianName')}
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại GH</p>
            <Input
              className="max-h-[40px]"
              placeholder="Điện thoại giám hộ"
              {...register('family[2].guardianPhone')}
              onChange={(e) => {
                setValue('family[2].guardianPhone', e.currentTarget.value);
                clearError('family[2].guardianPhone');
              }}
              error={errors?.family && errors?.family[2].guardianPhone?.message}
              disabled={!watch('family[2].guardianName')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
