import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';
import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import { FormInputs } from './type';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

const weightOptions: DropdownOption[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const EditGradeTypeModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      weight: undefined,
      qtyScoreSemester1: undefined,
      qtyScoreSemester2: undefined,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Lấy dữ liệu theo id khi component khởi tạo
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/score-type/${id}`)
        .then((response) => {
          reset(response.data.data);
          setIsLoadingData(false);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu:', error);
          toast.error('Lỗi khi lấy dữ liệu', { autoClose: 1000});
          setIsLoadingData(false);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const payload: FormInputs = {
        ...data,
        weight: Number(data.weight),
        qtyScoreSemester1: data.qtyScoreSemester1 ? Number(data.qtyScoreSemester1) : 1,
        qtyScoreSemester2: data.qtyScoreSemester2 ? Number(data.qtyScoreSemester2) : 1,
      };

      await axios.put(`${API_URL}/score-type/${id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Cập nhật thành công', { autoClose: 1000})
      setTimeout(()=> {
        navigate('/leadership/declare-data/score-types');
      }, 1000)
    } catch (error) {
      console.error('Có lỗi xảy ra khi cập nhật API:', error);
      toast.error('Có lỗi xảy ra khi cập nhật dữ liệu', { autoClose: 1000});
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu dữ liệu chưa được load xong, hiển thị spinner loading
  if (isLoadingData) {
    return (
      <div className="modal-overlay">
        <div className="overlay flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="overlay">
        <div className="max-w-4xl mx-auto my-8 bg-white p-8 shadow-md rounded-md modal-container">
          <h2 className="text-2xl font-bold mb-6 text-center">Sửa loại điểm</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Hàng 1: Tên loại điểm & Hệ số */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8 mb-6">
              {/* Cột Tên loại điểm */}
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center">
                  <label className="mr-2 font-bold whitespace-nowrap">
                    Tên loại điểm: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Nhập tên loại điểm"
                      className="w-full border border-gray-300 px-3 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                      {...control.register('name', {
                        required: 'Tên loại điểm là bắt buộc',
                      })}
                    />
                    {errors.name && (
                      <span className="absolute top-full left-0 text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Cột Hệ số */}
              <div className="w-full md:w-60">
                <div className="flex items-center">
                  <label className="mr-2 font-bold whitespace-nowrap">Hệ số:</label>
                  <div className="relative flex-1">
                    <Controller
                      name="weight"
                      control={control}
                      rules={{ required: 'Hệ số là bắt buộc' }}
                      render={({ field, fieldState }) => {
                        const selectedOption =
                          weightOptions.find((o) => o.value === String(field.value)) || null;

                        return (
                          <>
                            <Dropdown
                              options={weightOptions}
                              selectedOption={selectedOption}
                              handleOptionClick={(option) => {
                                field.onChange(option.value);
                              }}
                              placeholder="Hệ số điểm"
                              border="visible"
                              borderColor="#ccc"
                              size="short"
                              status={fieldState.error ? 'error' : 'normal'}
                              disabled={false}
                              showArrow={true}
                              backgroundColorSelected="rgb(79 164 204)"
                              backgroundColor="#fff"
                              headerClassName="w-full px-3 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            {fieldState.error && (
                              <span className="absolute top-full left-0 text-red-500 text-sm mt-1">
                                {fieldState.error.message}
                              </span>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tiêu đề "Số cột điểm tối thiểu" */}
            <p className="text-[#CC5C00] text-lg font-bold mb-4">Số cột điểm tối thiểu</p>

            {/* Hàng 2: Số cột điểm của Học kì I & Học kì II */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex space-x-8 justify-between">
                  {/* Học kì I */}
                  <div className="flex items-center">
                    <label className="mr-2 font-bold whitespace-nowrap">Học kì I:</label>
                    <input
                      type="number"
                      min={0}
                      className="w-24 border border-gray-300 px-3 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                      {...control.register('qtyScoreSemester1', { valueAsNumber: true })}
                    />
                  </div>

                  {/* Học kì II */}
                  <div className="flex items-center">
                    <label className="mr-2 font-bold whitespace-nowrap">Học kì II:</label>
                    <input
                      type="number"
                      min={0}
                      className="w-24 border border-gray-300 px-3 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                      {...control.register('qtyScoreSemester2', { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Cột trống canh với cột Hệ số */}
              <div className="w-full md:w-60"></div>
            </div>

            {/* Nút Hủy & Lưu */}
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                onClick={() => navigate('/leadership/declare-data/score-types')}
                className="bg-[#F2F2F2] hover:bg-gray-300 border-2 !border-white text-black font-bold px-6 py-2 rounded-[8px]"
                size="big"
              >
                Hủy
              </Button>

              <Button
                type="submit"
                disabled={isLoading || !isValid}
                className={`
                  px-6 py-2 rounded-[8px] font-bold text-white 
                  ${isLoading || !isValid ? 'bg-[#C9C4C0] cursor-not-allowed' : 'primary'}
                `}
                size="big"
              >
                {isLoading ? <Spinner /> : 'Lưu'}
              </Button>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
      </div>
    </div>
  );
};

export default EditGradeTypeModal;
