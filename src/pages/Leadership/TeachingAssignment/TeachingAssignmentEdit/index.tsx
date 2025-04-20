import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormModal from "../../../../components/common/FormModal";
import DatePicker1 from "../../../../components/DatePickerComponent";
import SelectDropdown from "../../../../components/SelectDropdown";
import { TeachingAssignment } from "../../../../types";
import { convertToISODate, formatDate } from "../../../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchClasses from "../hooks/useFetchClasses";
import useFetchTeachingAssignmentDetail from "../hooks/useFetchTeachingAssignmentDetail";
import useUpdateTeachingAssignment from "../hooks/useUpdateTeachingAssignment";

interface TeachingAssignmentFormEditProps {
    isOpen: boolean;
    onClose: () => void;
    item: TeachingAssignment | null;
    refetchData?: () => void;
}

const TeachingAssignmentFormEdit: React.FC<TeachingAssignmentFormEditProps> = ({ isOpen, onClose, item, refetchData }) => {
    const handleCancel = () => {
        onClose();
    };
    const { data: detailData, loading: detailLoading, error } = useFetchTeachingAssignmentDetail(item?.id || null);
    const { data: classes } = useFetchClasses();
    const { updateAssignment, loading: updating, success, error: updateError } = useUpdateTeachingAssignment();

    const [selectedClass, setSelectedClass] = useState<string>(item?.class?.id.toString() || "");
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            startDate: detailData?.startDate ? formatDate(detailData.startDate) : "",
            endDate: detailData?.endDate ? formatDate(detailData.endDate) : "",
            description: detailData?.description || "",
            classId: detailData?.class?.id.toString() || "",
        },
    });
    useEffect(() => {
        if (detailData) {
            setValue("startDate", formatDate(detailData.startDate ?? ""));
            setValue("endDate", formatDate(detailData.endDate ?? ""));
            setValue("description", detailData.description || "");
            setValue("classId", detailData.class?.id.toString() || "");
            setSelectedClass(detailData.class?.id.toString() || "");
        }
    }, [detailData, setValue]);

    useEffect(() => {
        if (success) {
            toast.success("Cập nhật lịch giảng dạy thành công!");
            if (refetchData) {
                refetchData();
            }
            onClose();
        }
        if (updateError) {
            toast.error(updateError);
        }
    }, [success, updateError, onClose, refetchData]);

    const onSubmit = async (data: any) => {
        if (!data.startDate || !data.endDate) {
            toast.error("Ngày bắt đầu và ngày kết thúc không được để trống.");
            return;
        }
        const formattedStartDate = convertToISODate(data.startDate, "00:00:00");
        const formattedEndDate = convertToISODate(data.endDate, "00:00:00");
        if (isNaN(new Date(formattedStartDate).getTime()) || isNaN(new Date(formattedEndDate).getTime())) {
            toast.error("Định dạng ngày không hợp lệ.");
            return;
        }
        if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu.");
            return;
        }
        const updatedData = {
            ...data,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            userId: detailData?.user.id ?? 0,
            subjectId: detailData?.subject.id ?? 0,
            topicsId: detailData?.topics.id ?? 0,
            semesterId: detailData?.semester.id ?? 0,
        };
        if (item) {
            await updateAssignment(item.id, updatedData);
        } else {
            toast.error("Không thể cập nhật vì thông tin lịch giảng dạy không hợp lệ.");
        }
    };

    if (detailLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
      <FormModal isOpen={isOpen} onClose={onClose} title="Cập nhật lịch giảng dạy" titleAlign="center" showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-full p-6 md:p-8">
            <div className="grid gap-5">
              {/* Giảng viên */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <p className="font-bold text-left">Giảng viên:</p>
                <p className="md:col-span-2 text-left">{detailData?.user.fullName || 'N/A'}</p>
              </div>

              {/* Môn học */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <p className="font-bold text-left">Môn học:</p>
                <p className="md:col-span-2 text-left">{detailData?.subject.name || 'N/A'}</p>
              </div>

              {/* Dropdown chọn môn học */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <p className="font-bold text-left">Chọn lớp học:</p>
                <div className="md:col-span-2">
                  <SelectDropdown
                    {...register('classId', { required: 'Vui lòng chọn lớp học' })}
                    value={selectedClass}
                    onChange={(newValue: string) => {
                      console.log('Selected classId:', newValue);
                      setSelectedClass(newValue);
                      setValue('classId', newValue);
                    }}
                    placeholder="Chọn lớp học"
                    options={classes.map((cls) => ({ label: cls.name, value: cls.id.toString() }))}
                    variant="flat"
                    color="primary"
                    radius="xs"
                  />
                  {errors.classId && <p className="text-red-500">{errors.classId.message}</p>}
                </div>
              </div>

              {/* Ngày bắt đầu */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <p className="font-bold text-left">Ngày bắt đầu:</p>
                <div className="md:col-span-2">
                  <DatePicker1
                    value={getValues('startDate') || ''}
                    {...register('startDate', { required: 'Vui lòng chọn ngày bắt đầu' })}
                    onChange={(date) => {
                      console.log('Giá trị từ DatePicker1:', date.target.value);
                      const isoDate = convertToISODate(date.target.value, '09:00:00');
                      setValue('startDate', isoDate);
                    }}
                  />

                  {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                </div>
              </div>

              {/* Ngày kết thúc */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <p className="font-bold text-left">Ngày kết thúc:</p>
                <div className="md:col-span-2">
                  <DatePicker1
                    value={getValues('endDate') || ''}
                    {...register('endDate', { required: 'Vui lòng chọn ngày kết thúc' })}
                    onChange={(date) => {
                      console.log('Giá trị từ DatePicker1:', date.target.value);
                      const isoDate = convertToISODate(date.target.value, '17:00:00'); // Thêm giờ kết thúc
                      setValue('endDate', isoDate);
                    }}
                  />

                  {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                </div>
              </div>

              {/* Mô tả */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p className="font-bold text-left">Mô tả:</p>
                <div className="md:col-span-2">
                  <textarea
                    {...register('description', { required: 'Vui lòng nhập mô tả' })}
                    className="w-full p-3 border rounded-md outline-none"
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 text-left">{errors.description.message}</p>}
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button onClick={handleCancel} className="w-full md:w-auto bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg">
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`w-full md:w-auto font-semibold py-3 px-6 rounded-lg ${
                    updating ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {updating ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormModal>
    );
};

export default TeachingAssignmentFormEdit;
