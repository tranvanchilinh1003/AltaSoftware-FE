import createAxiosInstance from '../../../../utils/axiosInstance';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTeacherContext } from '../InstructorProfile/TeacherContext';
import Status from '../../../../components/Status';
const avatar = require('../../../../assets/images/Frame 19.png');
const mapStatusToType = (status: number) => {
  switch (status) {
    case 6:
      return 'studying'; // Đang làm việc
    case 7:
      return 'graduated'; // Tạm nghỉ
    case 8:
      return 'dropped'; // Đã nghỉ việc
    case 9:
      return 'classTransferred'; // Nghỉ hưu
    default:
      return 'studying'; // Mặc định
  }
};
const mapStatusToLabel = (status: number) => {
  switch (status) {
    case 6:
      return 'Đang làm việc';
    case 7:
      return 'Tạm nghỉ';
    case 8:
      return 'Đã nghỉ việc';
    case 9:
      return 'Nghỉ hưu';
    default:
      return 'Không xác định'; // Mặc định nếu không khớp
  }
};

const TeacherProfile = () => {
  const [teacherData, setTeacherData] = useState<any | null>(null);
  const [teacherInfo, setTeacherInfo] = useState<any | null>(null);
  const [teacherFamily, setTeacherFamily] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const { setTeacherData: setCtxTeacherData, setTeacherInfo: setCtxTeacherInfo, setTeacherFamily: setCtxTeacherFamily } = useTeacherContext();
  const axiosInstance = createAxiosInstance();
  const fetchData = async () => {
    try {
      // Gọi API teacherlists và teacherinfos song song
      const [teacherRes, infoRes] = await Promise.all([
        axiosInstance.get(`api/teacherlists/${id}`),
        axiosInstance.get(`api/teacherinfos/${id}`)
      ]);

      // Kiểm tra kết quả
      if (teacherRes.data.code !== 0) {
        throw new Error('Lỗi khi tải dữ liệu giảng viên');
      }
      if (infoRes.data.code !== 0) {
        throw new Error('Lỗi khi tải thông tin giảng viên');
      }

      const teacherData = teacherRes.data.data;
      const teacherInfo = infoRes.data.data;

      setCtxTeacherData(teacherData);
      setTeacherData(teacherData);
      setCtxTeacherInfo(teacherInfo);
      setTeacherInfo(teacherInfo);

      // Nếu có userId thì gọi tiếp API users
      const userId = teacherInfo?.userId;
      if (userId) {
        const userRes = await axiosInstance.get(`api/users/${userId}`);
        if (userRes.data.code !== 0) {
          throw new Error('Lỗi khi tải thông tin người dùng');
        }
        setCtxTeacherFamily(userRes.data.data);
        setTeacherFamily(userRes.data.data);
      }
    }
    catch (err) {
      setError('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (teacherData && teacherInfo && teacherFamily) {
      console.log('Teacher Data:', teacherData);
      console.log('Teacher Info:', teacherInfo);
      console.log('Teacher Family:', teacherFamily);
    }
  }, [teacherData, teacherInfo, teacherFamily]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {loading && <p>Đang tải...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && teacherData && (
        <div className="overflow-x-auto bg-white flex-grow">
          {/* Thông tin chung */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-background-2 text-white p-4 text-lg">Thông tin chung</div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Avatar */}
              <div className="col-span-12 md:col-span-3 flex justify-center items-start">
                <img src={teacherFamily.avatarUrl} alt="Avatar" className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover" />
              </div>

              {/* Thông tin giảng viên */}
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-orange-600 font-bold mb-2">Thông tin giảng viên</h2>
                <p><strong className="text-gray-500">Mã giảng viên:</strong> <span className="text-gray-500">{teacherData?.teacherCode || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Tổ - Bộ môn:</strong> <span className="text-gray-500">{teacherData?.subjectId || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Môn giảng dạy:</strong> <span className="text-gray-500">{teacherData.position || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Họ và Tên:</strong> <span className="text-gray-500">{teacherData.fullName || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Ngày sinh:</strong> <span className="text-gray-500">{new Date(teacherData.birthDate).toLocaleDateString('vi-VN') || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Giới tính:</strong> <span className="text-gray-500">{teacherData?.gender ? 'Nam' : 'Nữ'}</span></p>
                <p><strong className="text-gray-500">Dân tộc:</strong> <span className="text-gray-500">{teacherFamily.nation || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Ngày vào trường:</strong> <span className="text-gray-500">{new Date(teacherFamily.enrollmentDate).toLocaleDateString('vi-VN') || 'Không có'}</span></p>
              </div>

              {/* Thông tin bổ sung */}
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-orange-600 font-bold mb-2">Thông tin bổ sung</h2>
                <p><strong className="text-gray-500">Quốc tịch:</strong> <span className="text-gray-500">Việt Nam</span></p>
                <p><strong className="text-gray-500">Tôn giáo:</strong> <span className="text-gray-500">{teacherFamily?.religion || 'Không có'}</span></p>
                <p className="flex items-center gap-2">
                  <strong className="text-gray-500">Trạng thái:</strong>
                  <div className='w-1/2'>
                    <Status type={mapStatusToType(teacherData.status)} label={mapStatusToLabel(teacherData.status)} />
                  </div>
                </p>
                <p>
                  <strong className="text-gray-500">Môn kiêm nhiệm:</strong>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full inline-block mx-1">Vật lý</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full inline-block mx-1">Toán</span>
                </p>
                <p><strong className="text-gray-500">Bí danh:</strong> <span className="text-gray-500">{teacherData.alias || 'Không có'}</span></p>
              </div>

              {/* Địa chỉ liên hệ */}
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-orange-600 font-bold mb-2">Địa chỉ liên hệ</h2>
                <p><strong className="text-gray-500">Địa chỉ:</strong> <span className="text-gray-500">{teacherFamily?.addressFull || 'Không có'}</span></p>
                <p><strong className="text-gray-500">Email:</strong> <span className="text-gray-500">{teacherFamily?.email || 'Không có'}</span></p>
                <p><strong className="text-gray-500">SDT:</strong> <span className="text-gray-500">{teacherFamily?.phoneNumber || 'Không có'}</span></p>
              </div>
            </div>
          </div>

          {/* Thông tin Đoàn, Đảng (phần này ổn rồi) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {/* Cột 1: Trống */}
            <div></div>

            {/* Cột 2: Đoàn viên */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={teacherFamily?.unionMember || false} readOnly />
                <span className="text-gray-500">Đoàn viên</span>
              </div>
              <div><strong className="text-gray-500">Ngày vào Đoàn:</strong> <span>{teacherFamily?.unionDate || 'Không có'}</span></div>
              <div><strong className="text-gray-500">Nơi vào Đoàn:</strong> <span>{teacherFamily?.unionPlace || 'Không có'}</span></div>
            </div>

            {/* Cột 3: Đảng viên */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={teacherFamily?.partyMember || false} readOnly />
                <span className="text-gray-500">Đảng viên</span>
              </div>
              <div><strong className="text-gray-500">Ngày vào Đảng:</strong> <span>{teacherFamily?.partyDate || 'Không có'}</span></div>
              <div><strong className="text-gray-500">Nơi vào Đảng:</strong> <span>{teacherFamily?.partyJoinDate || 'Không có'}</span></div>
            </div>
          </div>
          <div></div>
        </div>

      )}
    </>
  );
};

export default TeacherProfile;
