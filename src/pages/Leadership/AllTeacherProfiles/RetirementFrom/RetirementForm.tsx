import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import DateInput from "../../../../components/Date";
import dayjs from "dayjs";
import { IRetirement } from "./type";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import createAxiosInstance from "../../../../utils/axiosInstance";

const RetirementUpdateModal: React.FC = () => {
  const [retirementData, setRetirementData] = useState<IRetirement>({
    retirementDate: null,
    note: "",
    decision: null,
  });
  const axiosInstance = createAxiosInstance();
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [cookies] = useCookies(["accessToken", 'userId']);
  const handleClose = () => {
    navigate("/leadership/all-teacher-profiles", { replace: true });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRetirementData((prev) => ({
        ...prev,
        decision: file,
      }));
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setRetirementData((prev) => ({
      ...prev,
      retirementDate: date,
    }));
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRetirementData((prev) => ({
      ...prev,
      note: event.target.value,
    }));
  };

  const isDataValid = retirementData.retirementDate && retirementData.note && retirementData.decision;

  // 🔥 Hàm upload file và chuyển đổi thành Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSave = async () => {
    if (!isDataValid) return;
    setLoading(true);

    try {
      const base64File = retirementData.decision
        ? await convertFileToBase64(retirementData.decision as File)
        : null;

      const token = cookies.accessToken;
      if (!token) {
        toast.error("Lỗi xác thực: Token không tồn tại!");
        setLoading(false);
        return;
      }

      const value = {
        teacherId: Number(id),
        date: retirementData.retirementDate?.toISOString(),
        note: retirementData.note || "",
        attachment: base64File,
        status: 9,
        leadershipId: Number(cookies.userId),
        active: true,
      };

      try {
        // Thử cập nhật trước (PUT)
        const response = await axiosInstance.put(`api/retirement/putByTeacherId/${id}`, value);

        toast.success("Cập nhật thành công!");

      } catch (error: any) {
        if (error.response.status === 404) {
          const dataPost = await axiosInstance.post(`api/retirement`, value);

          toast.success("Cập nhật thành công!");

        } else {
          console.error("❌ Lỗi API:", error);
          toast.error(`Lỗi: ${error.response?.status || "500"} - ${error.response?.data?.message || "Có lỗi xảy ra!"}`);
        }
      }

      navigate("/leadership/all-teacher-profiles");
    } catch (error) {
      console.error("❌ Lỗi không xác định:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1 className="modal-title">Cập nhật nghỉ hưu</h1>

        <div className="modal-content">
          {/* Ngày nghỉ hưu */}
          <div className="row mb-4">
            <label className="label">
              Ngày nghỉ hưu: <span className="text-red-500">*</span>
            </label>
            <DateInput
              value={retirementData.retirementDate}
              onChange={handleDateChange}
              width="80%"
              className="border-gray-300"
            />
          </div>

          {/* Ghi chú */}
          <div className="row mb-4">
            <label className="label">
              Ghi chú: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={retirementData.note}
              className="input"
              onChange={handleNoteChange}
              placeholder="Nhập ghi chú..."
            />
          </div>

          {/* Quyết định nghỉ hưu */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <label className="font-semibold whitespace-nowrap">
                Quyết định nghỉ việc:
              </label>

              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md pl-2 pr-2 py-2 outline-none"
                  value={retirementData.decision ? retirementData.decision.name : ""}
                  readOnly
                />
              </div>

              <label className="cursor-pointer bg-orange-100 text-orange-700 py-2 px-4 rounded-md border border-orange-300 hover:bg-orange-200">
                Chọn tệp tải lên...
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpeg,.jpg"
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-1 pl-[22%]">
              Kiểu file .pdf, .jpeg, .jpg. Dung lượng tối đa 100MB.
            </p>
          </div>
        </div>

        <div className="modal-footer flex justify-end gap-4">
          <Button className="secondary" size="big" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            className={isDataValid ? "primary" : "secondary"}
            size="big"
            onClick={handleSave}
            disabled={!isDataValid || loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RetirementUpdateModal;
